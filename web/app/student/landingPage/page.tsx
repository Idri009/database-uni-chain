"use client";
import StudentHeader from "@/components/student/landingPage/StudentHeader";
import StudentPersonalPath from "@/components/student/landingPage/StudentPersonalPath";
import StudentCourseGrid from "@/components/student/landingPage/StudentCourseGrid";
import StudentContestGrid from "@/components/student/landingPage/StudentContestGrid";
import StudentCommunityGrid from "@/components/student/landingPage/StudentCommunityGrid";
import NavBar from "@/components/student/commonShare/NavBar";

export default function StudentLandingPage() {
  return (
    <div>
        <NavBar/>
        <div className="bg-gray-50 min-h-screen pb-8">
        <StudentHeader />
        <StudentPersonalPath />
        <StudentCourseGrid />
        <StudentContestGrid />
        <StudentCommunityGrid />
        </div>
    </div>
  );
}
