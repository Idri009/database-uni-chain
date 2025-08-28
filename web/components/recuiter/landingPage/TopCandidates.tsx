"use client";
import React from "react";
import { candidate } from "../commonShare/allTypes";
import CandidateCard from "../candidates/CandidateCard";
import { array } from "zod";
import { NFTDetail } from "../commonShare/allTypes";

// Candidate item component for reuse
const sampleNFTDetail: NFTDetail = {
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
    "Version Control (Git, GitHub)",
  ],
};

const candidates: candidate[] = [
  {
    rank: 1,
    name: "Tong Thuan Nguyen",
    role: "Sinh viên Hệ thống thông tin",
    score: 5740,
    NFT: Array.from({ length: 8 }).map((_, idx) => sampleNFTDetail),
  },
  {
    rank: 2,
    name: "Gitcoin Presents",
    role: "Business Analyst",
    score: 5740,
    NFT: Array.from({ length: 8 }).map((_, idx) => sampleNFTDetail),
  },
  {
    rank: 3,
    name: "Gitcoin Presents",
    role: "Web3 Developer",
    score: 5740,
    NFT: Array.from({ length: 8 }).map((_, idx) => sampleNFTDetail),
  },
  {
    rank: 4,
    name: "Gitcoin Presents",
    role: "Backend Developer",
    score: 5740,
    NFT: Array.from({ length: 8 }).map((_, idx) => sampleNFTDetail),
  },
  {
    rank: 5,
    name: "Gitcoin Presents",
    role: "Frontend Developer",
    score: 5740,
    NFT: Array.from({ length: 8 }).map((_, idx) => sampleNFTDetail),
  },
  {
    rank: 6,
    name: "Gitcoin Presents",
    role: "UI/UX Designer",
    score: 5740,
    NFT: Array.from({ length: 8 }).map((_, idx) => sampleNFTDetail),
  },
  {
    rank: 7,
    name: "Gitcoin Presents",
    role: "Fullstack Developer",
    score: 5740,
    NFT: Array.from({ length: 8 }).map((_, idx) => sampleNFTDetail),
  },
  {
    rank: 8,
    name: "Gitcoin Presents",
    role: "Project Manager",
    score: 5740,
    NFT: Array.from({ length: 8 }).map((_, idx) => sampleNFTDetail),
  },
  {
    rank: 9,
    name: "Gitcoin Presents",
    role: "Intern",
    score: 5740,
    NFT: Array.from({ length: 8 }).map((_, idx) => sampleNFTDetail),
  },
  {
    rank: 10,
    name: "Gitcoin Presents",
    role: "Intern",
    score: 5740,
    NFT: Array.from({ length: 8 }).map((_, idx) => sampleNFTDetail),
  },
];

type school = {
  name: string;
  logoUrl: string;
};

const TopCandidates = ({ school }: { school: school }) => (
  <section className="bg-white p-6 rounded shadow mt-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold" style={{ color: "#707A83" }}>
        Ứng viên hàng đầu
      </h2>
      <nav className="flex items-center gap-2">
        <div
          className="rounded-xl border-2 border-solid flex"
          style={{ height: "40px" }}
        >
          <span
            className="text-sm font-medium px-3 font-semibold self-center"
            style={{ color: "#04111D" }}
          >
            Tất cả trường đại học
          </span>
          {[...Array(5)].map((_, i) => (
            <button
              key={`logo-btn-${i}`}
              className="ml-2 py-1 rounded flex items-center justify-center"
            >
              <img src={school.logoUrl} alt={school.name} className="h-5 w-6" />
            </button>
          ))}
        </div>
        <button
          onClick={() => (window.location.href = "/recuiter/allCandidates")}
          className="rounded-xl border-2 border-solid border-gray-200 ml-2 px-3 py-1 rounded text-sm font-semibold cursor-pointer hover:bg-gray-100"
          style={{ height: "40px", color: "#04111D" }}
        >
          Tất cả
        </button>
      </nav>
    </div>
    <div className="grid grid-cols-2 gap-26">
      {[0, 5].map((startIdx) => (
        <div key={startIdx}>
          {/* Header row for each column */}
          <div className="flex items-center gap-4 mb-2 text-xs text-gray-600 font-semibold">
            <span className="">Ứng viên</span>
            <span className="ml-auto">Điểm danh tiếng</span>
          </div>

          {candidates.slice(startIdx, startIdx + 5).map((c) => (
            <CandidateCard key={c.rank} candidate={c} />
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default TopCandidates;
