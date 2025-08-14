// input: address 
// output: edu NFT 
// goal filter trash NFT and only retrieve edu NFT
import { ethers } from "ethers";
import axios from "axios";
import eduHubJson from "./EduHub.json";

// --- CONFIGURATION ---
const ALCHEMY_API_KEY = "..";
const ALCHEMY_NETWORK = "base-sepolia"; 
const eduHubAddress = "0x62cd4e0C5B0D4587861a21710ed15ba1823a6341";
const userAddress = "..";

const provider = new ethers.JsonRpcProvider(`https://${ALCHEMY_NETWORK}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);

async function getAllNFTsForAddress(address: string) {
  const url = `https://${ALCHEMY_NETWORK}.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}`;
  const { data } = await axios.get(url);
  return data.ownedNfts || [];
}

async function main() {
  const eduHub = new ethers.Contract(eduHubAddress, eduHubJson.abi, provider);
  const nfts = await getAllNFTsForAddress(userAddress);
  const eduNFTs: any[] = [];

  for (const nft of nfts) {
    const nftAddress = nft.contract.address;
    let isEdu = false;
    try {
      isEdu = await eduHub.isEduNFT(nftAddress);
    } catch (e) {
      continue; // skip if call fails
    }
    if (isEdu) {
      // Get tokenURI and metadata
      let tokenURI = "";
      try {
        const nftContract = new ethers.Contract(
          nftAddress,
          ["function tokenURI(uint256 tokenId) view returns (string)"],
          provider
        );
        tokenURI = await nftContract.tokenURI(nft.tokenId);
        // If tokenURI is IPFS, convert to gateway URL
        if (tokenURI.startsWith("ipfs://")) {
          tokenURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
        }
        const meta = (await axios.get(tokenURI)).data;
        eduNFTs.push({ ...nft, metadata: meta });
      } catch (e) {
        eduNFTs.push({ ...nft, metadata: null });
      }
    }
  }

  console.log("EduHub NFTs for user:", eduNFTs);
}

main().catch(console.error);