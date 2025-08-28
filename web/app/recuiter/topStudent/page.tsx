"use client";
import SchoolHeader from "@/components/recuiter/school/SchoolHeader";
import SkillCardGrid from "@/components/recuiter/allCertificates/SkillCardGrid";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import TopStudentList from "@/components/recuiter/topStudent/TopStudentList";
import {
  school,
  student,
  skill,
} from "@/components/recuiter/topStudent/TopStudentType";

export default function topStudent() {
  const sampleSkill: skill = {
    name: "Blockchain Development",
    type: "Bằng cấp",
    level: "Dễ",
    participants: 1000,
  };

  const sampleStudent: student = {
    name: "Tong Thuan Nguyen",
    role: "Sinh viên Hệ thống thông tin",
    certificates: 5740,
    NFT: Array.from({ length: 8 }).map(() => sampleSkill),
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
    students: Array.from({ length: 10 }).map(() => sampleStudent),
  };

  return (
    <div>
      <NavBar />
      <div className="bg-gray-50 min-h-screen pb-8 text-black">
        <SchoolHeader school={sampleSchool} />
        <div className="px-8">
          <TopStudentList student={sampleSchool.students} />
          <Pagination />
        </div>
      </div>
    </div>
  );
}
