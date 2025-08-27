"use client";
import SchoolHeader from "@/components/recuiter/school/SchoolHeader";
import SchoolCardGrid from "@/components/recuiter/school/SchoolCardGrid";
import SchoolTopStudents from "@/components/recuiter/school/SchoolTopStudents";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import { school } from "@/components/recuiter/school/SchoolType";


export default function SchoolPage() {
  type skill = {
    name: string;
    type: string;
    level: string;
    participants: number;
  };

  const sampleSkill: skill = {
    name: "Blockchain Development",
    type: "Bằng cấp",
    level: "Dễ",
    participants: 1000,
  };

  const sampleSchool: school = {
    name: "ĐẠI HỌC CÔNG NGHỆ THÔNG TIN – ĐHQG TP. HỒ CHÍ MINH",
    logoUrl: "/logo-UIT.svg",
    address: "Viet Nam",
    NFT: Array.from({ length: 8 }).map(() => sampleSkill),
    participants: 5000,
    description:
      "UIT là một trong những trường top đầu về CNTT tại Việt Nam, hơn 10.000 chứng chỉ đã được phát hành và xác thực trên hệ thống",
    skills: 101,
  };

  type student = {
    name: string;
    role: string;
    count: number;
  };

  const sampleStudents: student[] = [
  {
    name: "Tong Thuan Nguyen",
    role: "Sinh viên Hệ thống thông tin",
    count: 5740,
  },
  { name: "Gitcoin Presents", role: "Business Analyst", count: 5740 },
  { name: "Gitcoin Presents", role: "Web3 Developer", count: 5740 },
  { name: "Gitcoin Presents", role: "Backend Developer", count: 5740 },
  { name: "Gitcoin Presents", role: "Frontend Developer", count: 5740 },
  { name: "Gitcoin Presents", role: "UI/UX Designer", count: 5740 },
  { name: "Gitcoin Presents", role: "Fullstack Developer", count: 5740 },
  { name: "Gitcoin Presents", role: "Project Manager", count: 5740 },
  { name: "Gitcoin Presents", role: "Director", count: 5740 },
  { name: "Gitcoin Presents", role: "Intern", count: 5740 },
];

  return (
    <div>
      <NavBar />
      <div className="bg-gray-50 min-h-screen pb-8 text-black">
        <SchoolHeader school={sampleSchool} />
        <div className="px-8">
          <SchoolCardGrid school={sampleSchool}/>
          <Pagination />
          <SchoolTopStudents students={sampleStudents}/>
        </div>
      </div>
    </div>
  );
}
