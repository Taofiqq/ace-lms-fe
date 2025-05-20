// app/courses/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function CoursesPage() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  // Mock data for courses
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to Business & Growth",
      description:
        "Learn the fundamentals of business strategy and growth principles.",
      level: "Leader I",
      college: "Business & Growth",
      modules: 5,
      progress: 0,
      isEnrolled: false,
      thumbnail: "https://via.placeholder.com/300x200.png?text=Business+Course",
    },
    {
      id: 2,
      title: "Technology Fundamentals",
      description:
        "Master the basics of technology and digital infrastructure.",
      level: "Leader I",
      college: "Technology & Innovation",
      modules: 4,
      progress: 65,
      isEnrolled: true,
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=Technology+Course",
    },
    {
      id: 3,
      title: "Leadership Essentials",
      description:
        "Develop core leadership skills necessary for team management.",
      level: "Leader I",
      college: "Leadership",
      modules: 6,
      progress: 25,
      isEnrolled: true,
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=Leadership+Course",
    },
    {
      id: 4,
      title: "Operational Excellence Basics",
      description:
        "Learn how to optimize processes for efficiency and reliability.",
      level: "Leader I",
      college: "Operational Excellence",
      modules: 4,
      progress: 0,
      isEnrolled: false,
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=Operations+Course",
    },
    {
      id: 5,
      title: "Customer Service Fundamentals",
      description: "Master the principles of exceptional customer experience.",
      level: "Leader I",
      college: "Customer Delight",
      modules: 3,
      progress: 100,
      isEnrolled: true,
      thumbnail: "https://via.placeholder.com/300x200.png?text=Customer+Course",
    },
    {
      id: 6,
      title: "Compliance & Risk Awareness",
      description:
        "Understand the basics of governance, compliance, and risk management.",
      level: "Leader I",
      college: "Governance & Risk",
      modules: 5,
      progress: 10,
      isEnrolled: true,
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=Compliance+Course",
    },
  ]);

  // Filter state
  const [filters, setFilters] = useState({
    level: "",
    college: "",
    status: "all", // all, enrolled, completed
  });

  // Handle logout
  const handleLogout = () => {
    clearAuth();
    Cookies.remove("token");
    router.push("/login");
  };

  // Handle enrollment
  const handleEnrollment = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, isEnrolled: true, progress: 0 }
          : course
      )
    );
  };

  // Apply filters to courses
  const filteredCourses = courses.filter((course) => {
    let matchesLevel = true;
    let matchesCollege = true;
    let matchesStatus = true;

    if (filters.level && course.level !== filters.level) {
      matchesLevel = false;
    }

    if (filters.college && course.college !== filters.college) {
      matchesCollege = false;
    }

    if (filters.status === "enrolled" && !course.isEnrolled) {
      matchesStatus = false;
    } else if (
      filters.status === "completed" &&
      (course.progress !== 100 || !course.isEnrolled)
    ) {
      matchesStatus = false;
    }

    return matchesLevel && matchesCollege && matchesStatus;
  });

  // Handle cases where the user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // If user is not loaded yet or not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-[#000000] mb-2">Loading...</h1>
          <p className="text-[#A1A1A1]">
            Please wait while we load your courses
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
                className="block py-2 px-4 rounded bg-[#1F1F1F] text-white"
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

          {/* Search Bar - for larger screens */}
          <div className="hidden md:block flex-1 max-w-lg mx-4">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F1F1F]"
            />
          </div>

          {/* Profile section */}
          <div className="flex items-center gap-4">
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
          <h1 className="text-2xl font-bold text-[#000000] mb-6">Courses</h1>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-wrap gap-4">
              {/* Level Filter */}
              <div className="w-full md:w-auto">
                <label className="block text-sm text-[#A1A1A1] mb-1">
                  Level
                </label>
                <select
                  className="w-full md:w-48 p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={filters.level}
                  onChange={(e) =>
                    setFilters({ ...filters, level: e.target.value })
                  }
                >
                  <option value="">All Levels</option>
                  <option value="Leader I">Leader I</option>
                  <option value="Leader II">Leader II</option>
                  <option value="Leader III">Leader III</option>
                </select>
              </div>

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
                  <option value="all">All Courses</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Course Thumbnail */}
                <div className="h-40 bg-gray-200">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Course Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#000000]">
                      {course.title}
                    </h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-[#000000]">
                      {course.level}
                    </span>
                  </div>

                  <p className="text-[#A1A1A1] text-sm mb-4">
                    {course.description}
                  </p>

                  <div className="flex justify-between items-center text-sm text-[#A1A1A1] mb-4">
                    <span>{course.college}</span>
                    <span>{course.modules} Modules</span>
                  </div>

                  {/* Progress Bar for enrolled courses */}
                  {course.isEnrolled && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#A1A1A1]">Progress</span>
                        <span className="text-[#A1A1A1]">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            course.progress === 100
                              ? "bg-green-500"
                              : "bg-[#1F1F1F]"
                          }`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {course.isEnrolled ? (
                    <Link
                      href={`/courses/${course.id}`}
                      className="block w-full text-center bg-[#1F1F1F] text-white py-2 rounded hover:bg-[#333333] transition-colors"
                    >
                      {course.progress === 100
                        ? "Review Course"
                        : "Continue Course"}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleEnrollment(course.id)}
                      className="w-full bg-[#1F1F1F] text-white py-2 rounded hover:bg-[#333333] transition-colors"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-[#A1A1A1] mb-4">
                No courses match your current filters.
              </p>
              <button
                onClick={() =>
                  setFilters({ level: "", college: "", status: "all" })
                }
                className="text-[#1F1F1F] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
