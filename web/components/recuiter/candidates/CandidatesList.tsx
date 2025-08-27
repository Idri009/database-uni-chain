import React from "react";
import { candidate } from "../commonShare/allTypes";
import CandidateCard from "./CandidateCard";

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

const candidates: candidate[] = Array.from({ length: 20 }).map((_, idx) => ({
  rank: idx + 1,
  name: "Tong Thuan Nguyen",
  role: "Sinh viên Hệ thống thông tin",
  score: 5740,
  NFT: Array.from({ length: 8 }).map((_, idx) => (
    sampleNFTDetail
  )),
}));

export default function CandidatesList() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center text-xs text-gray-600 font-semibold mb-2">
          <span className="w-16">Ứng viên</span>
          <span className="ml-auto">Điểm danh tiếng</span>
        </div>
        {candidates.slice(0,candidates.length).map(c => (
          <CandidateCard key={c.rank} candidate={c} />
        ))}
      </div>
    </div>
  );
}
