// app/gamification/instructor.tsx
"use client";
//
import { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from "next/link";

interface InstructorGamificationProps {
  user: {
    email: string;
    role: string;
  };
  handleLogout: () => void;
}

export default function InstructorGamification({
  user,
  handleLogout,
}: InstructorGamificationProps) {
  // Mock data for badges
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [badges, setBadges] = useState([
    {
      id: 1,
      name: "First Steps",
      description: "Completed your first course",
      category: "course_completion",
      tier: "bronze",
      icon: "🥉",
      pointValue: 10,
      isActive: true,
    },
    {
      id: 2,
      name: "Perfect Score",
      description: "Achieved 100% on an assessment",
      category: "assessment",
      tier: "gold",
      icon: "🏆",
      pointValue: 50,
      isActive: true,
    },
    {
      id: 3,
      name: "Quick Learner",
      description: "Completed 5 courses",
      category: "course_completion",
      tier: "silver",
      icon: "🥈",
      pointValue: 30,
      isActive: true,
    },
    {
      id: 4,
      name: "Tech Enthusiast",
      description: "Completed a technology course with distinction",
      category: "course_completion",
      tier: "silver",
      icon: "💻",
      pointValue: 25,
      isActive: true,
    },
  ]);

  // Mock data for achievements
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: "First Course Completed",
      description: "You completed your first course",
      type: "content_completion",
      triggerType: "automatic",
      pointValue: 25,
      isActive: true,
    },
    {
      id: 2,
      name: "Assessment Ace",
      description: "You scored 100% on an assessment",
      type: "assessment_score",
      triggerType: "automatic",
      pointValue: 50,
      isActive: true,
    },
    {
      id: 3,
      name: "Course Champion",
      description: "You completed 5 courses",
      type: "content_completion",
      triggerType: "automatic",
      pointValue: 75,
      isActive: true,
    },
    {
      id: 4,
      name: "Perfect Attendance",
      description: "Login streak of 7 days",
      type: "login_streak",
      triggerType: "automatic",
      pointValue: 20,
      isActive: true,
    },
  ]);

  // Mock data for students who can receive awards
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Yewande Odumosu",
      email: "john.doe@example.com",
      currentLevel: 2,
      totalPoints: 185,
    },
    {
      id: 2,
      name: "Wole Ayodele",
      email: "jane.smith@example.com",
      currentLevel: 3,
      totalPoints: 420,
    },
    {
      id: 3,
      name: "Anna Ugwu",
      email: "alex.wong@example.com",
      currentLevel: 1,
      totalPoints: 75,
    },
    {
      id: 4,
      name: "Iyanu Akinleye",
      email: "sarah.j@example.com",
      currentLevel: 4,
      totalPoints: 730,
    },
  ]);

  // Mock data for recent gamification activities by the instructor
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "badge",
      description: "Awarded 'Perfect Score' badge to Jane Smith",
      timestamp: "Today, 10:30 AM",
    },
    {
      id: 2,
      type: "achievement",
      description: "Unlocked 'Course Champion' achievement for John Doe",
      timestamp: "May 18, 2:15 PM",
    },
    {
      id: 3,
      type: "points",
      description:
        "Awarded 50 bonus points to Sarah Johnson for project excellence",
      timestamp: "May 17, 11:30 AM",
    },
  ]);

  // State for award form
  const [showAwardForm, setShowAwardForm] = useState(false);
  const [awardType, setAwardType] = useState<
    "badge" | "achievement" | "points"
  >("badge");
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [pointsAmount, setPointsAmount] = useState(10);
  const [awardReason, setAwardReason] = useState("");

  // In a real implementation, we would fetch data from the API
  useEffect(() => {
    // This would be replaced with actual API calls
    // Examples:
    // async function fetchGamificationData() {
    //   try {
    //     const badgesRes = await fetch('/api/gamification/badges');
    //     const achievementsRes = await fetch('/api/gamification/achievements');
    //     const studentsRes = await fetch('/api/instructor/students');
    //
    //     const badges = await badgesRes.json();
    //     const achievements = await achievementsRes.json();
    //     const students = await studentsRes.json();
    //
    //     setBadges(badges);
    //     setAchievements(achievements);
    //     setStudents(students);
    //   } catch (error) {
    //     console.error('Failed to fetch gamification data:', error);
    //   }
    // }
    //
    // fetchGamificationData();
  }, []);

  const handleSubmitAward = async (e: React.FormEvent) => {
    e.preventDefault();

    // In a real implementation, this would be an API call
    console.log({
      type: awardType,
      studentId: selectedStudentId,
      itemId: selectedItemId,
      points: awardType === "points" ? pointsAmount : undefined,
      reason: awardReason,
    });

    // Add to recent activities (mock)
    const student = students.find((s) => s.id === selectedStudentId);
    const newActivity = {
      id: recentActivities.length + 1,
      type: awardType,
      description:
        awardType === "badge"
          ? `Awarded '${
              badges.find((b) => b.id === selectedItemId)?.name
            }' badge to ${student?.name}`
          : awardType === "achievement"
          ? `Unlocked '${
              achievements.find((a) => a.id === selectedItemId)?.name
            }' achievement for ${student?.name}`
          : `Awarded ${pointsAmount} points to ${student?.name}${
              awardReason ? ` for ${awardReason}` : ""
            }`,
      timestamp: "Just now",
    };
    setRecentActivities([newActivity, ...recentActivities]);

    // Reset form
    setShowAwardForm(false);
    setSelectedStudentId(null);
    setSelectedItemId(null);
    setPointsAmount(10);
    setAwardReason("");
  };

  return (
    // app/gamification/instructor.tsx (continued)
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
        {/* Gamification Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-[#000000] mb-4">
            Gamification Management
          </h2>
          <p className="text-[#A1A1A1] mb-6">
            As an instructor, you can award badges, achievements, and points to
            students to increase engagement.
          </p>

          {/* Award buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                setShowAwardForm(true);
                setAwardType("badge");
              }}
              className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]"
            >
              Award Badge
            </button>
            <button
              onClick={() => {
                setShowAwardForm(true);
                setAwardType("achievement");
              }}
              className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]"
            >
              Unlock Achievement
            </button>
            <button
              onClick={() => {
                setShowAwardForm(true);
                setAwardType("points");
              }}
              className="bg-[#1F1F1F] text-white px-4 py-2 rounded hover:bg-[#333333]"
            >
              Award Points
            </button>
          </div>
        </div>

        {/* Award Form Modal */}
        {showAwardForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-[#000000] mb-4">
                {awardType === "badge"
                  ? "Award Badge"
                  : awardType === "achievement"
                  ? "Unlock Achievement"
                  : "Award Points"}
              </h3>

              <form onSubmit={handleSubmitAward}>
                {/* Student Selection */}
                <div className="mb-4">
                  <label className="block text-[#000000] mb-2">
                    Select Student
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                    value={selectedStudentId || ""}
                    onChange={(e) =>
                      setSelectedStudentId(Number(e.target.value))
                    }
                    required
                  >
                    <option value="">Select a student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} (Level {student.currentLevel})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Badge/Achievement Selection or Points Input */}
                <div className="mb-4">
                  {awardType === "badge" && (
                    <>
                      <label className="block text-[#000000] mb-2">
                        Select Badge
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                        value={selectedItemId || ""}
                        onChange={(e) =>
                          setSelectedItemId(Number(e.target.value))
                        }
                        required
                      >
                        <option value="">Select a badge</option>
                        {badges.map((badge) => (
                          <option key={badge.id} value={badge.id}>
                            {badge.name} ({badge.tier}, {badge.pointValue} pts)
                          </option>
                        ))}
                      </select>
                    </>
                  )}

                  {awardType === "achievement" && (
                    <>
                      <label className="block text-[#000000] mb-2">
                        Select Achievement
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                        value={selectedItemId || ""}
                        onChange={(e) =>
                          setSelectedItemId(Number(e.target.value))
                        }
                        required
                      >
                        <option value="">Select an achievement</option>
                        {achievements.map((achievement) => (
                          <option key={achievement.id} value={achievement.id}>
                            {achievement.name} ({achievement.pointValue} pts)
                          </option>
                        ))}
                      </select>
                    </>
                  )}

                  {awardType === "points" && (
                    <>
                      <label className="block text-[#000000] mb-2">
                        Points Amount
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                        value={pointsAmount}
                        onChange={(e) =>
                          setPointsAmount(Number(e.target.value))
                        }
                        required
                      />
                    </>
                  )}
                </div>

                {/* Reason */}
                <div className="mb-6">
                  <label className="block text-[#000000] mb-2">
                    Reason (Optional)
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#1F1F1F]"
                    rows={3}
                    value={awardReason}
                    onChange={(e) => setAwardReason(e.target.value)}
                    placeholder="Why are you awarding this?"
                  ></textarea>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAwardForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1F1F1F] text-white rounded hover:bg-[#333333]"
                  >
                    Award
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-bold text-[#000000] mb-4">
            Recent Gamification Activities
          </h3>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start border-b pb-4">
                <div className="mr-3 mt-1">
                  {activity.type === "badge" && (
                    <span className="text-2xl">🏆</span>
                  )}
                  {activity.type === "achievement" && (
                    <span className="text-2xl">🎯</span>
                  )}
                  {activity.type === "points" && (
                    <span className="text-2xl">🔢</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[#000000]">{activity.description}</p>
                  <p className="text-xs text-[#A1A1A1]">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {recentActivities.length === 0 && (
            <p className="text-[#A1A1A1] italic">No recent activities</p>
          )}
        </div>

        {/* Available Badges and Achievements Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Badges Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Available Badges
            </h3>

            <div className="overflow-y-auto max-h-96">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2 text-[#A1A1A1]">Badge</th>
                    <th className="text-left pb-2 text-[#A1A1A1]">Tier</th>
                    <th className="text-left pb-2 text-[#A1A1A1]">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {badges.map((badge) => (
                    <tr key={badge.id} className="border-b">
                      <td className="py-3">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">{badge.icon}</span>
                          <div>
                            <div className="text-[#000000]">{badge.name}</div>
                            <div className="text-xs text-[#A1A1A1]">
                              {badge.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 capitalize text-[#A1A1A1]">
                        {badge.tier}
                      </td>
                      <td className="py-3 text-[#A1A1A1]">
                        {badge.pointValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Available Achievements
            </h3>

            <div className="overflow-y-auto max-h-96">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2 text-[#A1A1A1]">
                      Achievement
                    </th>
                    <th className="text-left pb-2 text-[#A1A1A1]">Type</th>
                    <th className="text-left pb-2 text-[#A1A1A1]">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {achievements.map((achievement) => (
                    <tr key={achievement.id} className="border-b">
                      <td className="py-3">
                        <div>
                          <div className="text-[#000000]">
                            {achievement.name}
                          </div>
                          <div className="text-xs text-[#A1A1A1]">
                            {achievement.description}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 capitalize text-[#A1A1A1]">
                        {achievement.type.replace("_", " ")}
                      </td>
                      <td className="py-3 text-[#A1A1A1]">
                        {achievement.pointValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Student Leaderboard */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-bold text-[#000000] mb-4">
            Student Leaderboard
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-[#A1A1A1]">Rank</th>
                  <th className="pb-2 text-[#A1A1A1]">Student</th>
                  <th className="pb-2 text-[#A1A1A1]">Level</th>
                  <th className="pb-2 text-[#A1A1A1]">Points</th>
                  <th className="pb-2 text-[#A1A1A1]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .sort((a, b) => b.totalPoints - a.totalPoints)
                  .map((student, index) => (
                    <tr key={student.id} className="border-b">
                      <td className="py-3 text-[#000000]">{index + 1}</td>
                      <td className="py-3">
                        <div>
                          <div className="text-[#000000] font-medium">
                            {student.name}
                          </div>
                          <div className="text-xs text-[#A1A1A1]">
                            {student.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-[#A1A1A1]">
                        {student.currentLevel}
                      </td>
                      <td className="py-3 font-medium text-[#A1A1A1]">
                        {student.totalPoints}
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => {
                            setShowAwardForm(true);
                            setAwardType("points");
                            setSelectedStudentId(student.id);
                          }}
                          className="text-[#1F1F1F] hover:underline text-sm"
                        >
                          Award Points
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
