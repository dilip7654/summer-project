import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  Code, 
  GitBranch, 
  MessageCircle, 
  Video, 
  Clock,
  Plus,
  Bot,
  Zap,
  Activity,
  TrendingUp,
  Calendar,
  FileText,
  Star,
  ArrowRight,
  Upload,
  CheckCircle,
  Circle,
  User,
  Bell,
  Settings,
  Shield,
  BarChart3,
  Target,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  FolderOpen,
  Database,
  Headphones,
  Award,
  PieChart,
  LineChart
} from 'lucide-react';

const AdminDashboard = () => {
  const [currentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  
  const [orgStats] = useState({
    totalEmployees: '156',
    activeProjects: '24',
    completedTasks: '1,247',
    organizationScore: '94%'
  });

  const [recentActivity] = useState([
    { id: 1, user: 'Sarah Johnson', action: 'completed task', project: 'Mobile App Redesign', time: '2 min ago', type: 'task' },
    { id: 2, user: 'Mike Chen', action: 'pushed code to', project: 'API Backend', time: '15 min ago', type: 'code' },
    { id: 3, user: 'Emma Davis', action: 'joined meeting', project: 'Sprint Planning', time: '30 min ago', type: 'meeting' },
    { id: 4, user: 'Alex Kumar', action: 'uploaded files to', project: 'Documentation', time: '1 hour ago', type: 'file' },
    { id: 5, user: 'Lisa Park', action: 'created new project', project: 'Client Portal', time: '2 hours ago', type: 'project' }
  ]);

  const [employees] = useState([
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      role: 'Frontend Developer', 
      status: 'online', 
      tasksCompleted: 45, 
      productivity: 92,
      avatar: 'SJ'
    },
    { 
      id: 2, 
      name: 'Mike Chen', 
      role: 'Backend Developer', 
      status: 'busy', 
      tasksCompleted: 38, 
      productivity: 88,
      avatar: 'MC'
    },
    { 
      id: 3, 
      name: 'Emma Davis', 
      role: 'UI/UX Designer', 
      status: 'online', 
      tasksCompleted: 52, 
      productivity: 95,
      avatar: 'ED'
    },
    { 
      id: 4, 
      name: 'Alex Kumar', 
      role: 'DevOps Engineer', 
      status: 'offline', 
      tasksCompleted: 29, 
      productivity: 85,
      avatar: 'AK'
    },
    { 
      id: 5, 
      name: 'Lisa Park', 
      role: 'Project Manager', 
      status: 'online', 
      tasksCompleted: 41, 
      productivity: 90,
      avatar: 'LP'
    }
  ]);

  const [projects] = useState([
    { 
      id: 1, 
      name: 'Mobile App Redesign', 
      status: 'in-progress', 
      progress: 75, 
      team: 8, 
      deadline: '2024-07-15',
      priority: 'high'
    },
    { 
      id: 2, 
      name: 'API Backend', 
      status: 'in-progress', 
      progress: 60, 
      team: 5, 
      deadline: '2024-08-01',
      priority: 'medium'
    },
    { 
      id: 3, 
      name: 'Client Portal', 
      status: 'planning', 
      progress: 15, 
      team: 6, 
      deadline: '2024-09-10',
      priority: 'low'
    },
    { 
      id: 4, 
      name: 'Documentation Update', 
      status: 'completed', 
      progress: 100, 
      team: 3, 
      deadline: '2024-06-20',
      priority: 'medium'
    }
  ]);

  const [upcomingMeetings] = useState([
    { id: 1, title: 'Daily Standup', time: '10:00 AM', attendees: 12, type: 'recurring' },
    { id: 2, title: 'Sprint Review', time: '2:00 PM', attendees: 8, type: 'scheduled' },
    { id: 3, title: 'Client Presentation', time: '4:30 PM', attendees: 15, type: 'important' },
    { id: 4, title: 'Team Retrospective', time: '6:00 PM', attendees: 10, type: 'scheduled' }
  ]);

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'Mobile App project deadline approaching', time: '1 hour ago' },
    { id: 2, type: 'info', message: '3 new employee requests pending approval', time: '3 hours ago' },
    { id: 3, type: 'success', message: 'API Backend milestone completed', time: '1 day ago' }
  ]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const StatCard = ({ icon: Icon, title, value, change, color, subtitle }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Icon className="w-5 h-5 text-gray-400 mr-2" />
            <p className="text-sm font-medium text-gray-400">{title}</p>
          </div>
          <p className="text-2xl font-bold text-white mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
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

  const EmployeeCard = ({ employee }) => {
    const statusColors = {
      online: 'bg-green-500',
      busy: 'bg-yellow-500',
      offline: 'bg-gray-500'
    };

    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {employee.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${statusColors[employee.status]} rounded-full border-2 border-gray-800`}></div>
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-white">{employee.name}</h4>
              <p className="text-xs text-gray-400">{employee.role}</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
              <Eye className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
              <MessageCircle className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Tasks Completed</span>
            <span className="text-white font-medium">{employee.tasksCompleted}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Productivity</span>
            <span className="text-green-400 font-medium">{employee.productivity}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-2 transition-all duration-300" 
              style={{ width: `${employee.productivity}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const ProjectCard = ({ project }) => {
    const statusColors = {
      'in-progress': 'bg-blue-900/50 text-blue-400 border-blue-400/30',
      'completed': 'bg-green-900/50 text-green-400 border-green-400/30',
      'planning': 'bg-yellow-900/50 text-yellow-400 border-yellow-400/30',
      'on-hold': 'bg-red-900/50 text-red-400 border-red-400/30'
    };

    const priorityColors = {
      high: 'text-red-400',
      medium: 'text-yellow-400',
      low: 'text-green-400'
    };

    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-white mb-1">{project.name}</h4>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                {project.status.replace('-', ' ')}
              </span>
              <span className={`text-xs font-medium ${priorityColors[project.priority]}`}>
                {project.priority} priority
              </span>
            </div>
          </div>
          <div className="flex space-x-1">
            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
              <Edit className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
              <Eye className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-white font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-2 transition-all duration-300" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{project.team} team members</span>
            <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  };

  const ActivityItem = ({ activity }) => {
    const getIcon = (type) => {
      switch (type) {
        case 'task': return <CheckCircle className="w-4 h-4" />;
        case 'code': return <Code className="w-4 h-4" />;
        case 'meeting': return <Video className="w-4 h-4" />;
        case 'file': return <FileText className="w-4 h-4" />;
        case 'project': return <FolderOpen className="w-4 h-4" />;
        default: return <Activity className="w-4 h-4" />;
      }
    };

    const getColor = (type) => {
      switch (type) {
        case 'task': return 'bg-green-900/50 text-green-400';
        case 'code': return 'bg-blue-900/50 text-blue-400';
        case 'meeting': return 'bg-purple-900/50 text-purple-400';
        case 'file': return 'bg-orange-900/50 text-orange-400';
        case 'project': return 'bg-pink-900/50 text-pink-400';
        default: return 'bg-gray-700 text-gray-400';
      }
    };

    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-700/50 rounded-lg transition-colors">
        <div className={`p-2 rounded-lg ${getColor(activity.type)}`}>
          {getIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white">
            <span className="font-medium text-purple-400">{activity.user}</span> {activity.action} <span className="text-blue-400">{activity.project}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
        </div>
      </div>
    );
  };

  const MeetingCard = ({ meeting }) => {
    const typeColors = {
      recurring: 'bg-blue-900/50 text-blue-400',
      scheduled: 'bg-green-900/50 text-green-400',
      important: 'bg-red-900/50 text-red-400'
    };

    return (
      <div className="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200">
        <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mr-4"></div>
        <div className="flex-1">
          <h4 className="font-medium text-white">{meeting.title}</h4>
          <div className="flex items-center text-sm text-gray-400 mt-1">
            <Clock className="w-4 h-4 mr-1" />
            <span className="mr-3">{meeting.time}</span>
            <Users className="w-4 h-4 mr-1" />
            <span className="mr-3">{meeting.attendees}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${typeColors[meeting.type]}`}>
              {meeting.type}
            </span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-700 rounded transition-colors">
          <Video className="w-4 h-4 text-purple-400" />
        </button>
      </div>
    );
  };

  const AlertCard = ({ alert }) => {
    const alertColors = {
      warning: 'border-yellow-500 bg-yellow-900/20',
      info: 'border-blue-500 bg-blue-900/20',
      success: 'border-green-500 bg-green-900/20',
      error: 'border-red-500 bg-red-900/20'
    };

    const alertIcons = {
      warning: AlertTriangle,
      info: Bell,
      success: CheckCircle,
      error: AlertTriangle
    };

    const Icon = alertIcons[alert.type];

    return (
      <div className={`p-3 rounded-lg border ${alertColors[alert.type]} transition-all duration-200`}>
        <div className="flex items-start space-x-3">
          <Icon className="w-4 h-4 text-current mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white">{alert.message}</p>
            <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Dashboard</span>
          </h1>
          <p className="text-gray-400">{formatDate(currentDate)} • TechCorp Solutions</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Employee
          </button>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <div className="p-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
              <Settings className="w-5 h-5 text-gray-400" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          title="Total Employees"
          value={orgStats.totalEmployees}
          change="+8 this month"
          color="bg-gradient-to-r from-blue-600 to-blue-700"
          subtitle="Active members"
        />
        <StatCard
          icon={FolderOpen}
          title="Active Projects"
          value={orgStats.activeProjects}
          change="+3 this week"
          color="bg-gradient-to-r from-green-600 to-green-700"
          subtitle="In progress"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed Tasks"
          value={orgStats.completedTasks}
          change="+127 today"
          color="bg-gradient-to-r from-purple-600 to-purple-700"
          subtitle="This month"
        />
        <StatCard
          icon={Award}
          title="Organization Score"
          value={orgStats.organizationScore}
          change="+2% this week"
          color="bg-gradient-to-r from-orange-600 to-orange-700"
          subtitle="Performance rating"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
            <div className="p-4">
              {recentActivity.map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Alerts</h3>
            </div>
            <div className="p-4 space-y-3">
              {alerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-3">
              <button className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium">
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </button>
              <button className="w-full flex items-center justify-center p-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-purple-500 transition-all duration-200 font-medium">
                <Video className="w-4 h-4 mr-2" />
                Schedule Meeting
              </button>
              <button className="w-full flex items-center justify-center p-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-purple-500 transition-all duration-200 font-medium">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Performers */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Team Overview</h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                Manage Team
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4">
              {employees.slice(0, 3).map(employee => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Active Projects</h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {projects.slice(0, 3).map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Meetings Schedule */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Today's Meetings</h2>
            <div className="flex items-center space-x-2">
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                Schedule New
              </button>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingMeetings.map(meeting => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;