import React from "react";

export default function SkillCard() {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center min-w-[220px] h-96 text-black">
        <img src="/certificate.png" alt="NFT" className="h-54 w-full mb-2 rounded object-cover" />
        <div className="font-bold mb-1 self-start">Blockchain Development</div>
        <div className="text-xs mb-1 self-start">Loại: <br></br><b>Bằng cấp</b></div>
        <div className="text-xs mb-1 self-start">Cấp độ: <br></br><b>Dễ</b></div>
        <div className="text-xs mb-1 self-start">Số lượng sinh viên tham gia:<br></br> <b>1000</b></div>
    </div>
  );
}
