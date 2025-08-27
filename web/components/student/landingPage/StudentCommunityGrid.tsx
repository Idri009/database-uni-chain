import React from "react";

const communities = [
  { title: "VIETBUIDL HACKATHON", field: "Công nghệ thông tin", date: "01/01/2026", location: "Ho Chi Minh City", prize: "$4,000,000" },
  { title: "VIETBUIDL HACKATHON", field: "Công nghệ thông tin", date: "01/01/2026", location: "Ho Chi Minh City", prize: "$4,000,000" },
];

export default function StudentCommunityGrid() {
  return (
    <section className="mt-8 max-w-6xl mx-auto">
      <h2 className="font-bold text-lg mb-2">Mở rộng quan hệ thông qua cộng đồng</h2>
      <div className="flex justify-end mb-2">
        <button className="p-2 rounded bg-blue-700 text-white">Tham gia ngay</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {communities.map((c, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4">
            <div className="font-bold mb-1">{c.title}</div>
            <div className="text-green-600 font-bold text-2xl mb-2">{c.prize}</div>
            <div className="flex gap-4 text-xs mb-2">
              <span>Lĩnh vực: <b>{c.field}</b></span>
              <span>Thời gian diễn ra: <b>{c.date}</b></span>
              <span>Địa điểm: <b>{c.location}</b></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
