import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-[#1e1e2f] to-[#121218] text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome to <span className="text-purple-500">TeamCollab</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          A developer-first collaboration platform with chat, code editing, meetings, and file sharing — all in one workspace.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full text-lg font-semibold"
          >
            Try Now
          </Link>
          <a
            href="#features"
            className="border border-purple-500 text-purple-400 hover:bg-purple-700 hover:text-white px-6 py-3 rounded-full text-lg font-semibold"
          >
            Explore Features
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-[#1a1a2e] py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why TeamCollab?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <FeatureCard title="💬 Team Chat" desc="Real-time messaging just like Discord with channels and DMs." />
          <FeatureCard title="🧠 AI Code Assistant" desc="Smart autocomplete and bug suggestions powered by AI." />
          <FeatureCard title="👨‍💻 VS Code Editor" desc="Write, edit, and share code with Monaco (VS Code) editor." />
          <FeatureCard title="📂 File Sharing" desc="Upload and access files with one click from your team." />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-700">
        © {new Date().getFullYear()} TeamCollab. All rights reserved.
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, desc }) => (
  <div className="bg-[#222238] p-6 rounded-xl hover:shadow-lg transition">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </div>
);

export default LandingPage;
