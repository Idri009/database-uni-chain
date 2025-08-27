import React from "react";
import SkillCard from "../commonShare/SkillCard";
import { useState } from "react";
import CardToolbar from "../commonShare/CardToolbar";
import NFTFilterSidebar from "../../../components/recuiter/profile/NFTFilterSidebar";

export default function SkillCardGrid() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className="flex gap-6 px-8 mt-6">
      {showSidebar && <NFTFilterSidebar />}
      <div className="flex-1">
        <CardToolbar onToggleSidebar={() => setShowSidebar((v) => !v)} />
          <div className="font-bold text-lg mb-2">Bằng cấp, chứng chỉ liên quan</div>
          <div className="grid grid-cols-4 gap-6 mb-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <SkillCard key={idx} />
            ))}
          </div>
      </div>

    </div>
  );
}
