// app/dashboard/admin.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

interface AdminDashboardProps {
  user: {
    email: string;
    role: string;
  };
  handleLogout: () => void;
}

export default function AdminDashboard({
  user,
  handleLogout,
}: AdminDashboardProps) {
  // Mock data for admin dashboard
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [systemStats, setSystemStats] = useState({
    users: 127,
    courses: 48,
    certifications: 12,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      description: 'New course created: "Leadership Fundamentals"',
      timestamp: "Today, 2:30 PM",
    },
    {
      id: 2,
      description: "12 new user registrations",
      timestamp: "Today, 11:45 AM",
    },
    {
      id: 3,
      description: 'Assessment "Tech Innovations" updated',
      timestamp: "Yesterday, 4:15 PM",
    },
  ]);

  // System metrics data (for chart)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [systemMetrics, setSystemMetrics] = useState({
    activeUsers: [120, 132, 145, 160, 178, 190, 200],
    courseEngagement: [30, 35, 40, 38, 42, 45, 48],
    certificationProgress: [8, 10, 12, 15, 18, 20, 22],
    dates: [
      "Apr 15",
      "Apr 22",
      "Apr 29",
      "May 6",
      "May 13",
      "May 20",
      "May 27",
    ],
  });

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
            placeholder="Search across all system data..."
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
        {/* Admin Welcome Banner */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-[#000000]">
            Welcome, Admin {user?.email}
          </h2>
          <p className="text-[#A1A1A1] mt-2">
            Here is an overview of your learning management system
          </p>
        </div>

        {/* Main Dashboard Title */}
        <h2 className="text-xl font-bold text-[#000000] mb-4">DASHBOARD</h2>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Users Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-[#000000] mb-2">Users</h3>
            <div className="text-3xl font-bold text-[#1F1F1F]">
              {systemStats.users}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-[#A1A1A1]">
                +15 users this week
              </span>
              <Link
                href="/admin/users"
                className="text-[#1F1F1F] text-sm hover:underline"
              >
                View All
              </Link>
            </div>
          </div>

          {/* Courses Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-[#000000] mb-2">Courses</h3>
            <div className="text-3xl font-bold text-[#1F1F1F]">
              {systemStats.courses}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-[#A1A1A1]">
                +3 courses this month
              </span>
              <Link
                href="/admin/courses"
                className="text-[#1F1F1F] text-sm hover:underline"
              >
                View All
              </Link>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-[#000000] mb-2">
              Certifications
            </h3>
            <div className="text-3xl font-bold text-[#1F1F1F]">
              {systemStats.certifications}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-[#A1A1A1]">
                2 pending approvals
              </span>
              <Link
                href="/admin/certifications"
                className="text-[#1F1F1F] text-sm hover:underline"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* System Metrics Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-[#000000] mb-4">
            SYSTEM METRICS
          </h2>

          {/* Chart would go here */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-64 flex items-center justify-center">
            <div className="text-center w-full">
              <h3 className="text-lg font-medium text-[#000000] mb-2">
                System Usage
              </h3>
              <p className="text-[#A1A1A1] mb-4">
                Chart visualization would appear here
              </p>

              {/* Simplified chart representation */}
              <div className="flex justify-center space-x-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-[#000000]">
                      Active Users: 200
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-[#000000]">
                      Course Engagement: 48
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-sm text-[#000000]">
                      Certification Progress: 22
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Link
              href="/admin/analytics"
              className="text-[#1F1F1F] hover:underline text-sm"
            >
              View Detailed Analytics
            </Link>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#000000] mb-4">
            RECENT ACTIVITIES
          </h2>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
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
              href="/admin/activity-log"
              className="text-[#1F1F1F] hover:underline text-sm"
            >
              View All Activities
            </Link>
          </div>
        </div>

        {/* Admin Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#000000] mb-4">
              QUICK ACTIONS
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/users/create"
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center hover:bg-gray-100"
              >
                <div className="text-xl mb-1">👤</div>
                <div className="text-[#000000] font-medium">Add User</div>
              </Link>

              <Link
                href="/admin/courses/create"
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center hover:bg-gray-100"
              >
                <div className="text-xl mb-1">📚</div>
                <div className="text-[#000000] font-medium">Create Course</div>
              </Link>

              <Link
                href="/admin/certifications/create"
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center hover:bg-gray-100"
              >
                <div className="text-xl mb-1">🏆</div>
                <div className="text-[#000000] font-medium">
                  Add Certification
                </div>
              </Link>

              <Link
                href="/admin/announcements/create"
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center hover:bg-gray-100"
              >
                <div className="text-xl mb-1">📢</div>
                <div className="text-[#000000] font-medium">
                  Make Announcement
                </div>
              </Link>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#000000] mb-4">
              SYSTEM HEALTH
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#000000]">Server Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Operational
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#000000]">Database</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Healthy
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#000000]">Storage Usage</span>
                <span className="text-[#000000]">68% (6.8/10GB)</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#000000]">Last Backup</span>
                <span className="text-[#000000]">Today, 03:00 AM</span>
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="/admin/system/settings"
                className="text-[#1F1F1F] hover:underline text-sm"
              >
                View System Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
