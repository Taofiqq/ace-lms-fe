import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#000000] min-h-screen flex flex-col text-[#A1A1A1]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-[#000000] border-b border-[#1F1F1F] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-[#A1A1A1]">
                ACE
              </Link>
            </div>
            {/* Center: Nav Links */}
            <div className="hidden md:flex space-x-8">
              <Link
                href="/fincra"
                className="text-[#A1A1A1] hover:text-white transition-colors"
              >
                Fincra
              </Link>
              <Link
                href="/product"
                className="text-[#A1A1A1] hover:text-white transition-colors"
              >
                Product
              </Link>
              <Link
                href="/blogs"
                className="text-[#A1A1A1] hover:text-white transition-colors"
              >
                Blogs
              </Link>
            </div>
            {/* Right: Auth Buttons */}
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="bg-[#1F1F1F] text-[#ffffff] px-4 py-2 rounded-md hover:bg-[#2a2a2a] transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-[#CCCCCC] text-[#0A0A0A] px-4 py-2 rounded-md hover:bg-[#b3b3b3] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center pt-24 pb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#A1A1A1] mb-4">
          ACE-LMS: Empowering Fincra’s Talent
        </h1>
        <p className="text-xl md:text-2xl text-[#A1A1A1] max-w-2xl mx-auto">
          Your pathway to professional growth, leadership, and excellence at
          Fincra.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-[#000000] w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#A1A1A1] mb-8 text-center">
            Features of ACE-LMS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-[#1F1F1F] rounded-lg">
              <div className="text-4xl text-[#A1A1A1] mb-2">📚</div>
              <h3 className="text-xl font-semibold text-[#A1A1A1] mb-2">
                Structured Learning Paths
              </h3>
              <p className="text-[#A1A1A1]">
                Progress from foundational to executive readiness with clear
                tiers.
              </p>
            </div>
            <div className="text-center p-6 bg-[#1F1F1F] rounded-lg">
              <div className="text-4xl text-[#A1A1A1] mb-2">🏫</div>
              <h3 className="text-xl font-semibold text-[#A1A1A1] mb-2">
                Six Specialized Colleges
              </h3>
              <p className="text-[#A1A1A1]">
                Explore Business, Tech, Operations, Governance, Customer, and
                Leadership.
              </p>
            </div>
            <div className="text-center p-6 bg-[#1F1F1F] rounded-lg">
              <div className="text-4xl text-[#A1A1A1] mb-2">🔧</div>
              <h3 className="text-xl font-semibold text-[#A1A1A1] mb-2">
                Applied Learning
              </h3>
              <p className="text-[#A1A1A1]">
                Engage in real-world projects with gamification like points and
                badges.
              </p>
            </div>
            <div className="text-center p-6 bg-[#1F1F1F] rounded-lg">
              <div className="text-4xl text-[#A1A1A1] mb-2">🏆</div>
              <h3 className="text-xl font-semibold text-[#A1A1A1] mb-2">
                Certification and Recognition
              </h3>
              <p className="text-[#A1A1A1]">
                Earn formal certifications for your skills and progression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why ACE-LMS? Section */}
      <section className="py-16 px-4 bg-[#000000] w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#A1A1A1] mb-8 text-center">
            Why ACE-LMS?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-[#1F1F1F] rounded-lg">
              <h3 className="text-xl font-semibold text-[#A1A1A1] mb-2">
                For Employees
              </h3>
              <p className="text-[#A1A1A1]">
                Advance your career, gain critical skills, and connect with
                peers.
              </p>
            </div>
            <div className="p-6 bg-[#1F1F1F] rounded-lg">
              <h3 className="text-xl font-semibold text-[#A1A1A1] mb-2">
                For Fincra
              </h3>
              <p className="text-[#A1A1A1]">
                Build a skilled workforce, ensure knowledge transfer, and
                develop leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-[#000000] w-full text-center text-[#A1A1A1] border-t border-[#1F1F1F]">
        <p>© 2025 Fincra. All rights reserved.</p>
        <p className="mt-2">
          <Link href="/privacy" className="text-[#A1A1A1] hover:text-white">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/terms" className="text-[#A1A1A1] hover:text-white">
            Terms of Service
          </Link>
        </p>
      </footer>
    </main>
  );
}
