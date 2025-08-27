"use client";
import React, { useState } from "react";
import ProfileHeader from "../../../components/recuiter/profile/ProfileHeader";
import NFTFilterSidebar from "../../../components/recuiter/profile/NFTFilterSidebar";
import NFTCardGrid from "../../../components/recuiter/profile/NFTCardGrid";
import Pagination from "../../../components/recuiter/commonShare/Pagination";
import NavBar from "../../../components/recuiter/commonShare/NavBar";
import CardToolbar from "@/components/recuiter/commonShare/CardToolbar";
import ProfileInformation from "@/components/recuiter/profile/ProfileInformation";
import { candidate } from "@/components/recuiter/commonShare/allTypes";

export default function ProfilePage() {
  const [showSidebar, setShowSidebar] = useState(true);
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
      "Version Control (Git, GitHub)",
    ],
  };

  const sampleCandidate: candidate = {
    rank: 1,
    name: "Tong Thuan Nguyen",
    role: "Sinh viên Hệ thống thông tin",
    score: 5740,
    NFT: Array.from({ length: 8 }).map((_, idx) => sampleNFTDetail),
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen">
        <ProfileHeader candidate={sampleCandidate}/>
        <ProfileInformation />
        <div className="flex gap-6 px-8 mt-6">
          {/* Sidebar toggle logic */}
          {showSidebar && <NFTFilterSidebar />}
          <div className="flex-1">
            <CardToolbar onToggleSidebar={() => setShowSidebar((v) => !v)} />
            <NFTCardGrid candidate={sampleCandidate} />
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}
