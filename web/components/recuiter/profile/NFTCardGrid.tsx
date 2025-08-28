import React from "react";
import NFTCard from "./NFTCard";
import { candidate } from "../commonShare/allTypes";

const NFTCardGrid = ({candidate}: {candidate: candidate}) => (
  <div className="grid grid-cols-4 gap-6 mb-6">
    {candidate.NFT.slice(0, candidate.NFT.length).map(c => (
      <NFTCard NFTDetail={c}/>
    ))}
  </div>
);

export default NFTCardGrid;