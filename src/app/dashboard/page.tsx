// app/dashboard/page.tsx
"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();
  const [level, setLevel] = useState({
    current: 1,
    progress: 45,
    nextPoints: 155,
  });
  const [stats, setStats] = useState({ badges: 2, points: 215 });
  const [courses, setCourses] = useState([
    { id: 1, title: "Technology 101" },
    { id: 2, title: "Leadership Skills" },
    { id: 3, title: "Learn MongoDB" },
  ]);
  const [mvkRequirements, setMvkRequirements] = useState([
    { id: 1, title: "Leader I - Business & Growth", progress: 30 },
    { id: 2, title: "Leader I - Technology & Innovation", progress: 65 },
  ]);
  const [assessments, setAssessments] = useState([
    { id: 1, title: "Technology Quiz", dueDate: "May 25" },
    { id: 2, title: "Leadership Test", dueDate: "Jun 03" },
  ]);
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: "Sarah", points: 840 },
    { id: 2, name: "Mike", points: 720 },
    { id: 3, name: "Alex", points: 650 },
    { id: 4, name: "You", points: 215, isCurrentUser: true },
  ]);

  const handleLogout = () => {
    clearAuth();
    Cookies.remove("token");
    router.push("/login");
  };

  // In a real implementation, we would fetch data from the API here
  useEffect(() => {
    // This would be replaced with actual API calls
    // Example:
    // const fetchUserLevel = async () => {
    //   try {
    //     const response = await fetch('/api/gamification/my/level', {
    //       headers: { Authorization: `Bearer ${Cookies.get('token')}` }
    //     });
    //     const data = await response.json();
    //     setLevel(data);
    //   } catch (error) {
    //     console.error('Error fetching level:', error);
    //   }
    // };
    // fetchUserLevel();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#000000]">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-[#A1A1A1]">
            {user?.email} ({user?.role})
          </span>
          <button
            onClick={handleLogout}
            className="bg-[#1F1F1F] text-[#ffffff] px-4 py-2 rounded hover:bg-[#333333] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content - Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Learning Status Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#000000] mb-4">
            Learning Status
          </h2>
          <div className="space-y-3">
            <p className="text-[#A1A1A1]">Current Level: {level.current}</p>
            <p className="text-[#A1A1A1]">Progress: {level.progress}%</p>
            <p className="text-[#A1A1A1]">
              Points to Level {level.current + 1}: {level.nextPoints}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#1F1F1F] h-2.5 rounded-full"
                style={{ width: `${level.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* My Courses Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#000000] mb-4">My Courses</h2>
          <ul className="space-y-2 mb-4">
            {courses.map((course) => (
              <li key={course.id} className="text-[#A1A1A1]">
                • {course.title}
              </li>
            ))}
          </ul>
          <Link
            href="/courses"
            className="text-[#000000] font-medium hover:underline"
          >
            View All Courses
          </Link>
        </div>

        {/* Achievements Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#000000] mb-4">
            Achievements
          </h2>
          <div className="space-y-3">
            <p className="text-[#A1A1A1]">Badges: {stats.badges}</p>
            <p className="text-[#A1A1A1]">Points: {stats.points}</p>

            <div className="mt-4">
              <p className="text-[#000000] font-medium mb-2">Recent:</p>
              <p className="text-[#A1A1A1]">• First Steps</p>
              <p className="text-[#A1A1A1]">• Quick Learner</p>
            </div>
          </div>
        </div>

        {/* MVK Requirements Card - Spans full width on larger screens */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-bold text-[#000000] mb-4">
            MVK Requirements
          </h2>
          <div className="space-y-6">
            {mvkRequirements.map((req) => (
              <div key={req.id} className="space-y-2">
                <p className="text-[#A1A1A1]">{req.title}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#1F1F1F] h-2.5 rounded-full"
                    style={{ width: `${req.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-[#A1A1A1]">
                  {req.progress}% Complete
                </p>
              </div>
            ))}
            <div className="mt-2">
              <Link
                href="/mvk-requirements"
                className="text-[#000000] font-medium hover:underline"
              >
                View All Requirements
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Assessments Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#000000] mb-4">
            Upcoming Assessments
          </h2>
          <ul className="space-y-3">
            {assessments.map((assessment) => (
              <li key={assessment.id} className="text-[#A1A1A1]">
                • {assessment.title} - {assessment.dueDate}
              </li>
            ))}
          </ul>
        </div>

        {/* Leaderboard Card */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1 lg:col-span-2">
          <h2 className="text-xl font-bold text-[#000000] mb-4">Leaderboard</h2>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.id}
                className={`flex justify-between ${
                  user.isCurrentUser ? "font-medium" : ""
                }`}
              >
                <span className="text-[#A1A1A1]">
                  {user.id}. {user.name}
                </span>
                <span className="text-[#A1A1A1]">{user.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
