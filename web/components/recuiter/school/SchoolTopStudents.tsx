import React from "react";
import StudentCard from "./StudentCard";
import { student } from "./SchoolType";

export default function SchoolTopStudents({students}: {students: student[]}) {
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
                  {students.slice(col * 5, col * 5 + 5).map((c) => (
                    <StudentCard student={c} />
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
