// app/dashboard/learner.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

interface LearnerDashboardProps {
  user: {
    email: string;
    role: string;
  };
  handleLogout: () => void;
}

export default function LearnerDashboard({
  user,
  handleLogout,
}: LearnerDashboardProps) {
  // State for learner-specific data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentLevel, setCurrentLevel] = useState(2);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [points, setPoints] = useState(215);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nextLevelPoints, setNextLevelPoints] = useState(155);

  // Mock data for learner dashboard components
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [courses, setCourses] = useState([
    { id: 1, title: "Technology 101", progress: 60 },
    { id: 2, title: "Leadership Skills", progress: 25 },
    { id: 3, title: "Learn MongoDB", progress: 10 },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mvkProgress, setMvkProgress] = useState([
    { id: 1, name: "Business & Growth", progress: 30 },
    { id: 2, name: "Technology & Innovation", progress: 65 },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [achievements, setAchievements] = useState([
    { id: 1, name: "First Steps", date: "May 12, 2025" },
    { id: 2, name: "Quick Learner", date: "May 15, 2025" },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pendingAssessments, setPendingAssessments] = useState([
    { id: 1, name: "Technology Quiz", dueDate: "May 25, 2025" },
    { id: 2, name: "Leadership Test", dueDate: "Jun 03, 2025" },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      description: "Completed Technology 101 - Module 1",
      timestamp: "Today, 10:30 AM",
    },
    {
      id: 2,
      description: "Earned Quick Learner badge",
      timestamp: "May 15, 10:15 AM",
    },
    {
      id: 3,
      description: "Started Leadership Skills",
      timestamp: "May 14, 3:45 PM",
    },
  ]);

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        {/* Mobile menu button would go here */}
        <div className="md:hidden">
          <h1 className="text-lg font-bold text-[#000000]">ACE LMS</h1>
        </div>

        {/* Search Bar - for larger screens */}
        <div className="hidden md:block flex-1 max-w-lg mx-4">
          <input
            type="text"
            placeholder="Search courses and learning paths..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F1F1F]"
          />
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-[#A1A1A1]">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="bg-[#1F1F1F] text-[#ffffff] px-4 py-2 rounded hover:bg-[#333333] transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="p-6">
        {/* Welcome Banner */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-[#000000]">
            Welcome back, {user?.email}
          </h2>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="text-[#A1A1A1]">Current Level: {currentLevel}</div>
            <div className="text-[#A1A1A1]">Points: {points}</div>
            <div className="text-[#A1A1A1]">
              Next Level: {nextLevelPoints} more points
            </div>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* My Learning Progress */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              My Learning Progress
            </h3>

            {/* Courses with progress bars */}
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#A1A1A1]">{course.title}</span>
                    <span className="text-[#A1A1A1]">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#1F1F1F] h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link
                href="/courses"
                className="text-[#000000] font-medium hover:underline"
              >
                View All Courses
              </Link>
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Recommended For You
            </h3>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-[#000000]">
                  Advanced Leadership
                </h4>
                <p className="text-[#A1A1A1] text-sm">
                  Develop strategic management skills
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-[#000000]">
                  Financial Fundamentals
                </h4>
                <p className="text-[#A1A1A1] text-sm">
                  Essential financial knowledge for all roles
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-[#000000]">
                  Data Analytics Basics
                </h4>
                <p className="text-[#A1A1A1] text-sm">
                  Introduction to data-driven decision making
                </p>
              </div>
            </div>
          </div>

          {/* MVK Certification Progress */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              MVK Certification Progress
            </h3>

            <div className="space-y-4">
              {mvkProgress.map((cert) => (
                <div key={cert.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#A1A1A1]">
                      Leader I - {cert.name}
                    </span>
                    <span className="text-[#A1A1A1]">{cert.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#1F1F1F] h-2 rounded-full"
                      style={{ width: `${cert.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}

              <div className="text-[#A1A1A1] mt-2">
                Requirements remaining: 8
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="/mvk"
                className="text-[#000000] font-medium hover:underline"
              >
                View All Requirements
              </Link>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Recent Achievements
            </h3>

            <div className="space-y-3">
              {achievements.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    🏆
                  </div>
                  <div>
                    <div className="font-medium text-[#000000]">
                      {badge.name}
                    </div>
                    <div className="text-xs text-[#A1A1A1]">{badge.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link
                href="/achievements"
                className="text-[#000000] font-medium hover:underline"
              >
                View All Achievements
              </Link>
            </div>
          </div>

          {/* Pending Assessments */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Pending Assessments
            </h3>

            <div className="space-y-3">
              {pendingAssessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="flex justify-between p-3 border rounded"
                >
                  <span className="text-[#000000]">{assessment.name}</span>
                  <span className="text-[#A1A1A1]">
                    Due: {assessment.dueDate}
                  </span>
                </div>
              ))}
            </div>

            {pendingAssessments.length === 0 && (
              <p className="text-[#A1A1A1] italic">No pending assessments</p>
            )}

            <div className="mt-4">
              <Link
                href="/assessments"
                className="text-[#000000] font-medium hover:underline"
              >
                View All Assessments
              </Link>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Recent Activity
            </h3>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-3 border-b"
                >
                  <div className="w-2 h-2 rounded-full bg-[#1F1F1F] mt-2"></div>
                  <div className="flex-1">
                    <div className="text-[#000000]">{activity.description}</div>
                    <div className="text-xs text-[#A1A1A1]">
                      {activity.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
