import { student } from "./SchoolType";

export default function StudentCard({ student }: { student: student }) {
  return (
    <tr
      onClick={() => (window.location.href = "/recuiter/profile")}
      className="border-b last:border-none hover:bg-gray-200 cursor-pointer"
    >
      <td className=" py-2 flex items-center gap-2">
        <img
          src="/avatar-user2.png"
          alt="Avatar"
          className="h-8 w-8 rounded bg-white"
        />
        <div>
          <div className="font-semibold text-black">{student.name}</div>
          <div className="text-xs text-gray-500">{student.role}</div>
        </div>
      </td>
      <td className="py-2 font-bold">{student.certificates}</td>
    </tr>
  );
}
