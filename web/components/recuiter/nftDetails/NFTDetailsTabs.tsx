import React, { useState } from "react";
import NFTDetailsDescription from "./NFTDetailsDescription";
import NFTDetailsSkills from "./NFTDetailsSkills";
import { NFTDetail } from "../commonShare/allTypes";

const NFTDetailsTabs = ({NFTDetail}: {NFTDetail: NFTDetail}) => {
  const [tab, setTab] = useState("description");
  return (
    <div className="bg-white rounded-xl shadow p-6 min-h-[300px]">
      <div className="flex gap-2 mb-4 border-b">
        <button
          className={`px-4 py-2 font-semibold rounded-t ${tab === "description" ? "bg-gray-100" : "bg-transparent"}`}
          onClick={() => setTab("description")}
        >
          Description
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-t ${tab === "skills" ? "bg-gray-100" : "bg-transparent"}`}
          onClick={() => setTab("skills")}
        >
          Skills
        </button>
      </div>
      {tab === "description" ? <NFTDetailsDescription NFTDetail={NFTDetail}/> : <NFTDetailsSkills NFTDetail={NFTDetail}/>}
    </div>
  );
}

export default NFTDetailsTabs;