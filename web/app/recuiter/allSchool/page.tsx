"use client";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import SchoolHeader from "@/components/recuiter/allSchool/SchoolHeader";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import SchoolToolbar from "@/components/recuiter/allSchool/SchoolToolBar";
import SchoolList from "@/components/recuiter/allSchool/SchoolList";

const allSchools = () => (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen p-8">
            <SchoolHeader />
            <div className="px-8">
                <SchoolToolbar />
                <SchoolList />
                <Pagination />
            </div>
        </div>
    </div>
);

export default allSchools;