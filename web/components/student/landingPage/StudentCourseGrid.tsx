import React from "react";

const courses = [
  { title: "Web3 Basics", desc: "Web3 Basics is the introductory course in this series...", level: "Dễ", org: "UIT" },
  { title: "Solidity 101", desc: "Introducing Solidity 101 – the first intro-level...", level: "Dễ", org: "UIT" },
  { title: "Introduction to Rust", desc: "This Rust basics course will guide you...", level: "Dễ", org: "UIT" },
  { title: "Move 101", desc: "In this course, we will explore Move's packages...", level: "Dễ", org: "UIT" },
  { title: "Decentralized Social Dapp", desc: "In this course, you will learn how to build...", level: "Trung bình", org: "UIT" },
  { title: "Introduction to Rust", desc: "This course will teach you how to build...", level: "Khó", org: "UIT" },
];

export default function StudentCourseGrid() {
  return (
    <section className="mt-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg mb-2 text-black">Các khóa học được chứng nhận</h2>
        <div className="flex justify-end gap-3 mb-4">
            <div className="border border-gray-300 rounded rounded-md px-2">
              <button className="p-2 text-black">Tất cả lĩnh vực</button>
              <button className="p-2 text-black">IT</button>
              <button className="p-2 text-black">Tài chính</button>
              <button className="p-2 text-black">Kỹ năng mềm</button>
              <button className="p-2 text-black">Ngôn ngữ</button>
            </div>
            <button className="p-2 rounded rounded-md bg-blue-500 text-white px-5">Bắt đầu học ngay</button>
        </div>
      </div>

      {/* Certificates */}
      <div className="grid grid-cols-3 gap-4">
        {courses.map((c, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4">
            <div className="font-bold mb-1">{c.title}</div>
            <div className="text-xs mb-2 text-gray-600">{c.desc}</div>
            <div className="flex gap-4 text-xs">
              <span>Độ khó: <b>{c.level}</b></span>
              <span>Đơn vị giáo dục: <b>{c.org}</b></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
