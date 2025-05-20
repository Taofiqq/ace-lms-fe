// app/gamification/page.tsx
"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Import role-specific components
import LearnerGamification from "./learner";
import InstructorGamification from "./instructor";

export default function GamificationPage() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  // Handle cases where the user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = () => {
    clearAuth();
    Cookies.remove("token");
    router.push("/login");
  };

  // If user is not loaded yet or not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-[#000000] mb-2">Loading...</h1>
          <p className="text-[#A1A1A1]">
            Please wait while we load your gamification data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#FAFAFA]">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-[#000000]">ACE LMS</h1>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="mb-4 px-4 py-2 bg-gray-100 rounded-md">
            <p className="text-sm font-medium text-[#A1A1A1]">Logged in as:</p>
            <p className="text-[#000000] font-medium">{user.role}</p>
          </div>

          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="block py-2 px-4 rounded text-[#A1A1A1] hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className="block py-2 px-4 rounded text-[#A1A1A1] hover:bg-gray-100"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/mvk"
                className="block py-2 px-4 rounded text-[#A1A1A1] hover:bg-gray-100"
              >
                MVK
              </Link>
            </li>
            <li>
              <Link
                href="/assessments"
                className="block py-2 px-4 rounded text-[#A1A1A1] hover:bg-gray-100"
              >
                Assessments
              </Link>
            </li>
            <li>
              <Link
                href="/gamification"
                className="block py-2 px-4 rounded bg-[#1F1F1F] text-white"
              >
                Gamification
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="block py-2 px-4 rounded text-[#A1A1A1] hover:bg-gray-100"
              >
                Leaderboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content - Render based on user role */}
      {user.role === "admin" && (
        <div className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-[#000000] mb-4">
              Gamification System Administration
            </h2>
            <p className="text-[#A1A1A1] mb-6">
              As an admin, you can manage the gamification system, create
              badges, achievements, and levels.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/admin/gamification/badges"
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                <h3 className="text-xl font-bold text-[#000000] mb-2">
                  Badge Management
                </h3>
                <p className="text-[#A1A1A1]">
                  Create and manage badges that users can earn
                </p>
              </Link>
              <Link
                href="/admin/gamification/achievements"
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                <h3 className="text-xl font-bold text-[#000000] mb-2">
                  Achievement Management
                </h3>
                <p className="text-[#A1A1A1]">
                  Define achievements and their criteria
                </p>
              </Link>
              <Link
                href="/admin/gamification/levels"
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                <h3 className="text-xl font-bold text-[#000000] mb-2">
                  Level Management
                </h3>
                <p className="text-[#A1A1A1]">
                  Configure user progression levels
                </p>
              </Link>
              <Link
                href="/admin/gamification/reports"
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                <h3 className="text-xl font-bold text-[#000000] mb-2">
                  Engagement Reports
                </h3>
                <p className="text-[#A1A1A1]">
                  Analytics on user engagement with gamification
                </p>
              </Link>
            </div>
          </div>
          <button
            onClick={() => router.push("/admin/gamification/initialize")}
            className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]"
          >
            Initialize Gamification System
          </button>
        </div>
      )}

      {user.role === "instructor" && (
        <InstructorGamification user={user} handleLogout={handleLogout} />
      )}

      {user.role === "learner" && (
        <LearnerGamification user={user} handleLogout={handleLogout} />
      )}
    </div>
  );
}
