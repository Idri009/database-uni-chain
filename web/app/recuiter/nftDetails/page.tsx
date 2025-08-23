"use client";
import NFTDetailsCard from "@/components/recuiter/nftDetails/NFTDetailsCard";
import NFTDetailsTabs from "@/components/recuiter/nftDetails/NFTDetailsTabs";
import NFTDetailsRelatedGrid from "@/components/recuiter/nftDetails/NFTDetailsRelatedGrid";
import NavBar from "@/components/recuiter/commonShare/NavBar";

export default function NFTDetailsPage() {
  return (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen p-8 text-black">
        <div className="flex gap-6">
            <NFTDetailsCard />
            <div className="flex-1">
            <NFTDetailsTabs />
            </div>
        </div>
        <div className="mt-8">
            <NFTDetailsRelatedGrid />
        </div>
        </div>
    </div>
  );
}
