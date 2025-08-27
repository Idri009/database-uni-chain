import React from "react";

type student = {
  name: string;
  role: string;
  count: number;
};

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
                  {students.slice(col * 5, col * 5 + 5).map((student, idx) => (
                    <tr
                      key={idx}
                      onClick={() =>
                        (window.location.href = "/recuiter/profile")
                      }
                      className="border-b last:border-none hover:bg-gray-200 cursor-pointer"
                    >
                      <td className=" py-2 flex items-center gap-2">
                        <img
                          src="/avatar-user2.png"
                          alt="Avatar"
                          className="h-8 w-8 rounded bg-white"
                        />
                        <div>
                          <div className="font-semibold text-black">
                            {student.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {student.role}
                          </div>
                        </div>
                      </td>
                      <td className="py-2 font-bold">
                        {student.count.toLocaleString()}
                      </td>
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
