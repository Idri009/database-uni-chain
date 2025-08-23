
"use client";
import React, { useState } from "react";
import ProfileHeader from "../../../components/recuiter/profile/ProfileHeader";
import NFTFilterSidebar from "../../../components/recuiter/profile/NFTFilterSidebar";
import NFTCardGrid from "../../../components/recuiter/profile/NFTCardGrid";
import Pagination from "../../../components/recuiter/profile/Pagination";
import NavBar from "../../../components/recuiter/commonShare/NavBar";
import NFTCardToolbar from "@/components/recuiter/profile/NFTCardToolbar";
import ProfileInformation from "@/components/recuiter/profile/ProfileInformation";

export default function ProfilePage() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen">
        <ProfileHeader />
        <ProfileInformation />
        <div className="flex gap-6 px-8 mt-6">
          {/* Sidebar toggle logic */}
          {showSidebar && <NFTFilterSidebar />}
          <div className="flex-1">
            <NFTCardToolbar onToggleSidebar={() => setShowSidebar((v) => !v)} />
            <NFTCardGrid />
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}