import React from "react";

const contests = [
  { title: "VIETBUIDL HACKATHON", status: "Đang diễn ra", date: "01/01/2026", field: "Công nghệ thông tin", prize: "100,000 USD", location: "Trực tuyến" },
  { title: "VIETBUIDL HACKATHON", status: "Đang diễn ra", date: "01/01/2026", field: "Công nghệ thông tin", prize: "100,000 USD", location: "Trực tuyến" },
];

export default function StudentContestGrid() {
  return (
    <section className="mt-8 max-w-6xl mx-auto">
      <h2 className="font-bold text-lg mb-2">Tham gia các cuộc thi để chứng tỏ năng lực</h2>
      <div className="flex gap-2 mb-4">
        <button className="p-2 rounded bg-white shadow text-blue-700">Tất cả lĩnh vực</button>
        <button className="p-2 rounded bg-white shadow text-blue-700">IT</button>
        <button className="p-2 rounded bg-white shadow text-blue-700">Tài chính</button>
        <button className="p-2 rounded bg-white shadow text-blue-700">Kỹ năng mềm</button>
        <button className="p-2 rounded bg-white shadow text-blue-700">Ngôn ngữ</button>
        <button className="p-2 rounded bg-blue-700 text-white">Thi ngay</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {contests.map((c, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4">
            <div className="font-bold mb-1">{c.title}</div>
            <div className="flex gap-4 text-xs mb-2">
              <span>Trạng thái: <b>{c.status}</b></span>
              <span>Thời hạn đăng kí: <b>{c.date}</b></span>
              <span>Lĩnh vực: <b>{c.field}</b></span>
            </div>
            <div className="flex gap-4 text-xs">
              <span>Hình thức thi: <b>{c.location}</b></span>
              <span>Số lượng người dự thi: <b>1,000</b></span>
              <span>Tổng giải thưởng: <b>{c.prize}</b></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
