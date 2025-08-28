"use client";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import AllSkillHeader from "@/components/recuiter/allSkills/AllSkillHeader";
import SkillToolbar from "@/components/recuiter/allSkills/SkillToolbar";
import AllSkillList from "@/components/recuiter/allSkills/AllSkillList";
import Pagination from "@/components/recuiter/commonShare/Pagination";

const allSkills = () => (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen pb-8">
            <AllSkillHeader />
            <div className="px-8">
                <SkillToolbar />
                <AllSkillList />
                <Pagination />
            </div>
        </div>
    </div>
);

export default allSkills;