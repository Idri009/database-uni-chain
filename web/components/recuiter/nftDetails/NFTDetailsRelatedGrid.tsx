import React from "react";
import NFTCard from "../profile/NFTCard";
export default function NFTDetailsRelatedGrid() {
  return (
    <div>
      <div className="font-bold text-lg mb-4">Related certificates</div>
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <NFTCard key={idx} />
        ))}
      </div>
    </div>
  );
}
