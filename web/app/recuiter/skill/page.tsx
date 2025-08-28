"use client";
import SkillHeader from "@/components/recuiter/skill/SkillHeader";
import SkillCardGrid from "@/components/recuiter/skill/SkillCardGrid";
import SkillTopEducation from "@/components/recuiter/skill/SkillTopEducation"
import NavBar from "@/components/recuiter/commonShare/NavBar";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import React, { useState } from "react";
import { skill, skillInfo, school } from "@/components/recuiter/skill/SkillType";

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

const sampleSkillInfo: skillInfo = {
  name: "Blockchain Development",
  description:
    "Blockchain Development là kỹ năng xây dựng và triển khai các ứng dụng phi tập trung (Dapps), hợp đồng thông minh (smart contracts) và hệ thống blockchain. Người sở hữu kỹ năng này có khả năng hiểu rõ các nguyên lý hoạt động của blockchain, nắm vững ngôn ngữ lập trình như Solidity, Rust hoặc có thể áp dụng vào các lĩnh vực như DeFi, NFT, hay quản trị dữ liệu phi tập trung.",
  NFT: Array.from({ length: 8 }).map(() => sampleSkill),
  participants: 5000,
};

export default function SkillPage() {
  
  return (
    <div>
      <NavBar />
      <div className="bg-gray-50 min-h-screen pb-8 text-black">
        <SkillHeader skillInfo={sampleSkillInfo}/>
        <div className="px-8">
          <SkillCardGrid skill={sampleSkillInfo.NFT} />
          <Pagination />
          <SkillTopEducation school={sampleSchool}/>
        </div>
      </div>
    </div>
  );
}
