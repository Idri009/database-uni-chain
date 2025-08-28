"use client";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import AllSchoolHeader from "@/components/recuiter/allSchool/AllSchoolHeader";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import SchoolToolbar from "@/components/recuiter/allSchool/SchoolToolBar";
import AllSchoolList from "@/components/recuiter/allSchool/AllSchoolList";

const sampleSchools: school[] = Array.from({ length: 20 }).map((_, idx) => ({
  rank: idx + 1,
  name: "Đại học Công nghệ thông tin - ĐHQG TP.HCM",
  role: "TP.Hồ Chí Minh",
  candidates: 30000,
  certificates: 500,
}));

const allSchools = () => (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen p-8">
            <AllSchoolHeader />
            <div className="px-8">
                <SchoolToolbar />
                <AllSchoolList school={sampleSchools}/>
                <Pagination />
            </div>
        </div>
    </div>
);

export default allSchools;