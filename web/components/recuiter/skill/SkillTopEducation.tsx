import React from "react";

export default function SkillTopEducation() {
  return (
    <div className="mt-8">
      <div className="font-bold text-lg mb-2">Đơn vị giáo dục hàng đầu</div>
      <div className="bg-blue-700 rounded-xl p-6 text-white flex gap-6 items-center">
        <div className="flex-1">
          <div className="font-bold text-lg mb-2">ĐẠI HỌC CÔNG NGHỆ THÔNG TIN – ĐHQG TP. HỒ CHÍ MINH</div>
          <div className="mb-2">Địa điểm: TP. Hồ Chí Minh</div>
          <div className="mb-2">Số lượng chứng chỉ phát hành: 10.000</div>
          <div className="mb-2">Số lượng sinh viên tham gia: 10.000</div>
          <div className="mb-2">Website: <a href="https://www.uit.edu.vn/" className="underline text-white" target="_blank" rel="noopener noreferrer">https://www.uit.edu.vn/</a></div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded mt-2">Tìm hiểu thêm</button>
        </div>
        <div className="flex gap-4">
          <div className="bg-white text-blue-700 rounded p-4 min-w-[220px] flex flex-col items-center h-96">
            <img src="/next.svg" alt="Skill" className="h-16 w-16 mb-2" />
            <div className="font-semibold mb-1">Blockchain Development</div>
            <div className="text-xs">Loại: Bằng cấp</div>
            <div className="text-xs">1.000 sinh viên tham gia</div>
          </div>
          <div className="bg-white text-blue-700 rounded p-4 min-w-[220px] flex flex-col items-center h-96">
            <img src="/next.svg" alt="Skill" className="h-16 w-16 mb-2" />
            <div className="font-semibold mb-1">Data Analysis</div>
            <div className="text-xs">Loại: Chứng chỉ</div>
            <div className="text-xs">1.000 sinh viên tham gia</div>
          </div>
        </div>
      </div>
    </div>
  );
}
