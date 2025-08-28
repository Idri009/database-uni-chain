"use client";
import NFTDetailsCard from "@/components/recuiter/nftDetails/NFTDetailsCard";
import NFTDetailsTabs from "@/components/recuiter/nftDetails/NFTDetailsTabs";
import NFTDetailsRelatedGrid from "@/components/recuiter/nftDetails/NFTDetailsRelatedGrid";
import NavBar from "@/components/recuiter/commonShare/NavBar";

export default function NFTDetailsPage() {
  const sampleNFTDetail = {
    name: "UIT diploma",
    ownerAddress: "0x283132390ea87....",
    type: "Diploma",
    status: "Valid",
    issuer: "UIT",
    issueDate: "01/01/2025",
    expiredDate: "None",
    contractAddress: "0x283132390ea87....",
    description:
      "The UIT Diploma in Blockchain Development certifies the holder has successfully completed a comprehensive program covering blockchain fundamentals, smart contract development, and decentralized application design. The program includes theoretical foundations, hands-on coding projects, and deployment on public blockchain networks. This diploma is issued by the University of Information Technology and cryptographically verified on the Ethereum blockchain.",
    skills: [
      "Smart Contract Development (Solidity, Hardhat, Truffle)",
      "Decentralized Application (DApp) Architecture",
      "Token Standards (ERC-20, ERC-721, ERC-1155)",
      "Blockchain Security Principles",
      "Frontend–Blockchain Integration (Web3.js, Ethers.js)",
      "Version Control (Git, GitHub)"
    ],
  };
  return (
    <div>
      <NavBar />
      <div className="bg-gray-50 min-h-screen p-8 text-black">
        <div className="flex gap-6">
          <NFTDetailsCard NFTDetail={sampleNFTDetail} />
          <div className="flex-1">
            <NFTDetailsTabs NFTDetail={sampleNFTDetail}/>
          </div>
        </div>
        <div className="mt-8">
          <NFTDetailsRelatedGrid NFTDetail={sampleNFTDetail}/>
        </div>
      </div>
    </div>
  );
}
