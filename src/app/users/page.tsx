// app/users/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function UsersPage() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Wole Ayodele",
      email: "wole@fincra.com",
      role: "admin",
      status: "active",
      level: 5,
      totalPoints: 1200,
      enrolledCourses: 8,
      completedCourses: 6,
      lastLoginDate: "2025-05-18T10:30:00Z",
    },
    {
      id: 2,
      name: "Yewande Odumosu",
      email: "yewande@fincra.com",
      role: "instructor",
      status: "active",
      level: 4,
      totalPoints: 950,
      enrolledCourses: 6,
      completedCourses: 5,
      lastLoginDate: "2025-05-19T14:45:00Z",
    },
  ]);

  // Filter state
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    searchTerm: "",
  });

  // Modal state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "learner",
    password: "",
  });

  // Handle logout
  const handleLogout = () => {
    clearAuth();
    Cookies.remove("token");
    router.push("/login");
  };

  // Handle role change
  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  // Handle status change
  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  // Handle add user
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();

    const newId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

    setUsers([
      ...users,
      {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "active",
        level: 1,
        totalPoints: 0,
        enrolledCourses: 0,
        completedCourses: 0,
        lastLoginDate: new Date().toISOString(),
      },
    ]);

    setShowAddUserModal(false);
    setNewUser({
      name: "",
      email: "",
      role: "learner",
      password: "",
    });
  };

  // Apply filters to users
  const filteredUsers = users.filter((user) => {
    let matchesRole = true;
    let matchesStatus = true;
    let matchesSearch = true;

    if (filters.role && user.role !== filters.role) {
      matchesRole = false;
    }

    if (filters.status && user.status !== filters.status) {
      matchesStatus = false;
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const nameMatch = user.name.toLowerCase().includes(searchLower);
      const emailMatch = user.email.toLowerCase().includes(searchLower);

      if (!nameMatch && !emailMatch) {
        matchesSearch = false;
      }
    }

    return matchesRole && matchesStatus && matchesSearch;
  });

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Handle cases where the user is not authenticated or not an admin
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, router]);

  // If user is not loaded yet or not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-[#000000] mb-2">Loading...</h1>
          <p className="text-[#A1A1A1]">
            Please wait while we load the user management interface
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
                className="block py-2 px-4 rounded bg-[#1F1F1F] text-white"
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
                className="block py-2 px-4 rounded text-[#A1A1A1] hover:bg-gray-100"
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

          {/* Search Bar - for larger screens */}
          <div className="hidden md:block flex-1 max-w-lg mx-4">
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F1F1F]"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({ ...filters, searchTerm: e.target.value })
              }
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#000000]">
              User Management
            </h1>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]"
            >
              Add New User
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-wrap gap-4">
              {/* Search on mobile */}
              <div className="w-full md:hidden mb-2">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F1F1F]"
                  value={filters.searchTerm}
                  onChange={(e) =>
                    setFilters({ ...filters, searchTerm: e.target.value })
                  }
                />
              </div>

              {/* Role Filter */}
              <div className="w-full md:w-auto">
                <label className="block text-sm text-[#A1A1A1] mb-1">
                  Role
                </label>
                <select
                  className="w-full md:w-48 p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={filters.role}
                  onChange={(e) =>
                    setFilters({ ...filters, role: e.target.value })
                  }
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="instructor">Instructor</option>
                  <option value="learner">Learner</option>
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Clear Filters */}
              {(filters.role || filters.status || filters.searchTerm) && (
                <div className="w-full md:w-auto self-end">
                  <button
                    onClick={() =>
                      setFilters({ role: "", status: "", searchTerm: "" })
                    }
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-[#000000]">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#A1A1A1]">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F] text-sm"
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user.id, e.target.value)
                          }
                        >
                          <option value="admin">Admin</option>
                          <option value="instructor">Instructor</option>
                          <option value="learner">Learner</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="p-1 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F] text-sm"
                          value={user.status}
                          onChange={(e) =>
                            handleStatusChange(user.id, e.target.value)
                          }
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#A1A1A1]">
                        Level {user.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#A1A1A1]">
                        {formatDate(user.lastLoginDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/users/${user.id}`}
                          className="text-[#1F1F1F] hover:underline mr-4"
                        >
                          View
                        </Link>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this user?"
                              )
                            ) {
                              setUsers(users.filter((u) => u.id !== user.id));
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-[#A1A1A1] mb-4">
                  No users match your current filters.
                </p>
                <button
                  onClick={() =>
                    setFilters({ role: "", status: "", searchTerm: "" })
                  }
                  className="text-[#1F1F1F] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* User Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-[#1F1F1F]">
                {users.length}
              </div>
              <div className="text-sm text-[#A1A1A1]">Total Users</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-[#1F1F1F]">
                {users.filter((u) => u.role === "admin").length}
              </div>
              <div className="text-sm text-[#A1A1A1]">Admins</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-[#1F1F1F]">
                {users.filter((u) => u.role === "instructor").length}
              </div>
              <div className="text-sm text-[#A1A1A1]">Instructors</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-[#1F1F1F]">
                {users.filter((u) => u.role === "learner").length}
              </div>
              <div className="text-sm text-[#A1A1A1]">Learners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Add New User
            </h3>

            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <label className="block text-[#000000] mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#000000] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#000000] mb-2">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-[#000000] mb-2">Role</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  required
                >
                  <option value="learner">Learner</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1F1F1F] text-white rounded hover:bg-[#333333]"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
