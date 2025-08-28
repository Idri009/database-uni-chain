import React from "react";
import { candidate } from "../commonShare/allTypes";
import CandidateCard from "./CandidateCard";


export default function AllCandidatesList({candidates}: {candidates: candidate[]}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center text-xs text-gray-600 font-semibold mb-2">
          <span className="w-16">Ứng viên</span>
          <span className="ml-auto">Điểm danh tiếng</span>
        </div>
        {candidates.slice(0,candidates.length).map(c => (
          <CandidateCard key={c.rank} candidate={c} />
        ))}
      </div>
    </div>
  );
}
