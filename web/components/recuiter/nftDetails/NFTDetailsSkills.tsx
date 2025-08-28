import React from "react";
import { NFTDetail } from "../commonShare/allTypes";

const NFTDetailsSkills = ({NFTDetail}: {NFTDetail: NFTDetail}) => (
  <div>
    <div className="font-semibold mb-2">Skills</div>
    <ul className="list-disc pl-6 text-sm text-gray-700">
      {NFTDetail.skills.slice(0,NFTDetail.skills.length).map((skill, idx) => (
        <li key={idx}>{skill}</li>
      ))}
    </ul>
  </div>
);

export default NFTDetailsSkills;