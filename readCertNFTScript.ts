// input: address 
// output: certified NFT using allowlist method
// goal: filter trash NFT and only retrieve certified NFT from allowlist contracts
import { ethers } from "ethers";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: './web/.env' });

// --- CONFIGURATION FROM ENV ---
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_NETWORK = process.env.ALCHEMY_NETWORK || "base-sepolia";
const CERT_CONTRACTS = process.env.CERT_CONTRACTS?.split(',').map(addr => addr.trim().toLowerCase()) || [];
const userAddress = process.env.TEST_USER_ADDRESS || "0x286db307079C9C92b55D20b33e4eAB6d2A588E54";

// IPFS Gateways to try
const IPFS_GATEWAYS = [
  "https://gateway.pinata.cloud/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/", 
  "https://ipfs.io/ipfs/",
  "https://dweb.link/ipfs/",
  "https://gateway.ipfs.io/ipfs/"
];

// Validation
if (!ALCHEMY_API_KEY) {
  throw new Error("ALCHEMY_API_KEY is required in .env file");
}
if (CERT_CONTRACTS.length === 0) {
  throw new Error("CERT_CONTRACTS is required in .env file");
}

const provider = new ethers.JsonRpcProvider(`https://${ALCHEMY_NETWORK}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);

async function getAllNFTsForAddress(address: string) {
  const url = `https://${ALCHEMY_NETWORK}.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}`;
  const { data } = await axios.get(url);
  return data.ownedNfts || [];
}

async function fetchMetadataWithFallback(tokenURI: string) {
  // If tokenURI is IPFS, try multiple gateways
  if (tokenURI.startsWith("ipfs://")) {
    const hash = tokenURI.replace("ipfs://", "");
    
    for (const gateway of IPFS_GATEWAYS) {
      try {
        const url = `${gateway}${hash}`;
        console.log(`  🔄 Trying gateway: ${gateway}`);
        const response = await axios.get(url, { timeout: 10000 });
        console.log(`  ✅ Success with: ${gateway}`);
        return response.data;
      } catch (error) {
        console.log(`  ❌ Failed with: ${gateway}`);
        continue;
      }
    }
    throw new Error(`All IPFS gateways failed for ${hash}`);
  } else {
    // Direct HTTP/HTTPS URL
    const response = await axios.get(tokenURI, { timeout: 10000 });
    return response.data;
  }
}

async function main() {
  // Allow command line argument for user address
  const targetAddress = process.argv[2] || userAddress;
  if (!targetAddress) {
    console.error("No user address provided. Set TEST_USER_ADDRESS in .env or provide as command line argument.");
    return;
  }

  console.log(`🔍 Searching Certified NFTs (Allowlist Mode) for address: ${targetAddress}`);
  console.log(`📋 Certificate Contracts: ${CERT_CONTRACTS.length} contracts`);
  CERT_CONTRACTS.forEach((contract, i) => {
    console.log(`  ${i + 1}. ${contract}`);
  });
  console.log(`⚡ Network: ${ALCHEMY_NETWORK}`);
  console.log("=".repeat(60));
  
  const nfts = await getAllNFTsForAddress(targetAddress);
  
  console.log(`📦 Total NFTs found: ${nfts.length}`);
  
  const certifiedNFTs: any[] = [];

  for (const nft of nfts) {
    const nftAddress = nft.contract.address.toLowerCase();
    
    // Check if contract is in allowlist
    if (CERT_CONTRACTS.includes(nftAddress)) {
      console.log(`✅ Found Certified NFT: ${nft.contract.address} Token #${nft.tokenId}`);
      
      // Get tokenURI and metadata
      let tokenURI = "";
      try {
        const nftContract = new ethers.Contract(
          nftAddress,
          ["function tokenURI(uint256 tokenId) view returns (string)"],
          provider
        );
        tokenURI = await nftContract.tokenURI(nft.tokenId);
        
        console.log(`🔗 Token URI: ${tokenURI}`);
        
        const meta = await fetchMetadataWithFallback(tokenURI);
        certifiedNFTs.push({ ...nft, metadata: meta, tokenURI });
        console.log(`  📄 Name: ${meta?.name || 'Unnamed'}`);
        console.log(`  📝 Description: ${meta?.description || 'No description'}`);
      } catch (e) {
        console.log(`⚠️  Failed to get metadata for ${nftAddress}#${nft.tokenId}: ${e}`);
        certifiedNFTs.push({ ...nft, metadata: null, tokenURI });
      }
    } else {
      console.log(`⏭️  Skipping non-certified contract: ${nft.contract.address}`);
    }
  }

  console.log("=".repeat(60));
  console.log(`🎓 Certified NFTs found: ${certifiedNFTs.length}`);
  console.log("\n📋 Summary:");
  certifiedNFTs.forEach((nft, index) => {
    console.log(`${index + 1}. ${nft.metadata?.name || 'Unnamed'}`);
    console.log(`   Contract: ${nft.contract.address}`);
    console.log(`   Token ID: ${nft.tokenId}`);
    console.log(`   Description: ${nft.metadata?.description || 'No description'}`);
    console.log(`   Image: ${nft.metadata?.image || 'No image'}`);
    console.log("");
  });
  
  return certifiedNFTs;
}

main().catch(console.error);
