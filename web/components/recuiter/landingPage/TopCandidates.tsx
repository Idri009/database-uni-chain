import React from "react";

// Candidate item component for reuse
const CandidateItem = ({ candidate }: { candidate: typeof candidates[0] }) => (
  <div key={candidate.rank} className="flex items-center gap-4 mb-2" style={{ color: '#707A83' }}>
    <span className="font-bold w-4">{candidate.rank}</span>
    <img src="/next.svg" alt="Avatar" className="h-8 w-8" />
    <div>
      <div className="font-semibold" style={{color:'#04111D'}}>{candidate.name}</div>
      <div className="text-xs" color="#707A83">{candidate.role}</div>
    </div>
    <div className="ml-auto font-bold" style={{color: "#04111D"}}>{candidate.score.toLocaleString()}</div>
  </div>
);
const candidates = [
  { rank: 1, name: "Tong Thuan Nguyen", role: "Sinh viên Hệ thống thông tin", score: 5740 },
  { rank: 2, name: "Gitcoin Presents", role: "Business Analyst", score: 5740 },
  { rank: 3, name: "Gitcoin Presents", role: "Web3 Developer", score: 5740 },
  { rank: 4, name: "Gitcoin Presents", role: "Backend Developer", score: 5740 },
  { rank: 5, name: "Gitcoin Presents", role: "Frontend Developer", score: 5740 },
  { rank: 6, name: "Gitcoin Presents", role: "UI/UX Designer", score: 5740 },
  { rank: 7, name: "Gitcoin Presents", role: "Fullstack Developer", score: 5740 },
  { rank: 8, name: "Gitcoin Presents", role: "Project Manager", score: 5740 },
  { rank: 9, name: "Gitcoin Presents", role: "Intern", score: 5740 },
  { rank: 10, name: "Gitcoin Presents", role: "Intern", score: 5740 },
];


const TopCandidates = () => (
  <section className="bg-white p-6 rounded shadow mt-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold" style={{ color: '#707A83' }}>Ứng viên hàng đầu</h2>
      <nav className="flex items-center gap-2">
        <div className="rounded-xl border-2 border-solid flex" style={{ height: '40px'}}>
          <span className="text-sm font-medium px-3 font-semibold self-center" style={{color: "#04111D"}}>Tất cả trường đại học</span>
          {[...Array(5)].map((_, i) => (
            <button className="ml-2 py-1 rounded flex items-center justify-center">
              <img src="/logo-UIT.svg" alt="UIT Logo" className="h-5 w-6" />
            </button>
          ))}
        </div>
        <button className="rounded-xl border-2 border-solid border-gray-200 ml-2 px-3 py-1 rounded text-sm font-semibold " style={{ height: '40px', color: '#04111D' }}>Tất cả</button>
      </nav>
    </div>
    <div className="grid grid-cols-2 gap-26">
      {[0, 5].map(startIdx => (
        <div key={startIdx}>
          {/* Header row for each column */}
          <div className="flex items-center gap-4 mb-2 text-xs text-gray-600 font-semibold">
            <span className="">Ứng viên</span>
            <span className="ml-auto">Điểm danh tiếng</span>
          </div>
          {candidates.slice(startIdx, startIdx + 5).map(c => (
            <CandidateItem key={c.rank} candidate={c} />
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default TopCandidates;
