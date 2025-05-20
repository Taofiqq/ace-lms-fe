// "use client";

// import { useAuthStore } from "@/store/authStore";
// import Link from "next/link";

// export default function HomePage() {
//   const { user } = useAuthStore();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
//       <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold text-[#171717] mb-2">ACE-LMS</h1>
//         <p className="text-[#666666] mb-6">
//           {user
//             ? `Welcome back, ${user.email}!`
//             : "Please sign in to continue."}
//         </p>

//         {!user && (
//           <div className="flex flex-col space-y-4 mt-4">
//             <Link
//               href="/login"
//               className="w-full bg-[#171717] text-[#FFFFFF] py-2 rounded hover:bg-[#555555] transition-colors text-center"
//             >
//               Sign In
//             </Link>
//             <p className="text-center text-[#666666]">
//               Dont have an account?{" "}
//               <Link href="/signup" className="text-[#171717] hover:underline">
//                 Sign Up
//               </Link>
//             </p>
//           </div>
//         )}

//         {user && (
//           <Link
//             href="/dashboard"
//             className="block w-full bg-[#171717] text-[#FFFFFF] py-2 rounded hover:bg-[#555555] transition-colors text-center mt-4"
//           >
//             Go to Dashboard
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen flex flex-col items-center justify-start">
      {/* Hero Section */}
      <section className="text-center p-8 pt-16">
        <h1 className="text-4xl font-bold text-[#171717] mb-4">
          ACE-LMS: Empowering Fincra’s Talent
        </h1>
        <p className="text-2xl text-[#666666] mb-8">
          Your pathway to professional growth, leadership, and excellence at
          Fincra.
        </p>
        {/* <div className="space-x-4">
          <Link
            href="/login"
            className="bg-[#0070f3] text-white px-6 py-3 rounded hover:bg-[#005bb5] transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-[#666666] text-white px-6 py-3 rounded hover:bg-[#555555] transition-colors"
          >
            Sign Up
          </Link>
        </div> */}
      </section>

      {/* Features Section */}
      <section className="mt-16 p-8 bg-white shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-[#171717] mb-6 text-center">
          Features of ACE-LMS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl text-[#0070f3] mb-2">📚</div>
            <h3 className="text-xl font-semibold text-[#171717] mb-2">
              Structured Learning Paths
            </h3>
            <p className="text-[#666666]">
              Progress from foundational to executive readiness with clear
              tiers.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl text-[#0070f3] mb-2">🏫</div>
            <h3 className="text-xl font-semibold text-[#171717] mb-2">
              Six Specialized Colleges
            </h3>
            <p className="text-[#666666]">
              Explore Business, Tech, Operations, Governance, Customer, and
              Leadership.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl text-[#0070f3] mb-2">🔧</div>
            <h3 className="text-xl font-semibold text-[#171717] mb-2">
              Applied Learning
            </h3>
            <p className="text-[#666666]">
              Engage in real-world projects with gamification like points and
              badges.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl text-[#0070f3] mb-2">🏆</div>
            <h3 className="text-xl font-semibold text-[#171717] mb-2">
              Certification and Recognition
            </h3>
            <p className="text-[#666666]">
              Earn formal certifications for your skills and progression.
            </p>
          </div>
        </div>
      </section>

      {/* Why ACE-LMS? Section */}
      <section className="mt-16 p-8 bg-white shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-[#171717] mb-6 text-center">
          Why ACE-LMS?
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-[#171717]">
              For Employees
            </h3>
            <p className="text-[#666666]">
              Advance your career, gain critical skills, and connect with peers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#171717]">For Fincra</h3>
            <p className="text-[#666666]">
              Build a skilled workforce, ensure knowledge transfer, and develop
              leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="mt-16 p-8 text-center">
        <div className="space-x-4">
          <Link
            href="/login"
            className="bg-[#0070f3] text-white px-6 py-3 rounded hover:bg-[#005bb5] transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-[#666666] text-white px-6 py-3 rounded hover:bg-[#555555] transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 p-4 bg-[#f0f0f0] w-full text-center text-[#666666]">
        <p>&copy; 2025 Fincra. All rights reserved.</p>
        <p>
          <Link href="/privacy" className="text-[#0070f3] hover:underline">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/terms" className="text-[#0070f3] hover:underline">
            Terms of Service
          </Link>
        </p>
      </footer>
    </main>
  );
}
