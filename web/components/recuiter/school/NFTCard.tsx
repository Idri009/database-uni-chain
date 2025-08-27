import React from "react";

type skill = {
  name: string;
  type: string;
  level: string;
  participants: number;
};

const NFTCard = ({skill}: {skill: skill}) => (
  <div className="bg-white rounded shadow p-4 flex flex-col items-center min-w-[220px] h-96 text-black cursor-pointer hover:bg-gray-200">
    <img
      src="/certificate.png"
      onClick={() => (window.location.href = "/recuiter/nftDetails")}
      alt="NFT"
      className="h-54 w-full mb-2 rounded object-cover"
    />
    <div className="font-bold mb-1 self-start">{skill.name}</div>
    <div className="text-xs mb-1 self-start">
      Loại: <br></br>
      <b>{skill.type}</b>
    </div>
    <div className="text-xs mb-1 self-start">
      Cấp độ: <br></br>
      <b>{skill.level}</b>
    </div>
    <div className="text-xs mb-1 self-start">
      Số lượng sinh viên tham gia:<br></br> <b>{skill.participants}</b>
    </div>
  </div>
);

export default NFTCard;