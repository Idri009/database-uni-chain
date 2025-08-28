"use client";
import SchoolHeader from "@/components/recuiter/school/SchoolHeader";
import SchoolCardGrid from "@/components/recuiter/school/SchoolCardGrid";
import SchoolTopStudents from "@/components/recuiter/school/SchoolTopStudents";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import { school, student, skill } from "@/components/recuiter/school/SchoolType";


export default function SchoolPage() {
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

  const sampleStudents: student[] = [
  {
    name: "Tong Thuan Nguyen",
    role: "Sinh viên Hệ thống thông tin",
    certificates: 5740,
  },
  { name: "Gitcoin Presents", role: "Business Analyst", certificates: 5740 },
  { name: "Gitcoin Presents", role: "Web3 Developer", certificates: 5740 },
  { name: "Gitcoin Presents", role: "Backend Developer", certificates: 5740 },
  { name: "Gitcoin Presents", role: "Frontend Developer", certificates: 5740 },
  { name: "Gitcoin Presents", role: "UI/UX Designer", certificates: 5740 },
  { name: "Gitcoin Presents", role: "Fullstack Developer", certificates: 5740 },
  { name: "Gitcoin Presents", role: "Project Manager", certificates: 5740 },
  { name: "Gitcoin Presents", role: "Director", certificates: 5740 },
  { name: "Gitcoin Presents", role: "Intern", certificates: 5740 },
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
