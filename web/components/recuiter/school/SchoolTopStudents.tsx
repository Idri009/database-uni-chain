import React from "react";

const students = [
  { name: "Tong Thuan Nguyen", role: "Sinh viên Hệ thống thông tin", count: 5740 },
  { name: "Gitcoin Presents", role: "Business Analyst", count: 5740 },
  { name: "Gitcoin Presents", role: "Web3 Developer", count: 5740 },
  { name: "Gitcoin Presents", role: "Backend Developer", count: 5740 },
  { name: "Gitcoin Presents", role: "Frontend Developer", count: 5740 },
  { name: "Gitcoin Presents", role: "UI/UX Designer", count: 5740 },
  { name: "Gitcoin Presents", role: "Fullstack Developer", count: 5740 },
  { name: "Gitcoin Presents", role: "Project Manager", count: 5740 },
  { name: "Gitcoin Presents", role: "Director", count: 5740 },
  { name: "Gitcoin Presents", role: "Intern", count: 5740 },
];

export default function SchoolTopStudents() {
  return (
    <div className="mt-8">
      <div className="font-bold text-lg mb-2">Học viên tiêu biểu</div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-2 gap-8">
          {[0, 1].map((col) => (
            <div key={col}>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm">
                    <th className="py-2">Ứng viên</th>
                    <th className="py-2">Số chứng chỉ sở hữu</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(col * 5, col * 5 + 5).map((student, idx) => (
                    <tr key={idx} className="border-b last:border-none">
                      <td className="py-2 flex items-center gap-2">
                        <img src="/avatar-user2.png" alt="Avatar" className="h-8 w-8 rounded bg-white" />
                        <div>
                          <div className="font-semibold text-black">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.role}</div>
                        </div>
                      </td>
                      <td className="py-2 font-bold">{student.count.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
