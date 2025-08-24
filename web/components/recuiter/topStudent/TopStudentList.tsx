import React from "react";
import SkillCard from "../commonShare/SkillCard";

const students = [
  { name: "Tong Thuan Nguyen", role: "Sinh viên Hệ thống thông tin", count: 10 },
  { name: "Gitcoin Presents", role: "Business Analyst", count: 10 },
  { name: "Gitcoin Presents", role: "Web3 Developer", count: 10 },
  { name: "Gitcoin Presents", role: "Backend Developer", count: 10 },
  { name: "Gitcoin Presents", role: "Frontend Developer", count: 10 },
];

export default function TopStudentList() {
  return (
    <div className="mt-8">
      {students.map((student, idx) => (
        <div key={idx} className="bg-blue-100 rounded-xl shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src="/logo-UIT.svg" alt="Avatar" className="h-8 w-8 rounded bg-white" />
              <div>
                <div className="font-semibold text-black">{student.name}</div>
                <div className="text-xs text-gray-500">{student.role}</div>
              </div>
            </div>
            <div className="font-bold text-sm text-right">Số lượng chứng chỉ đã học<br />{student.count}</div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, cardIdx) => (
              <SkillCard key={cardIdx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
