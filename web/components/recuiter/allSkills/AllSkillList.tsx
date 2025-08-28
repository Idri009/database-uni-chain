import React from "react";
import SkillCard from "./SkillCard";
import { skill } from "../commonShare/allTypes";

const skills: skill[] = Array.from({ length: 20 }).map((_, idx) => ({
  rank: idx + 1,
  name: "BlockChain Development",
  role: "Công nghệ thông tin",
  candidates: 5740,
  certificates: 5740,
}));

export default function AllSkillList() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center text-xs text-gray-600 font-semibold mb-2">
          <span className="ml-32">Kĩ năng</span>
          <span className="ml-130">Số lượng người học</span>
          <span className="ml-auto">Số lượng bằng cấp liên quan</span>
        </div>
        {skills.slice(0,skills.length).map(c => (
          <SkillCard key={c.rank} skill={c} />
        ))}
      </div>
    </div>
  );
}
