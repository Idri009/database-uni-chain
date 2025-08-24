import React from "react";
import SkillCard from "../commonShare/SkillCard";

export default function SkillCardGrid() {
  return (
    <div>
      <div className="font-bold text-lg mb-2">Bằng cấp, chứng chỉ liên quan</div>
      <div className="grid grid-cols-4 gap-6 mb-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <SkillCard key={idx} />
        ))}
      </div>
    </div>
  );
}
