"use client";
import NavBar from "@/components/recuiter/commonShare/NavBar";
import CandidatesHeader from "@/components/recuiter/candidates/CandidatesHeader";
import CandidatesToolbar from "@/components/recuiter/candidates/CandidatesToolbar";
import CandidatesList from "@/components/recuiter/candidates/CandidatesList";
import Pagination from "@/components/recuiter/commonShare/Pagination";

const candidates = () => (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen pb-8">
        <CandidatesHeader />
        <div className="px-8">
            <CandidatesToolbar />
            <CandidatesList />
            <Pagination />
        </div>
        </div>
    </div>
);

export default candidates;
