import React from "react";
import { NFTDetail } from "../commonShare/allTypes";

const NFTDetailsDescription = ({ NFTDetail }: { NFTDetail: NFTDetail }) => (
    <div>
      <div className="font-semibold mb-2">About NFT</div>
      <div className="text-sm text-gray-700">{NFTDetail.description}</div>
    </div>
);

export default NFTDetailsDescription;
