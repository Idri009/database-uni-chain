import React from "react";
import { FaGlobe, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { school } from "./TopStudentType";

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

const SchoolHeader = ({school}: {school: school}) => {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center items-center mb-4">
        <img src="/logo-UIT.svg" alt="School Logo" className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg object-contain" />
      </div>
      <h1 className="text-2xl font-bold mb-2">{school.name}</h1>
      <div className="max-w-2xl mx-auto text-gray-700 mb-4">
        {school.description}
      </div>
      <div className="flex justify-center gap-8 mb-6">
        <div className="bg-white rounded shadow px-8 py-4">
          <div className="text-2xl font-bold">10.0K</div>
          <div className="text-gray-500">NFTs</div>
        </div>
        <div className="bg-white rounded shadow px-8 py-4">
          <div className="text-2xl font-bold">{formatNumber(school.participants)}</div>
          <div className="text-gray-500">Người tham gia</div>
        </div>
        <div className="bg-white rounded shadow px-8 py-4">
          <div className="text-2xl font-bold">101</div>
          <div className="text-gray-500">Kỹ năng</div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mb-4 text-xl text-gray-600">
        <FaGlobe />
        <FaGithub />
        <FaLinkedin />
        <FaEnvelope />
      </div>
    </div>
  );
}

export default SchoolHeader;
