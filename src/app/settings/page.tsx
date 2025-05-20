// app/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function SettingsPage() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  // System settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "ACE Learning Management System",
    siteDescription: "Fincra's Learning Management Platform",
    logo: "/logo.png",
    primaryColor: "#1F1F1F",
    secondaryColor: "#A1A1A1",
    enableRegistrations: true,
    requireAdminApproval: true,
    defaultUserRole: "learner",
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    coursesEnrollmentNotification: true,
    assessmentReminderNotification: true,
    achievementNotification: true,
    systemUpdatesNotification: false,
    emailDigestFrequency: "daily",
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireSpecialCharacters: true,
    requireNumbers: true,
    passwordExpiryDays: 90,
    sessionTimeoutMinutes: 30,
    maxLoginAttempts: 5,
    twoFactorAuthentication: false,
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState("general");

  // Handle logout
  const handleLogout = () => {
    clearAuth();
    Cookies.remove("token");
    router.push("/login");
  };

  // In a real implementation, we would fetch data from the API
  useEffect(() => {
    // This would be replaced with actual API calls
    // fetchSettings();
  }, []);

  // Handle cases where the user is not authenticated or not an admin
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Handle save settings
  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings via API
    alert("General settings saved successfully!");
  };

  const handleSaveNotificationSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings via API
    alert("Notification settings saved successfully!");
  };

  const handleSaveSecuritySettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings via API
    alert("Security settings saved successfully!");
  };

  // If user is not loaded yet
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-[#000000] mb-2">Loading...</h1>
          <p className="text-[#A1A1A1]">
            Please wait while we load your settings
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
                className="block py-2 px-4 rounded text-[#A1A1A1] hover:bg-gray-100"
              >
                Reports
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="block py-2 px-4 rounded bg-[#1F1F1F] text-white"
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
          <h1 className="text-2xl font-bold text-[#000000] mb-6">
            System Settings
          </h1>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="flex border-b">
              <button
                className={`py-3 px-6 ${
                  activeTab === "general"
                    ? "border-b-2 border-[#1F1F1F] font-medium text-[#000000]"
                    : "text-[#A1A1A1]"
                }`}
                onClick={() => setActiveTab("general")}
              >
                General
              </button>
              <button
                className={`py-3 px-6 ${
                  activeTab === "notifications"
                    ? "border-b-2 border-[#1F1F1F] font-medium text-[#000000]"
                    : "text-[#A1A1A1]"
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                Notifications
              </button>
              <button
                className={`py-3 px-6 ${
                  activeTab === "security"
                    ? "border-b-2 border-[#1F1F1F] font-medium text-[#000000]"
                    : "text-[#A1A1A1]"
                }`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </button>
              <button
                className={`py-3 px-6 ${
                  activeTab === "integrations"
                    ? "border-b-2 border-[#1F1F1F] font-medium text-[#000000]"
                    : "text-[#A1A1A1]"
                }`}
                onClick={() => setActiveTab("integrations")}
              >
                Integrations
              </button>
              <button
                className={`py-3 px-6 ${
                  activeTab === "backup"
                    ? "border-b-2 border-[#1F1F1F] font-medium text-[#000000]"
                    : "text-[#A1A1A1]"
                }`}
                onClick={() => setActiveTab("backup")}
              >
                Backup & Restore
              </button>
            </div>
          </div>

          {/* General Settings */}
          {activeTab === "general" && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-[#000000] mb-4">
                General Settings
              </h2>

              <form onSubmit={handleSaveGeneralSettings}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#000000] mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                      value={generalSettings.siteName}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          siteName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#000000] mb-2">
                      Site Description
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                      value={generalSettings.siteDescription}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          siteDescription: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#000000] mb-2">
                      Primary Color
                    </label>
                    <div className="flex">
                      <input
                        type="color"
                        className="h-10 w-10 border border-gray-300 rounded mr-2"
                        value={generalSettings.primaryColor}
                        onChange={(e) =>
                          setGeneralSettings({
                            ...generalSettings,
                            primaryColor: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                        value={generalSettings.primaryColor}
                        onChange={(e) =>
                          setGeneralSettings({
                            ...generalSettings,
                            primaryColor: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#000000] mb-2">
                      Secondary Color
                    </label>
                    <div className="flex">
                      <input
                        type="color"
                        className="h-10 w-10 border border-gray-300 rounded mr-2"
                        value={generalSettings.secondaryColor}
                        onChange={(e) =>
                          setGeneralSettings({
                            ...generalSettings,
                            secondaryColor: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                        value={generalSettings.secondaryColor}
                        onChange={(e) =>
                          setGeneralSettings({
                            ...generalSettings,
                            secondaryColor: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#000000] mb-2">
                      Default User Role
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                      value={generalSettings.defaultUserRole}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          defaultUserRole: e.target.value,
                        })
                      }
                    >
                      <option value="learner">Learner</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="enable-registrations"
                        checked={generalSettings.enableRegistrations}
                        onChange={(e) =>
                          setGeneralSettings({
                            ...generalSettings,
                            enableRegistrations: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor="enable-registrations"
                        className="text-sm text-[#000000]"
                      >
                        Enable Public Registrations
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="require-approval"
                        checked={generalSettings.requireAdminApproval}
                        onChange={(e) =>
                          setGeneralSettings({
                            ...generalSettings,
                            requireAdminApproval: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor="require-approval"
                        className="text-sm text-[#000000]"
                      >
                        Require Admin Approval for New Accounts
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]"
                  >
                    Save General Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-[#000000] mb-4">
                Notification Settings
              </h2>

              <form onSubmit={handleSaveNotificationSettings}>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enable-email"
                      checked={notificationSettings.enableEmailNotifications}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          enableEmailNotifications: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <label htmlFor="enable-email" className="text-[#000000]">
                      Enable Email Notifications
                    </label>
                  </div>

                  <div className="pl-6 space-y-3 mt-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="course-enrollment"
                        checked={
                          notificationSettings.coursesEnrollmentNotification
                        }
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            coursesEnrollmentNotification: e.target.checked,
                          })
                        }
                        className="mr-2"
                        disabled={
                          !notificationSettings.enableEmailNotifications
                        }
                      />
                      <label
                        htmlFor="course-enrollment"
                        className={`${
                          notificationSettings.enableEmailNotifications
                            ? "text-[#000000]"
                            : "text-[#A1A1A1]"
                        }`}
                      >
                        Course Enrollment Notifications
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="assessment-reminder"
                        checked={
                          notificationSettings.assessmentReminderNotification
                        }
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            assessmentReminderNotification: e.target.checked,
                          })
                        }
                        className="mr-2"
                        disabled={
                          !notificationSettings.enableEmailNotifications
                        }
                      />
                      <label
                        htmlFor="assessment-reminder"
                        className={`${
                          notificationSettings.enableEmailNotifications
                            ? "text-[#000000]"
                            : "text-[#A1A1A1]"
                        }`}
                      >
                        Assessment Reminder Notifications
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="achievement-notification"
                        checked={notificationSettings.achievementNotification}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            achievementNotification: e.target.checked,
                          })
                        }
                        className="mr-2"
                        disabled={
                          !notificationSettings.enableEmailNotifications
                        }
                      />
                      <label
                        htmlFor="achievement-notification"
                        className={`${
                          notificationSettings.enableEmailNotifications
                            ? "text-[#000000]"
                            : "text-[#A1A1A1]"
                        }`}
                      >
                        Achievement Notifications
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="system-updates"
                        checked={notificationSettings.systemUpdatesNotification}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            systemUpdatesNotification: e.target.checked,
                          })
                        }
                        className="mr-2"
                        disabled={
                          !notificationSettings.enableEmailNotifications
                        }
                      />
                      <label
                        htmlFor="system-updates"
                        className={`${
                          notificationSettings.enableEmailNotifications
                            ? "text-[#000000]"
                            : "text-[#A1A1A1]"
                        }`}
                      >
                        System Updates Notifications
                      </label>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm text-[#000000] mb-2">
                      Email Digest Frequency
                    </label>
                    <select
                      className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                      value={notificationSettings.emailDigestFrequency}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailDigestFrequency: e.target.value,
                        })
                      }
                      disabled={!notificationSettings.enableEmailNotifications}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]"
                  >
                    Save Notification Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-[#000000] mb-4">
                Security Settings
              </h2>

              <form onSubmit={handleSaveSecuritySettings}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#000000] mb-2">
                      Minimum Password Length
                    </label>
                    <input
                      type="number"
                      min="6"
                      max="32"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordMinLength: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#000000] mb-2">
                      Password Expiry (Days)
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                      value={securitySettings.passwordExpiryDays}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordExpiryDays: parseInt(e.target.value),
                        })
                      }
                    />
                    <p className="text-xs text-[#A1A1A1] mt-1">
                      Set to 0 for no expiry
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-[#000000] mb-2">
                      Session Timeout (Minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                      value={securitySettings.sessionTimeoutMinutes}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          sessionTimeoutMinutes: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#000000] mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          maxLoginAttempts: parseInt(e.target.value),
                        })
                      }
                    />
                    <p className="text-xs text-[#A1A1A1] mt-1">
                      Before account lockout
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="require-special"
                        checked={securitySettings.requireSpecialCharacters}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            requireSpecialCharacters: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor="require-special"
                        className="text-sm text-[#000000]"
                      >
                        Require Special Characters in Passwords
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="require-numbers"
                        checked={securitySettings.requireNumbers}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            requireNumbers: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor="require-numbers"
                        className="text-sm text-[#000000]"
                      >
                        Require Numbers in Passwords
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="two-factor"
                        checked={securitySettings.twoFactorAuthentication}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            twoFactorAuthentication: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor="two-factor"
                        className="text-sm text-[#000000]"
                      >
                        Enable Two-Factor Authentication
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]"
                  >
                    Save Security Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-[#000000] mb-4">
                Integrations
              </h2>

              <div className="space-y-6">
                {/* Google Workspace Integration */}
                <div className="border-b pb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-[#000000]">
                        Google Workspace
                      </h3>
                      <p className="text-sm text-[#A1A1A1]">
                        Connect with Google for user authentication and calendar
                        integration
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">
                        Not Connected
                      </span>
                      <button className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>

                {/* Slack Integration */}
                <div className="border-b pb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-[#000000]">
                        Slack
                      </h3>
                      <p className="text-sm text-[#A1A1A1]">
                        Send notifications and updates to your Slack channels
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mr-2">
                        Connected
                      </span>
                      <button className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50">
                        Disconnect
                      </button>
                    </div>
                  </div>
                  <div className="pl-4 border-l-2 border-green-200">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-[#000000]">
                        Connected to workspace: <strong>Fincra</strong>
                      </p>
                      <button className="text-[#1F1F1F] text-sm hover:underline">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>

                {/* Microsoft Teams Integration */}
                <div className="border-b pb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-[#000000]">
                        Microsoft Teams
                      </h3>
                      <p className="text-sm text-[#A1A1A1]">
                        Send notifications and updates to your Microsoft Teams
                        channels
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">
                        Not Connected
                      </span>
                      <button className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>

                {/* Zoom Integration */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-[#000000]">
                        Zoom
                      </h3>
                      <p className="text-sm text-[#A1A1A1]">
                        Integrate with Zoom for virtual classroom sessions
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">
                        Not Connected
                      </span>
                      <button className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Backup & Restore */}
          {activeTab === "backup" && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-[#000000] mb-4">
                Backup & Restore
              </h2>

              <div className="space-y-6">
                {/* Manual Backup */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium text-[#000000] mb-2">
                    Manual Backup
                  </h3>
                  <p className="text-[#A1A1A1] mb-4">
                    Create a backup of your system data that can be downloaded
                    and stored
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]">
                      Create Full Backup
                    </button>
                    <button className="border border-[#1F1F1F] text-[#1F1F1F] px-4 py-2 rounded hover:bg-gray-100">
                      Create Courses Backup
                    </button>
                    <button className="border border-[#1F1F1F] text-[#1F1F1F] px-4 py-2 rounded hover:bg-gray-100">
                      Create User Data Backup
                    </button>
                  </div>
                </div>

                {/* Scheduled Backups */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium text-[#000000] mb-2">
                    Scheduled Backups
                  </h3>
                  <p className="text-[#A1A1A1] mb-4">
                    Configure automatic backups on a regular schedule
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-[#000000] mb-2">
                        Backup Frequency
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-[#000000] mb-2">
                        Retention Period (Days)
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                        min="1"
                        defaultValue="30"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-[#000000] mb-2">
                        Storage Location
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]">
                        <option value="local">Local Storage</option>
                        <option value="s3">Amazon S3</option>
                        <option value="dropbox">Dropbox</option>
                        <option value="google">Google Drive</option>
                      </select>
                    </div>
                  </div>
                  <button className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]">
                    Save Backup Settings
                  </button>
                </div>

                {/* Restore */}
                <div>
                  <h3 className="text-lg font-medium text-[#000000] mb-2">
                    Restore System
                  </h3>
                  <p className="text-[#A1A1A1] mb-4">
                    Restore your system from a previous backup file
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-[#A1A1A1] mb-4">
                      Drag and drop a backup file here, or click to select
                    </p>
                    <button className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]">
                      Select Backup File
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
