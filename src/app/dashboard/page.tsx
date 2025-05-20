// app/dashboard/page.tsx
"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth(); // Clear zustand store
    Cookies.remove("token"); // Remove token cookie
    router.push("/login"); // Redirect to login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#171717] mb-2">
          Welcome to ACE-LMS
        </h1>
        <p className="text-[#666666] mb-4">
          Hello, {user?.email || "User"} ({user?.role || "Unknown"})!
        </p>
        <p className="text-[#666666] mb-6">This is your dashboard.</p>
        <button
          onClick={handleLogout}
          className="w-full bg-[#171717] text-[#FFFFFF] py-2 rounded hover:bg-[#555555] transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
