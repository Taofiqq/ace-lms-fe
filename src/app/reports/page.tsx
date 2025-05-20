// app/reports/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function ReportsPage() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  // Mock data for reports
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reportTypes, setReportTypes] = useState([
    {
      id: 1,
      name: "User Activity",
      description: "User login and engagement statistics",
      lastGenerated: "Today, 9:30 AM",
      format: "PDF",
    },
    {
      id: 2,
      name: "Course Completion",
      description: "Progress and completion rates by course",
      lastGenerated: "Yesterday, 4:15 PM",
      format: "CSV",
    },
    {
      id: 3,
      name: "Learning Paths",
      description: "MVK certification progress across departments",
      lastGenerated: "May 18, 10:45 AM",
      format: "PDF",
    },
    {
      id: 4,
      name: "Assessment Results",
      description: "Average scores and passing rates",
      lastGenerated: "May 17, 2:30 PM",
      format: "CSV",
    },
    {
      id: 5,
      name: "Content Engagement",
      description: "Most and least accessed learning materials",
      lastGenerated: "May 15, 11:20 AM",
      format: "PDF",
    },
  ]);

  // Recent report downloads
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recentDownloads, setRecentDownloads] = useState([
    {
      id: 1,
      reportName: "User Activity Report",
      downloadedBy: "Wole Ayodele",
      downloadDate: "Today, 9:30 AM",
    },
    {
      id: 2,
      reportName: "Course Completion Report",
      downloadedBy: "Yewande Odumosu",
      downloadDate: "Yesterday, 4:15 PM",
    },
    {
      id: 3,
      reportName: "Assessment Results Q2",
      downloadedBy: "Wole Ayodele",
      downloadDate: "May 18, 10:45 AM",
    },
  ]);

  // Scheduled reports
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: 1,
      name: "Weekly User Activity",
      frequency: "Weekly",
      nextGeneration: "May 27, 2025",
      recipients: ["admin@fincra.com"],
      format: "PDF",
    },
    {
      id: 2,
      name: "Monthly Course Completion",
      frequency: "Monthly",
      nextGeneration: "Jun 01, 2025",
      recipients: ["admin@fincra.com", "hr@fincra.com"],
      format: "CSV",
    },
  ]);

  // Handle logout
  const handleLogout = () => {
    clearAuth();
    Cookies.remove("token");
    router.push("/login");
  };

  // In a real implementation, we would fetch data from the API
  useEffect(() => {
    // This would be replaced with actual API calls
    // fetchReportTypes();
    // fetchRecentDownloads();
    // fetchScheduledReports();
  }, []);

  // Handle cases where the user is not authenticated or not an admin
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Generate a report
  const handleGenerateReport = (reportId: number) => {
    // In a real app, this would trigger an API call to generate the report
    alert(`Generating report ${reportId}. This would download in a real app.`);
  };

  // Schedule a new report
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    reportType: "",
    frequency: "weekly",
    format: "pdf",
    recipients: "",
  });

  const handleScheduleReport = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new scheduled report via API
    alert("Report scheduled successfully!");
    setShowScheduleModal(false);
  };

  // If user is not loaded yet
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-[#000000] mb-2">Loading...</h1>
          <p className="text-[#A1A1A1]">
            Please wait while we load your reports
          </p>
        </div>
      </div>
    );
  }

  // If user is not an admin
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-[#A1A1A1]">
            You do not have permission to access this page.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]"
          >
            Return to Dashboard
          </button>
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
                href="/users"
                className="block py-2 px-4 rounded text-[#A1A1A1] hover:bg-gray-100"
              >
                Users
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
                href="/gamification"
                className="block py-2 px-4 rounded text-[#A1A1A1] hover:bg-gray-100"
              >
                Gamification
              </Link>
            </li>
            <li>
              <Link
                href="/reports"
                className="block py-2 px-4 rounded bg-[#1F1F1F] text-white"
              >
                Reports
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="block py-2 px-4 rounded text-[#A1A1A1] hover:bg-gray-100"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="md:hidden">
            <h1 className="text-lg font-bold text-[#000000]">ACE LMS</h1>
          </div>

          {/* Profile section */}
          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden md:inline text-[#A1A1A1]">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-[#1F1F1F] text-[#ffffff] px-4 py-2 rounded hover:bg-[#333333] transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#000000]">Reports</h1>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]"
            >
              Schedule Report
            </button>
          </div>

          {/* Report Types */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-[#000000] mb-4">
              Available Reports
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Last Generated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Format
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportTypes.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-[#000000]">
                          {report.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#A1A1A1]">
                        {report.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#A1A1A1]">
                        {report.lastGenerated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#A1A1A1]">
                        {report.format}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleGenerateReport(report.id)}
                          className="text-[#1F1F1F] hover:underline"
                        >
                          Generate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reports Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Recent Downloads */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-[#000000] mb-4">
                Recent Downloads
              </h2>

              <div className="space-y-4">
                {recentDownloads.map((download) => (
                  <div key={download.id} className="border-b pb-4">
                    <div className="font-medium text-[#000000]">
                      {download.reportName}
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-[#A1A1A1]">
                        By: {download.downloadedBy}
                      </span>
                      <span className="text-sm text-[#A1A1A1]">
                        {download.downloadDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduled Reports */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-[#000000] mb-4">
                Scheduled Reports
              </h2>

              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="border-b pb-4">
                    <div className="font-medium text-[#000000]">
                      {report.name}
                    </div>
                    <div className="mt-1 text-sm text-[#A1A1A1]">
                      {report.frequency} • Next: {report.nextGeneration} •{" "}
                      {report.format}
                    </div>
                    <div className="mt-1 text-sm text-[#A1A1A1]">
                      Recipients: {report.recipients.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Report Builder */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#000000] mb-4">
              Custom Report Builder
            </h2>
            <p className="text-[#A1A1A1] mb-4">
              Create custom reports with specific filters and parameters
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#A1A1A1] mb-1">
                    Report Type
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]">
                    <option value="">Select Report Type</option>
                    <option value="user">User Activity</option>
                    <option value="course">Course Completion</option>
                    <option value="assessment">Assessment Results</option>
                    <option value="mvk">MVK Progress</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#A1A1A1] mb-1">
                    Date Range
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]">
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#A1A1A1] mb-1">
                    User Group
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]">
                    <option value="">All Users</option>
                    <option value="admin">Admins</option>
                    <option value="instructor">Instructors</option>
                    <option value="learner">Learners</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#A1A1A1] mb-1">
                    Format
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]">
                    <option value="pdf">PDF</option>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#A1A1A1] mb-1">
                    Additional Options
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="include-charts"
                        className="mr-2"
                      />
                      <label
                        htmlFor="include-charts"
                        className="text-[#000000]"
                      >
                        Include Charts
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="include-tables"
                        className="mr-2"
                      />
                      <label
                        htmlFor="include-tables"
                        className="text-[#000000]"
                      >
                        Include Data Tables
                      </label>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333] mt-6">
                  Generate Custom Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Schedule Report
            </h3>

            <form onSubmit={handleScheduleReport}>
              <div className="mb-4">
                <label className="block text-[#000000] mb-2">Report Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={newSchedule.reportType}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      reportType: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select a report type</option>
                  <option value="user">User Activity</option>
                  <option value="course">Course Completion</option>
                  <option value="assessment">Assessment Results</option>
                  <option value="mvk">MVK Progress</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-[#000000] mb-2">Frequency</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={newSchedule.frequency}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      frequency: e.target.value,
                    })
                  }
                  required
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-[#000000] mb-2">Format</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={newSchedule.format}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, format: e.target.value })
                  }
                  required
                >
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                  <option value="excel">Excel</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-[#000000] mb-2">
                  Recipients (comma separated emails)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={newSchedule.recipients}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      recipients: e.target.value,
                    })
                  }
                  placeholder="email@example.com, another@example.com"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1F1F1F] text-white rounded hover:bg-[#333333]"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
