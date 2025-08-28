import React from "react";

export default function CandidatesToolbar() {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-lg font-semibold" style={{ color: '#707A83' }}>Tất cả ứng viên</div>
      <nav className="flex items-center gap-2">
        <div className="rounded-xl border-2 border-solid content-center" style={{ height: '40px'}}>
          <span className="text-sm font-medium px-2 font-semibold" style={{color: "#04111D"}}>Tất cả lĩnh vực</span>
          <button className="ml-2 px-3 py-1 rounded text-sm font-semibold " style={{color:"#04111D"}}>Kỹ thuật</button>
          <button className="ml-2 px-3 py-1 rounded text-sm font-semibold " style={{color:"#04111D"}}>Kinh tế</button>
          <button className="ml-2 px-3 py-1 rounded text-sm font-semibold " style={{color:"#04111D"}}>Ngôn ngữ</button>
        </div>
        <button className="rounded-xl border-2 border-solid border-gray-200 ml-2 px-3 py-1 rounded text-sm font-semibold cursor-pointer hover:bg-gray-100" style={{ height: '40px', color: '#04111D' }}>Tất cả</button>
      </nav>
    </div>
  );
}
