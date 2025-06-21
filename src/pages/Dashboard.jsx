import React, { useState } from 'react';
import { 
  Code, 
  GitBranch, 
  MessageCircle, 
  Video, 
  Clock,
  Users,
  Plus,
  Bot,
  Zap,
  Activity,
  TrendingUp,
  Calendar,
  FileText,
  Star,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const [stats] = useState({
    linesOfCode: '12,847',
    commitsThisWeek: '23',
    messages: '156',
    codingHours: '34.5h'
  });

  const [recentProjects] = useState([
    { 
      id: 1, 
      name: 'React Portfolio', 
      language: 'JavaScript', 
      lastModified: '2 hours ago', 
      status: 'active',
      progress: 85 
    },
    { 
      id: 2, 
      name: 'Python API', 
      language: 'Python', 
      lastModified: '1 day ago', 
      status: 'completed',
      progress: 100 
    },
    { 
      id: 3, 
      name: 'Flutter App', 
      language: 'Dart', 
      lastModified: '3 days ago', 
      status: 'in-progress',
      progress: 65 
    },
    { 
      id: 4, 
      name: 'Node.js Backend', 
      language: 'JavaScript', 
      lastModified: '5 days ago', 
      status: 'in-progress',
      progress: 40 
    }
  ]);
  
  const [recentActivity] = useState([
    { 
      id: 1, 
      type: 'commit', 
      message: 'Fixed authentication bug in login module', 
      time: '2 hours ago',
      project: 'React Portfolio' 
    },
    { 
      id: 2, 
      type: 'chat', 
      message: 'New message in Team Alpha', 
      time: '4 hours ago',
      project: 'Team Alpha' 
    },
    { 
      id: 3, 
      type: 'meeting', 
      message: 'Daily standup completed', 
      time: '1 day ago',
      project: 'Sprint Planning' 
    },
    { 
      id: 4, 
      type: 'file', 
      message: 'Uploaded design assets for mobile app', 
      time: '2 days ago',
      project: 'Flutter App' 
    }
  ]);

  const [upcomingEvents] = useState([
    { id: 1, title: 'Daily Standup', time: '10:00 AM', type: 'meeting', participants: 5 },
    { id: 2, title: 'Code Review Session', time: '2:00 PM', type: 'meeting', participants: 3 },
    { id: 3, title: 'Sprint Planning', time: '4:00 PM', type: 'meeting', participants: 8 },
    { id: 4, title: 'Deploy to Production', time: '6:00 PM', type: 'task', participants: 0 }
  ]);

  const [aiSuggestions] = useState([
    {
      title: 'Code Optimization',
      description: 'Optimize React components for better performance',
      impact: 'High',
      category: 'Performance'
    },
    {
      title: 'Security Update',
      description: 'Update dependencies to latest stable versions',
      impact: 'Medium',
      category: 'Security'
    },
    {
      title: 'Code Quality',
      description: 'Consider implementing error boundaries',
      impact: 'Low',
      category: 'Best Practice'
    }
  ]);

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-sm text-green-400 font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ProjectCard = ({ project }) => {
    const statusColors = {
      active: 'bg-green-900/50 text-green-400 border-green-400/30',
      completed: 'bg-blue-900/50 text-blue-400 border-blue-400/30',
      'in-progress': 'bg-yellow-900/50 text-yellow-400 border-yellow-400/30'
    };

    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200 cursor-pointer group">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
            {project.name}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
            {project.status.replace('-', ' ')}
          </span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">{project.language}</span>
          <span className="text-sm font-medium text-purple-400">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-2 transition-all duration-300" 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500">Modified {project.lastModified}</p>
      </div>
    );
  };

  const ActivityItem = ({ activity }) => {
    const getIcon = (type) => {
      switch (type) {
        case 'commit': return <GitBranch className="w-4 h-4" />;
        case 'chat': return <MessageCircle className="w-4 h-4" />;
        case 'meeting': return <Video className="w-4 h-4" />;
        case 'file': return <FileText className="w-4 h-4" />;
        default: return <Activity className="w-4 h-4" />;
      }
    };

    const getColor = (type) => {
      switch (type) {
        case 'commit': return 'bg-green-900/50 text-green-400';
        case 'chat': return 'bg-blue-900/50 text-blue-400';
        case 'meeting': return 'bg-purple-900/50 text-purple-400';
        case 'file': return 'bg-orange-900/50 text-orange-400';
        default: return 'bg-gray-700 text-gray-400';
      }
    };

    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-700/50 rounded-lg transition-colors">
        <div className={`p-2 rounded-lg ${getColor(activity.type)}`}>
          {getIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{activity.message}</p>
          <div className="flex items-center mt-1">
            <p className="text-xs text-gray-400">{activity.project}</p>
            <span className="mx-2 text-xs text-gray-600">•</span>
            <p className="text-xs text-gray-400">{activity.time}</p>
          </div>
        </div>
      </div>
    );
  };

  const EventCard = ({ event }) => (
    <div className="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200">
      <div className={`w-3 h-12 rounded-full mr-4 ${
        event.type === 'meeting' ? 'bg-gradient-to-b from-purple-500 to-blue-500' : 'bg-gradient-to-b from-green-500 to-emerald-500'
      }`}></div>
      <div className="flex-1">
        <h4 className="font-medium text-white">{event.title}</h4>
        <div className="flex items-center text-sm text-gray-400 mt-1">
          <Clock className="w-4 h-4 mr-1" />
          <span className="mr-3">{event.time}</span>
          {event.participants > 0 && (
            <>
              <Users className="w-4 h-4 mr-1" />
              <span>{event.participants}</span>
            </>
          )}
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-500" />
    </div>
  );

  const SuggestionCard = ({ suggestion }) => {
    const impactColors = {
      High: 'bg-red-900/50 text-red-400 border-red-400/30',
      Medium: 'bg-yellow-900/50 text-yellow-400 border-yellow-400/30',
      Low: 'bg-green-900/50 text-green-400 border-green-400/30'
    };

    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-white">{suggestion.title}</h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${impactColors[suggestion.impact]}`}>
            {suggestion.impact}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-3">{suggestion.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
            {suggestion.category}
          </span>
          <button className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Apply Suggestion
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">John</span>!
        </h1>
        <p className="text-gray-400">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Code}
          title="Lines of Code"
          value={stats.linesOfCode}
          change="+2.5%"
          color="bg-gradient-to-r from-blue-600 to-blue-700"
        />
        <StatCard
          icon={GitBranch}
          title="Commits This Week"
          value={stats.commitsThisWeek}
          change="+15%"
          color="bg-gradient-to-r from-green-600 to-green-700"
        />
        <StatCard
          icon={MessageCircle}
          title="Messages"
          value={stats.messages}
          change="+8%"
          color="bg-gradient-to-r from-purple-600 to-purple-700"
        />
        <StatCard
          icon={Clock}
          title="Coding Hours"
          value={stats.codingHours}
          change="+12%"
          color="bg-gradient-to-r from-orange-600 to-orange-700"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
                <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25">
                <Plus className="w-5 h-5 mr-2" />
                New Project
              </button>
              <button className="w-full flex items-center justify-center p-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-purple-500 transition-all duration-200 font-medium">
                <GitBranch className="w-5 h-5 mr-2" />
                Clone Repository
              </button>
              <button className="w-full flex items-center justify-center p-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-purple-500 transition-all duration-200 font-medium">
                <Video className="w-5 h-5 mr-2" />
                Start Meeting
              </button>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Today's Schedule</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {upcomingEvents.slice(0, 3).map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="p-4">
            {recentActivity.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center">
              <Bot className="w-5 h-5 text-purple-400 mr-2" />
              <h2 className="text-lg font-semibold text-white">AI Suggestions</h2>
              <div className="ml-2 px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <SuggestionCard key={index} suggestion={suggestion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;