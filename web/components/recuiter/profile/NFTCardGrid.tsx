import React from "react";
import NFTCard from "./NFTCard";

export default function NFTCardGrid() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {Array.from({ length: 8 }).map((_, idx) => (
        <NFTCard key={idx} />
      ))}
    </div>
  );
}
