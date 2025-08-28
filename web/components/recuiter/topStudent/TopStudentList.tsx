import React from "react";
import SkillCard from "../commonShare/SkillCard";
import StudentCard from "./StudentCard"
import { student } from "./TopStudentType";

export default function TopStudentList({ student }: { student: student[] }) {
  return (
    <div>
    {student.slice(0,4).map((c) => (
      <StudentCard student={c}/>
    ))}
    </div>
  );
}
