"use client";
import React from "react";
import SkillCard from "./SkillCard";
import { school, skill } from "./SkillType";

const education = {
  name: "ĐẠI HỌC CÔNG NGHỆ THÔNG TIN – ĐHQG TP. HỒ CHÍ MINH",
  decripstion:
    "UIT là một trong những trường top đầu về CNTT tại Việt Nam, hơn 10.000 chứng chỉ đã được phát hành và xác thực trên hệ thống",
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

const SkillTopEducation = ({ school }: { school: school }) => (
  <section className="bg-white p-6 pb-0 rounded shadow mt-6">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold" style={{ color: "#707A83" }}>
        Đơn vị giáo dục hàng đầu
      </h2>
      <button
        onClick={() => (window.location.href = "/recuiter/allSchool")}
        className="rounded-xl border-2 border-solid border-gray-200 ml-2 px-4 py-2 rounded text-sm font-semibold cursor-pointer hover:bg-gray-100 text-black"
      >
        Tất cả
      </button>
    </div>
    <section
      className="pt-5 text-white p-6 pt-0 rounded shadow mt-4"
      style={{ background: "#005BB5" }}
    >
      <h2 className="text-lg font-bold mb-2">{school.name}</h2>
      <div className="mb-2">{school.description}</div>
      <div className="flex items-center gap-4 mb-4">
        <div className="">
          <div className="mb-2 font-bold">Địa điểm: {school.address}</div>
          <div className="mb-2 font-bold">
            Số lượng chứng chỉ phát hành: 10.0K
          </div>
          <div className="mb-2 font-bold">
            Số lượng sinh viên gia nhập: 10.0K
          </div>
          <div className="mb-2 font-bold">
            Website:{" "}
            <a
              href="https://www.uit.edu.vn/"
              className="underline text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              {education.website}
            </a>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded self-end cursor-pointer"
            onClick={() => (window.location.href = "/recuiter/school")}
            style={{ color: "#FFFF" }}
          >
            Tìm hiểu thêm
          </button>
        </div>
        <div className="flex gap-4 mt-4">
          {school.NFT.slice(0,4).map(c => (
            <SkillCard skill={c} />
          ))}
        </div>
      </div>
    </section>
  </section>
);

export default SkillTopEducation;
