"use client";
import SkillHeader from "@/components/recuiter/skill/SkillHeader";
import SkillCardGrid from "@/components/recuiter/skill/SkillCardGrid";
import TopEducation from "@/components/recuiter/commonShare/TopEducation";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import CardToolbar from "@/components/recuiter/commonShare/CardToolbar";
import Pagination from "@/components/recuiter/commonShare/Pagination";
import React, { useState } from "react";
import NFTFilterSidebar from "../../../components/recuiter/profile/NFTFilterSidebar";

export default function SkillPage() {
  return (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen pb-8 text-black">
            <SkillHeader />
            <div className="px-8">
                <SkillCardGrid />
                <Pagination />
                <TopEducation />
            </div>
        </div>
    </div>
  );
}
