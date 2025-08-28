"use client";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import AllCandidatesHeader from "@/components/recuiter/allCandidates/AllCandidatesHeader";
import CandidatesToolbar from "@/components/recuiter/allCandidates/CandidatesToolbar";
import AllCandidatesList from "@/components/recuiter/allCandidates/AllCandidatesList";
import Pagination from "@/components/recuiter/commonShare/Pagination";

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

const AllCandidates = () => (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen pb-8">
        <AllCandidatesHeader />
        <div className="px-8">
            <CandidatesToolbar />
            <AllCandidatesList candidates={candidates}/>
            <Pagination />
        </div>
        </div>
    </div>
);

export default AllCandidates;
