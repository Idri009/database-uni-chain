import React from "react";

export default function SkillHeader() {
  return (
    <div className="text-center py-8">
      <h1 className="text-3xl font-bold mb-4">BLOCKCHAIN DEVELOPMENT</h1>
      <div className="max-w-2xl mx-auto text-gray-700 mb-6">
        Blockchain Development là kỹ năng xây dựng và triển khai các ứng dụng phi tập trung (Dapps), hợp đồng thông minh (smart contracts) và hệ thống blockchain. Người sở hữu kỹ năng này có khả năng hiểu rõ các nguyên lý hoạt động của blockchain, nắm vững ngôn ngữ lập trình như Solidity, Rust hoặc có thể áp dụng vào các lĩnh vực như DeFi, NFT, hay quản trị dữ liệu phi tập trung.
      </div>
      <div className="flex justify-center gap-12 mb-6">
        <div className="bg-white rounded shadow px-8 py-4">
          <div className="text-2xl font-bold">10.0K</div>
          <div className="text-gray-500">NFTs</div>
        </div>
        <div className="bg-white rounded shadow px-8 py-4">
          <div className="text-2xl font-bold">5.0K</div>
          <div className="text-gray-500">Người tham gia</div>
        </div>
      </div>
    </div>
  );
}
