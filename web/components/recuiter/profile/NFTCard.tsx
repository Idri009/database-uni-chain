import React from "react";

export default function NFTCard() {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center min-w-[220px] h-96 text-black">
      <img src="/certificate.png" alt="NFT" className="h-64 w-full mb-2 rounded object-cover" />
      <div className="font-bold mb-1 self-start">UIT Diploma</div>
      <div className="text-xs mb-1 self-start">Type: <b>Diploma</b></div>
      <div className="flex text-xs mb-1 self-start">
        <div className="text-xs mb-1 self-start">Issuer: <b>UIT</b></div>
        <div className="text-xs mb-1 self-end">Issue date: <b>01/01/2025</b></div>

      </div>
    </div>
  );
}
