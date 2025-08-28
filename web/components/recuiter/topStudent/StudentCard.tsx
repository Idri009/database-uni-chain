import NFTCard from "./NFTCard"
import {student} from "./TopStudentType"

export default function StudentCard({student}: {student: student}) {
    return (
        <div className="bg-blue-100 rounded-xl shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
            <img
                src="/logo-UIT.svg"
                alt="Avatar"
                className="h-8 w-8 rounded bg-white"
            />
            <div>
                <div className="font-semibold text-black">{student.name}</div>
                <div className="text-xs text-gray-500">{student.role}</div>
            </div>
            </div>
            <div className="font-bold text-sm text-right">
            Số lượng chứng chỉ đã học
            <br />
            {student.certificates}
            </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
            {student.NFT.slice(0,4).map(c=>(
                <NFTCard skill={c} />
            ))}
        </div>
        </div>
    )
}