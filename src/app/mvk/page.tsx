// app/mvk/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function MVKPage() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  // Mock data for MVK requirements
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mvkRequirements, setMvkRequirements] = useState([
    {
      id: 1,
      title: "Product Knowledge Fundamentals",
      description: "Understanding Fincra's core products and services",
      type: "course",
      college: "Business & Growth",
      level: "Leader I",
      isRequired: true,
      progress: 100,
      status: "completed",
      completedDate: "2025-04-15",
    },
    {
      id: 2,
      title: "Regulatory Compliance Basics",
      description: "Essential regulatory knowledge for fintech operations",
      type: "course",
      college: "Governance & Risk",
      level: "Leader I",
      isRequired: true,
      progress: 65,
      status: "in_progress",
      completedDate: null,
    },
    {
      id: 3,
      title: "Technology Infrastructure",
      description: "Understanding Fincra's technical architecture and systems",
      type: "course",
      college: "Technology & Innovation",
      level: "Leader I",
      isRequired: true,
      progress: 0,
      status: "not_started",
      completedDate: null,
    },
    {
      id: 4,
      title: "Customer Success Principles",
      description: "Fundamentals of customer experience and success metrics",
      type: "course",
      college: "Customer Delight",
      level: "Leader I",
      isRequired: true,
      progress: 85,
      status: "in_progress",
      completedDate: null,
    },
    {
      id: 5,
      title: "Leadership Foundations Assessment",
      description: "Evaluation of basic leadership capabilities",
      type: "assessment",
      college: "Leadership",
      level: "Leader I",
      isRequired: true,
      progress: 100,
      status: "completed",
      completedDate: "2025-05-01",
    },
    {
      id: 6,
      title: "Ethics and Professional Standards",
      description: "Core values and professional conduct expectations",
      type: "course",
      college: "Leadership",
      level: "Leader I",
      isRequired: true,
      progress: 30,
      status: "in_progress",
      completedDate: null,
    },
  ]);

  // MVK Progress Summary

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mvkSummary, setMvkSummary] = useState({
    totalRequirements: mvkRequirements.length,
    completedRequirements: mvkRequirements.filter(
      (item) => item.status === "completed"
    ).length,
    inProgressRequirements: mvkRequirements.filter(
      (item) => item.status === "in_progress"
    ).length,
    notStartedRequirements: mvkRequirements.filter(
      (item) => item.status === "not_started"
    ).length,
    overallProgress: Math.round(
      mvkRequirements.reduce((sum, item) => sum + item.progress, 0) /
        mvkRequirements.length
    ),
  });

  // Filter state
  const [filters, setFilters] = useState({
    college: "",
    status: "",
  });

  // Handle logout
  const handleLogout = () => {
    clearAuth();
    Cookies.remove("token");
    router.push("/login");
  };

  // Apply filters to requirements
  const filteredRequirements = mvkRequirements.filter((req) => {
    let matchesCollege = true;
    let matchesStatus = true;

    if (filters.college && req.college !== filters.college) {
      matchesCollege = false;
    }

    if (filters.status && req.status !== filters.status) {
      matchesStatus = false;
    }

    return matchesCollege && matchesStatus;
  });

  // Handle cases where the user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not completed";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // If user is not loaded yet or not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-[#000000] mb-2">Loading...</h1>
          <p className="text-[#A1A1A1]">
            Please wait while we load your MVK requirements
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
                className="block py-2 px-4 rounded bg-[#1F1F1F] text-white"
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
                href="/achievements"
                className="block py-2 px-4 rounded text-[#A1A1A1] hover:bg-gray-100"
              >
                Achievements
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
          <h1 className="text-2xl font-bold text-[#000000] mb-6">
            Minimum Viable Knowledge (MVK)
          </h1>

          {/* MVK Progress Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-bold text-[#000000] mb-4">
              MVK Progress Overview
            </h2>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-[#000000]">Overall Progress</span>
                <span className="text-[#A1A1A1]">
                  {mvkSummary.overallProgress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-[#1F1F1F] h-2.5 rounded-full"
                  style={{ width: `${mvkSummary.overallProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded border border-gray-200 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {mvkSummary.completedRequirements}
                </div>
                <div className="text-sm text-[#A1A1A1]">Completed</div>
              </div>
              <div className="bg-gray-50 p-4 rounded border border-gray-200 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {mvkSummary.inProgressRequirements}
                </div>
                <div className="text-sm text-[#A1A1A1]">In Progress</div>
              </div>
              <div className="bg-gray-50 p-4 rounded border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {mvkSummary.notStartedRequirements}
                </div>
                <div className="text-sm text-[#A1A1A1]">Not Started</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-wrap gap-4">
              {/* College Filter */}
              <div className="w-full md:w-auto">
                <label className="block text-sm text-[#A1A1A1] mb-1">
                  College
                </label>
                <select
                  className="w-full md:w-48 p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={filters.college}
                  onChange={(e) =>
                    setFilters({ ...filters, college: e.target.value })
                  }
                >
                  <option value="">All Colleges</option>
                  <option value="Business & Growth">Business & Growth</option>
                  <option value="Technology & Innovation">
                    Technology & Innovation
                  </option>
                  <option value="Operational Excellence">
                    Operational Excellence
                  </option>
                  <option value="Governance & Risk">Governance & Risk</option>
                  <option value="Customer Delight">Customer Delight</option>
                  <option value="Leadership">Leadership</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="w-full md:w-auto">
                <label className="block text-sm text-[#A1A1A1] mb-1">
                  Status
                </label>
                <select
                  className="w-full md:w-48 p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="not_started">Not Started</option>
                </select>
              </div>

              {/* Clear Filters */}
              {(filters.college || filters.status) && (
                <div className="w-full md:w-auto self-end">
                  <button
                    onClick={() => setFilters({ college: "", status: "" })}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MVK Requirements List */}
          <div className="space-y-4">
            {filteredRequirements.map((req) => (
              <div key={req.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#000000]">
                      {req.title}
                    </h3>
                    <p className="text-[#A1A1A1] text-sm">{req.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-[#000000]">
                      {req.college}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-[#000000]">
                      {req.level}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-[#000000] capitalize">
                      {req.type}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-[#A1A1A1]">Progress</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        req.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : req.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {req.status === "completed"
                        ? "Completed"
                        : req.status === "in_progress"
                        ? "In Progress"
                        : "Not Started"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        req.status === "completed"
                          ? "bg-green-500"
                          : "bg-[#1F1F1F]"
                      }`}
                      style={{ width: `${req.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#A1A1A1]">
                    {req.status === "completed"
                      ? `Completed on: ${formatDate(req.completedDate)}`
                      : req.status === "in_progress"
                      ? `${req.progress}% complete`
                      : "Not started yet"}
                  </span>

                  {req.status !== "completed" && (
                    <Link
                      href={
                        req.type === "course"
                          ? `/courses/${req.id}`
                          : `/assessments/${req.id}`
                      }
                      className="text-[#1F1F1F] hover:underline"
                    >
                      {req.status === "not_started" ? "Start Now" : "Continue"}
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredRequirements.length === 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-[#A1A1A1] mb-4">
                  No MVK requirements match your current filters.
                </p>
                <button
                  onClick={() => setFilters({ college: "", status: "" })}
                  className="text-[#1F1F1F] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
