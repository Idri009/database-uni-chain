import React from "react";

const skills = [
  { id:1, name: "Blockchain Development", learners: 10000, certificates: 1000 },
  { id:2, name: "Data Analysis", learners: 10000, certificates: 1000 },
  { id:3, name: "English", learners: 10000, certificates: 1000 },
  { id:4, name: "AI Fundamentals", learners: 10000, certificates: 1000 },
  { id:5, name: "System design", learners: 10000, certificates: 1000 },
];

const SkillItems = ({ skill }: { skill: typeof skills[0] }) => (
  <div key={skill.id} className="min-w-[220px] bg-gray-100 rounded p-4 flex flex-col items-center">
    <div className="font-semibold mb-1 self-start" style={{color: "#000000"}}>#{skill.id} <br></br> {skill.name}</div>
      <div className="text-xs text-gray-500 self-start">
        Số lượng người học: 
        <div className="font-bold" style={{color: "#000000"}}>{skill.learners.toLocaleString()}</div>
        </div>
      <div className="text-xs text-gray-500 self-start">
        Số lượng bằng cấp liên quan: 
        <div className="font-bold" style={{color: "#000000"}}>{skill.certificates.toLocaleString()}</div>
        </div>
  </div>
);
 
const TrendSkills = () => (
  <section className="bg-white p-6 pb-0 rounded shadow mt-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold mb-4" style={{ color: '#707A83' }}>Kĩ năng xu hướng</h2>
      <nav className="flex items-center gap-2">
        <div className="rounded-xl border-2 border-solid content-center" style={{ height: '40px'}}>
          <span className="text-sm font-medium px-2 font-semibold" style={{color: "#04111D"}}>Tất cả lĩnh vực</span>
          <button className="ml-2 px-3 py-1 rounded text-sm font-semibold " style={{color:"#04111D"}}>IT</button>
          <button className="ml-2 px-3 py-1 rounded text-sm font-semibold " style={{color:"#04111D"}}>Tài chính</button>
          <button className="ml-2 px-3 py-1 rounded text-sm font-semibold " style={{color:"#04111D"}}>Kỹ năng mềm</button>
          <button className="ml-2 px-3 py-1 rounded text-sm font-semibold " style={{color:"#04111D"}}>Ngôn ngữ</button>
        </div>
  <button className="rounded-xl border-2 border-solid border-gray-200 ml-2 px-3 py-1 rounded text-sm font-semibold " style={{ height: '40px', color: '#04111D' }}>Tất cả</button>
      </nav>
    </div>
    <div className="flex gap-4 overflow-x-auto">
      {skills.map(c => (
            <SkillItems key={c.id} skill={c} />
          ))}
    </div>
  </section>
);

export default TrendSkills;
