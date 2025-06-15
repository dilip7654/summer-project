import React from "react";
import { 
  MessageCircle, 
  Code, 
  Users, 
  Share2, 
  Zap, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="relative z-10 text-center py-24 px-4 max-w-6xl mx-auto">
          <div className="inline-flex items-center bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-300">Trusted by 10,000+ developers</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            TeamCollab
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4">
            The Ultimate Developer Workspace
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Streamline your development workflow with integrated chat, AI-powered code editing, 
            seamless meetings, and intelligent file sharing — all in one professional platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button className="group bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="border border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
            >
              Explore Features
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">500ms</div>
              <div className="text-sm text-gray-400">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">10k+</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="text-blue-400">Collaborate</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful tools designed for modern development teams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <FeatureCard 
              icon={MessageCircle}
              title="Real-time Team Chat"
              desc="Discord-like messaging with channels, threads, and instant notifications. Keep your team connected and conversations organized."
              highlight="Instant messaging"
            />
            <FeatureCard 
              icon={Code}
              title="AI-Powered Code Editor"
              desc="Monaco editor with intelligent autocomplete, syntax highlighting, and AI-assisted debugging. Code smarter, not harder."
              highlight="VS Code experience"
            />
            <FeatureCard 
              icon={Users}
              title="HD Video Meetings"
              desc="Crystal-clear video calls with screen sharing, recording, and collaborative whiteboards. Meet face-to-face from anywhere."
              highlight="Screen sharing included"
            />
            <FeatureCard 
              icon={Share2}
              title="Smart File Sharing"
              desc="Drag-and-drop file uploads with version control, previews, and team permissions. Share anything securely."
              highlight="Version control built-in"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="text-blue-400">TeamCollab?</span>
              </h3>
              <div className="space-y-4">
                <BenefitItem text="All-in-one workspace - no more tool switching" />
                <BenefitItem text="Enterprise-grade security and encryption" />
                <BenefitItem text="Real-time collaboration across all features" />
                <BenefitItem text="Intuitive interface that developers love" />
                <BenefitItem text="24/7 customer support and 99.9% uptime" />
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="text-green-400">$ npm install teamcollab</div>
                  <div className="text-gray-400">// Initialize your workspace</div>
                  <div className="text-blue-400">const workspace = new TeamCollab();</div>
                  <div className="text-purple-400">workspace.connect();</div>
                  <div className="text-green-400">✓ Connected to TeamCollab</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Workflow?
          </h3>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of developers who've already made the switch
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button className="border border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold mr-2">
                  T
                </div>
                <span className="text-xl font-bold">TeamCollab</span>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate collaboration platform for modern development teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Documentation</div>
                <div>Help Center</div>
                <div>Contact Us</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            © {new Date().getFullYear()} TeamCollab. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, highlight }) => (
  <div className="group bg-gray-800/50 backdrop-blur border border-gray-700 p-8 rounded-2xl hover:bg-gray-800/70 hover:border-gray-600 transition-all duration-300 hover:scale-105">
    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-colors">
      <Icon className="w-6 h-6 text-blue-400" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-400 mb-4 leading-relaxed">{desc}</p>
    <div className="inline-flex items-center text-sm text-blue-400 font-medium">
      <Zap className="w-4 h-4 mr-1" />
      {highlight}
    </div>
  </div>
);

const BenefitItem = ({ text }) => (
  <div className="flex items-center">
    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
    <span className="text-gray-300">{text}</span>
  </div>
);

export default LandingPage;