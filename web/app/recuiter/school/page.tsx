"use client";
import SchoolHeader from "@/components/recuiter/school/SchoolHeader";
import SchoolCardGrid from "@/components/recuiter/school/SchoolCardGrid";
import SchoolTopStudents from "@/components/recuiter/school/SchoolTopStudents";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import NavBar from "@/components/recuiter/commonShare/NavBar";

export default function SchoolPage() {
  return (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen pb-8 text-black">
        <SchoolHeader />
        <div className="px-8">
            <SchoolCardGrid />
            <Pagination />
            <SchoolTopStudents />
        </div>
        </div>
    </div>
  );
}
