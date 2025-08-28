"use client";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import SkillHeader from "@/components/recuiter/allSkills/SkillHeader";
import SkillToolbar from "@/components/recuiter/allSkills/SkillToolbar";
import SkillList from "@/components/recuiter/allSkills/SkillList";
import Pagination from "@/components/recuiter/commonShare/Pagination";

const allSkills = () => (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen pb-8">
            <SkillHeader />
            <div className="px-8">
                <SkillToolbar />
                <SkillList />
                <Pagination />
            </div>
        </div>
    </div>
);

export default allSkills;