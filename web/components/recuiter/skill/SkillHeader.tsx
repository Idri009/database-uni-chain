import React from "react";
import { skillInfo } from "./SkillType";

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export default function SkillHeader({skillInfo}: {skillInfo: skillInfo}) {
  return (
    <div className="text-center pt-8 pb-0">
      <h1 className="text-3xl font-bold mb-4">{skillInfo.name}</h1>
      <div className="max-w-2xl mx-auto text-gray-700 mb-6">
        {skillInfo?.description}
      </div>
      <div className="flex justify-center gap-12 mb-6">
        <div className="bg-white rounded shadow px-8 py-4">
          <div className="text-2xl font-bold">10.0K</div>
          <div className="text-gray-500">NFTs</div>
        </div>
        <div className="bg-white rounded shadow px-8 py-4">
          <div className="text-2xl font-bold">{formatNumber(skillInfo.participants)}</div>
          <div className="text-gray-500">Người tham gia</div>
        </div>
      </div>
    </div>
  );
}
