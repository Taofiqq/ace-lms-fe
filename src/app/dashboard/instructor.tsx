// app/dashboard/instructor.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

interface InstructorDashboardProps {
  user: {
    email: string;
    role: string;
  };
  handleLogout: () => void;
}

export default function InstructorDashboard({
  user,
  handleLogout,
}: InstructorDashboardProps) {
  // Mock data for instructor dashboard components
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myCourses, setMyCourses] = useState([
    {
      id: 1,
      title: "Business Ethics",
      studentCount: 42,
      lastUpdated: "Yesterday",
    },
    {
      id: 2,
      title: "Data Analytics",
      studentCount: 28,
      lastUpdated: "2 days ago",
    },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [studentProgress, setStudentProgress] = useState({
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        name: "Business Ethics",
        data: [85, 70, 65, 60, 55],
      },
      {
        name: "Data Analytics",
        data: [70, 65, 60, 55, 50],
      },
    ],
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      description: "5 new assessment submissions to grade",
      timestamp: "Today, 11:30 AM",
    },
    {
      id: 2,
      description: '3 learners completed "Business Ethics" module',
      timestamp: "Yesterday, 3:15 PM",
    },
    {
      id: 3,
      description: 'Question from learner: "When is the next..."',
      timestamp: "May 18, 2:45 PM",
    },
  ]);

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="md:hidden">
          <h1 className="text-lg font-bold text-[#000000]">ACE LMS</h1>
        </div>

        {/* Search Bar - for larger screens */}
        <div className="hidden md:block flex-1 max-w-lg mx-4">
          <input
            type="text"
            placeholder="Search students, courses, assessments..."
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
        {/* Instructor Welcome Banner */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-[#000000]">
            Welcome back, Instructor {user?.email}
          </h2>
          <p className="text-[#A1A1A1] mt-2">
            You have 5 pending assessments to grade and 2 new course enrollments
            today.
          </p>
        </div>

        {/* My Courses Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#000000] mb-4">MY COURSES</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Existing Courses */}
            {myCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold text-[#000000] mb-2">
                  {course.title}
                </h3>
                <div className="mt-3 text-[#A1A1A1]">
                  {course.studentCount} Students
                </div>
                <div className="mt-1 text-[#A1A1A1]">
                  Last updated: {course.lastUpdated}
                </div>
                <div className="mt-4 flex space-x-2">
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-[#1F1F1F] hover:underline text-sm"
                  >
                    View Course
                  </Link>
                  <span className="text-[#A1A1A1]">|</span>
                  <Link
                    href={`/courses/${course.id}/students`}
                    className="text-[#1F1F1F] hover:underline text-sm"
                  >
                    View Students
                  </Link>
                </div>
              </div>
            ))}

            {/* Create New Course Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200">
              <div className="text-4xl mb-2 text-[#A1A1A1]">+</div>
              <h3 className="text-lg font-bold text-[#000000] mb-2">
                Create New Course
              </h3>
              <p className="text-[#A1A1A1] text-sm mb-4">
                Add a new course to your curriculum
              </p>
              <Link
                href="/courses/create"
                className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333] text-sm"
              >
                Create Course
              </Link>
            </div>
          </div>
        </div>

        {/* Student Progress Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-[#000000] mb-4">
            STUDENT PROGRESS
          </h2>

          {/* Chart visualization would go here */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-64 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-[#000000] mb-2">
                Learner Completion Rates
              </h3>
              <p className="text-[#A1A1A1]">
                Chart visualization would appear here
              </p>
              <p className="text-[#A1A1A1] mt-2">
                Business Ethics: 65% average completion
              </p>
              <p className="text-[#A1A1A1]">
                Data Analytics: 52% average completion
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Link
              href="/analytics/student-progress"
              className="text-[#1F1F1F] hover:underline text-sm"
            >
              View Detailed Analytics
            </Link>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#000000] mb-4">
            RECENT ACTIVITY
          </h2>

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

          <div className="mt-4">
            <Link
              href="/notifications"
              className="text-[#1F1F1F] hover:underline text-sm"
            >
              View All Activity
            </Link>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#000000] mb-4">
              QUICK ACTIONS
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/assessments/create"
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center hover:bg-gray-100"
              >
                <div className="text-xl mb-1">📝</div>
                <div className="text-[#000000] font-medium">
                  Create Assessment
                </div>
              </Link>

              <Link
                href="/courses/create-lesson"
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center hover:bg-gray-100"
              >
                <div className="text-xl mb-1">📚</div>
                <div className="text-[#000000] font-medium">Add Lesson</div>
              </Link>

              <Link
                href="/gamification/award"
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center hover:bg-gray-100"
              >
                <div className="text-xl mb-1">🏆</div>
                <div className="text-[#000000] font-medium">Award Badge</div>
              </Link>

              <Link
                href="/announcements/create"
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center hover:bg-gray-100"
              >
                <div className="text-xl mb-1">📢</div>
                <div className="text-[#000000] font-medium">
                  Make Announcement
                </div>
              </Link>
            </div>
          </div>

          {/* Pending Tasks Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#000000] mb-4">
              PENDING TASKS
            </h2>

            <div className="space-y-3">
              <div className="p-3 border rounded-lg flex justify-between items-center bg-gray-50">
                <span className="text-[#000000]">
                  Grade Technology Quiz (5 submissions)
                </span>
                <Link
                  href="/assessments/123/grade"
                  className="text-[#1F1F1F] text-sm hover:underline"
                >
                  Grade
                </Link>
              </div>

              <div className="p-3 border rounded-lg flex justify-between items-center bg-gray-50">
                <span className="text-[#000000]">
                  Reply to discussion thread (3 new posts)
                </span>
                <Link
                  href="/discussions/456"
                  className="text-[#1F1F1F] text-sm hover:underline"
                >
                  View
                </Link>
              </div>

              <div className="p-3 border rounded-lg flex justify-between items-center bg-gray-50">
                <span className="text-[#000000]">
                  Update Data Analytics course material
                </span>
                <Link
                  href="/courses/2/edit"
                  className="text-[#1F1F1F] text-sm hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
