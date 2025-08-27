import { school } from "../commonShare/allTypes";

const SchoolCard = ({ school }: { school: school }) => (
  <div
    key={school.rank}
    className="flex items-center gap-4 mb-2 cursor-pointer hover:bg-gray-100 rounded px-2"
    style={{ color: '#707A83' }}
    onClick={() => window.location.href = '/recuiter/school'}
  >
    <span className="font-bold w-4">{school.rank}</span>
    <img src="/avatar-user2.png" alt="Avatar" className="h-10 w-10 rounded rounded-xm" />
    <div>
      <div className="font-semibold" style={{color:'#04111D'}}>{school.name}</div>
      <div className="text-xs" color="#707A83">{school.role}</div>
    </div>
    <div className="ml-95 font-bold" style={{color: "#04111D"}}>{school.candidates.toLocaleString()}</div>
    <div className="ml-auto font-bold" style={{color: "#04111D"}}>{school.certificates.toLocaleString()}</div>
  </div>
);

export default SchoolCard;