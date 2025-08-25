"use client";
import React from "react";
import SkillCard from "./SkillCard";

const education = {
  name: "ĐẠI HỌC CÔNG NGHỆ THÔNG TIN – ĐHQG TP. HỒ CHÍ MINH",
  decripstion: "UIT là một trong những trường top đầu về CNTT tại Việt Nam, hơn 10.000 chứng chỉ đã được phát hành và xác thực trên hệ thống",
  location: "TP. Hồ Chí Minh",
  certificates: 10000,
  students: 10000,
  website: "https://www.uit.edu.vn/",
  skills: [
    { name: "Blockchain Development", type: "Bằng cấp", participants: 1000 },
    { name: "Data Analysis", type: "Chứng chỉ", participants: 1000 },
    { name: "Data Analysis", type: "Chứng chỉ", participants: 1000 },
  ],
};

const TopEducation = () => (
  
  <section className="bg-white p-6 pb-0 rounded shadow mt-6">
    <h2 className="text-lg font-semibold mb-4" style={{ color: '#707A83' }}>Đơn vị giáo dục hàng đầu</h2>
    <section className="bg-blue-700 pt-5 text-white p-6 pt-0 rounded shadow mt-6">
      <h2 className="text-lg font-bold mb-2">{education.name}</h2>
      <div className="mb-2">{education.decripstion}</div>
      <div className="flex items-center gap-4 mb-4">
        <div className="">
          <div className="mb-2 font-bold">Địa điểm: {education.location}</div>
          <div className="mb-2 font-bold">Số lượng chứng chỉ phát hành: {education.certificates.toLocaleString()}</div>
          <div className="mb-2 font-bold">Số lượng sinh viên gia nhập: {education.students.toLocaleString()}</div>
          <div className="mb-2 font-bold">Website: <a href={education.website} className="underline text-white" target="_blank" rel="noopener noreferrer">{education.website}</a></div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded self-end" onClick={() => window.location.href = "/recuiter/school"} style={{ color: '#FFFF' }}>Tìm hiểu thêm</button>
        </div>
        <div className="flex gap-4 mt-4">
          {education.skills.map((skill, idx) => (
            <SkillCard key={idx} />
          ))}
        </div>
        </div>
    </section>
  </section>
);

export default TopEducation;
