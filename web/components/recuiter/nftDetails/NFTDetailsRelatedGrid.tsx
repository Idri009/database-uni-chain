import React from "react";
import { NFTDetail } from "../commonShare/allTypes";
import NFTDetailsCard from "./NFTDetailsCard";

const NFTDetailsRelatedGrid = ({NFTDetail}: {NFTDetail: NFTDetail}) => (
  <div>
    <div className="font-bold text-lg mb-4">Related certificates</div>
    <div className="grid grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, idx) => (
        <NFTDetailsCard NFTDetail={NFTDetail} />
      ))}
    </div>
  </div>
);

export default NFTDetailsRelatedGrid;

