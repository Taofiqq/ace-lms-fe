// app/gamification/learner.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface LearnerGamificationProps {
  user: {
    email: string;
    role: string;
  };
  handleLogout: () => void;
}

export default function LearnerGamification({
  user,
  handleLogout,
}: LearnerGamificationProps) {
  // Mock data for learner gamification
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [learnerStats, setLearnerStats] = useState({
    totalPoints: 750,
    availablePoints: 720,
    spentPoints: 30,
    currentLevel: 3,
    levelName: "Practitioner",
    badgesCount: 8,
    achievementsCount: 12,
    coursesCompleted: 5,
    assessmentsCompleted: 7,
    progress: 75, // Progress to next level (percentage)
    pointsToNextLevel: 250,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [badges, setBadges] = useState([
    {
      id: 1,
      name: "First Steps",
      description: "Completed your first course",
      category: "course_completion",
      tier: "bronze",
      icon: "🥉",
      awardedAt: "May 10, 2025",
      isDisplayed: true,
    },
    {
      id: 2,
      name: "Perfect Score",
      description: "Achieved 100% on an assessment",
      category: "assessment",
      tier: "gold",
      icon: "🏆",
      awardedAt: "May 12, 2025",
      isDisplayed: true,
    },
    {
      id: 3,
      name: "Quick Learner",
      description: "Completed 5 courses",
      category: "course_completion",
      tier: "silver",
      icon: "🥈",
      awardedAt: "May 15, 2025",
      isDisplayed: true,
    },
    {
      id: 4,
      name: "Tech Enthusiast",
      description: "Completed a technology course with distinction",
      category: "course_completion",
      tier: "silver",
      icon: "💻",
      awardedAt: "May 16, 2025",
      isDisplayed: false,
    },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: "First Course Completed",
      description: "You completed your first course",
      type: "content_completion",
      unlockedAt: "May 10, 2025",
      progress: 100,
    },
    {
      id: 2,
      name: "Assessment Ace",
      description: "You scored 100% on an assessment",
      type: "assessment_score",
      unlockedAt: "May 12, 2025",
      progress: 100,
    },
    {
      id: 3,
      name: "Course Champion",
      description: "You completed 5 courses",
      type: "content_completion",
      unlockedAt: "May 15, 2025",
      progress: 100,
    },
    {
      id: 4,
      name: "Level 3 Achieved",
      description: "You reached Level 3",
      type: "special",
      unlockedAt: "May 16, 2025",
      progress: 100,
    },
    {
      id: 5,
      name: "Level 5 Achievement",
      description: "Reach Level 5 in your learning journey",
      type: "special",
      unlockedAt: null,
      progress: 40,
    },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recentPointTransactions, setRecentPointTransactions] = useState([
    {
      id: 1,
      amount: 50,
      type: "earned",
      source: "course_completion",
      description: "Completed course: Technology 101",
      transactionDate: "Today, 10:30 AM",
    },
    {
      id: 2,
      amount: 30,
      type: "earned",
      source: "badge",
      description: "Earned 30 points for Quick Learner badge",
      transactionDate: "May 15, 10:15 AM",
    },
    {
      id: 3,
      amount: 25,
      type: "earned",
      source: "achievement",
      description: "Earned 25 points for Course Champion achievement",
      transactionDate: "May 15, 10:15 AM",
    },
    {
      id: 4,
      amount: 30,
      type: "spent",
      source: "redemption",
      description: "Redeemed points for certificate download",
      transactionDate: "May 14, 3:45 PM",
    },
  ]);

  // In a real implementation, we would fetch data from the API
  useEffect(() => {
    // This would be replaced with actual API calls
    // Example:
    // async function fetchGamificationData() {
    //   try {
    //     const statsRes = await fetch('/api/gamification/my/stats');
    //     const badgesRes = await fetch('/api/gamification/my/badges');
    //     const achievementsRes = await fetch('/api/gamification/my/achievements');
    //     const transactionsRes = await fetch('/api/gamification/my/points/transactions');
    //
    //     const stats = await statsRes.json();
    //     const badges = await badgesRes.json();
    //     const achievements = await achievementsRes.json();
    //     const transactions = await transactionsRes.json();
    //
    //     setLearnerStats(stats);
    //     setBadges(badges);
    //     setAchievements(achievements);
    //     setRecentPointTransactions(transactions);
    //   } catch (error) {
    //     console.error('Failed to fetch gamification data:', error);
    //   }
    // }
    //
    // fetchGamificationData();
  }, []);

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="md:hidden">
          <h1 className="text-lg font-bold text-[#000000]">ACE LMS</h1>
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-4 ml-auto">
          <span className="hidden md:inline text-[#A1A1A1]">{user?.email}</span>
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
        {/* Gamification Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-[#000000] mb-4">
            Your Gamification Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-3xl font-bold text-[#1F1F1F]">
                {learnerStats.totalPoints}
              </div>
              <div className="text-sm text-[#A1A1A1]">Total Points</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-3xl font-bold text-[#1F1F1F]">
                Level {learnerStats.currentLevel}
              </div>
              <div className="text-sm text-[#A1A1A1]">
                {learnerStats.levelName}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-3xl font-bold text-[#1F1F1F]">
                {learnerStats.badgesCount}
              </div>
              <div className="text-sm text-[#A1A1A1]">Badges Earned</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-3xl font-bold text-[#1F1F1F]">
                {learnerStats.achievementsCount}
              </div>
              <div className="text-sm text-[#A1A1A1]">Achievements</div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-[#000000] font-medium">
                Progress to Level {learnerStats.currentLevel + 1}
              </span>
              <span className="text-[#A1A1A1]">{learnerStats.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#1F1F1F] h-2.5 rounded-full"
                style={{ width: `${learnerStats.progress}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-[#A1A1A1]">
              {learnerStats.pointsToNextLevel} more points needed to reach Level{" "}
              {learnerStats.currentLevel + 1}
            </div>
          </div>
        </div>

        {/* Badges and Achievements Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Badges Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Your Badges
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 border rounded-lg flex items-center gap-4 hover:bg-gray-50"
                >
                  <div className="text-3xl">{badge.icon}</div>
                  <div>
                    <div className="font-medium text-[#000000]">
                      {badge.name}
                    </div>
                    <div className="text-xs text-[#A1A1A1]">
                      {badge.tier} • {badge.awardedAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/gamification/badges"
                className="text-[#1F1F1F] hover:underline text-sm"
              >
                View All Badges
              </Link>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Your Achievements
            </h3>

            <div className="space-y-4">
              {achievements.slice(0, 4).map((achievement) => (
                <div key={achievement.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div className="font-medium text-[#000000]">
                      {achievement.name}
                    </div>
                    <div className="text-xs text-[#A1A1A1]">
                      {achievement.unlockedAt
                        ? `Unlocked: ${achievement.unlockedAt}`
                        : `Progress: ${achievement.progress}%`}
                    </div>
                  </div>
                  <div className="text-sm text-[#A1A1A1] mt-1">
                    {achievement.description}
                  </div>

                  {achievement.progress < 100 && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-[#1F1F1F] h-1.5 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/gamification/achievements"
                className="text-[#1F1F1F] hover:underline text-sm"
              >
                View All Achievements
              </Link>
            </div>
          </div>
        </div>

        {/* Point Transactions Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-[#000000] mb-4">
            Recent Point Activity
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-[#A1A1A1]">Description</th>
                  <th className="pb-2 text-[#A1A1A1]">Type</th>
                  <th className="pb-2 text-[#A1A1A1]">Points</th>
                  <th className="pb-2 text-[#A1A1A1]">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPointTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-3 text-[#000000]">
                      {transaction.description}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          transaction.type === "earned"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td
                      className={`py-3 font-medium ${
                        transaction.type === "earned"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {transaction.type === "earned" ? "+" : "-"}
                      {transaction.amount}
                    </td>
                    <td className="py-3 text-[#A1A1A1]">
                      {transaction.transactionDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/gamification/points-history"
              className="text-[#1F1F1F] hover:underline text-sm"
            >
              View Full History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
