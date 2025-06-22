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
  ArrowRight,
  Upload,
  CheckCircle,
  Circle,
  User,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const EmployeeDashboard = () => {
  const [currentDate] = useState(new Date());
  const [stats] = useState({
    tasksCompleted: '24',
    activeProjects: '5',
    messages: '42',
    workingHours: '7.5h'
  });

  const [myTasks] = useState([
    { id: 1, title: 'Fix login issue', completed: true, priority: 'high' },
    { id: 2, title: 'Implement new feature', completed: true, priority: 'medium' },
    { id: 3, title: 'Code review', completed: false, priority: 'high' },
    { id: 4, title: 'Update documentation', completed: false, priority: 'low' },
    { id: 5, title: 'Refactor code', completed: false, priority: 'medium' }
  ]);

  const [allTasks] = useState([
    { id: 1, title: 'Fix login issue', completed: true, assignee: 'You' },
    { id: 2, title: 'Implement new feature', completed: true, assignee: 'You' },
    { id: 3, title: 'Database optimization', completed: false, assignee: 'Sarah' },
    { id: 4, title: 'UI/UX improvements', completed: false, assignee: 'Mike' },
    { id: 5, title: 'API integration', completed: false, assignee: 'Alex' }
  ]);

  const [githubActivity] = useState([
    {
      user: 'johndoe',
      action: 'Merged PR #42',
      description: 'Add new API endpoint',
      time: '2 days ago'
    },
    {
      user: 'octocat',
      action: 'Opened issue #101',
      description: 'Bug in user registration',
      time: '3 days ago'
    }
  ]);

  const [streakData] = useState({
    current: 3,
    longest: 12,
    type: 'day'
  });

  const [quickActions] = useState([
    { title: 'Open Code Editor', icon: Code, color: 'from-blue-500 to-blue-600' },
    { title: 'Connect GitHub', icon: GitBranch, color: 'from-green-500 to-green-600' },
    { title: 'Upload Files', icon: Upload, color: 'from-purple-500 to-purple-600' },
    { title: 'Start AI Assistant', icon: Bot, color: 'from-orange-500 to-orange-600' },
    { title: 'Join Meeting', icon: Video, color: 'from-red-500 to-red-600' }
  ]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className="text-xl font-bold text-white">{value}</p>
          {change && (
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              <span className="text-xs text-green-400 font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );

  const TaskItem = ({ task, showAssignee = false }) => (
    <div className="flex items-center p-2 hover:bg-gray-700/50 rounded-lg transition-colors group">
      <div className="mr-3">
        {task.completed ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
        )}
      </div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
          {task.title}
        </p>
        {showAssignee && (
          <p className="text-xs text-gray-500 mt-1">{task.assignee}</p>
        )}
      </div>
      {task.priority && (
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          task.priority === 'high' ? 'bg-red-900/50 text-red-400' :
          task.priority === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
          'bg-green-900/50 text-green-400'
        }`}>
          {task.priority}
        </div>
      )}
    </div>
  );

  const QuickActionCard = ({ action }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200 cursor-pointer group">
      <div className="flex flex-col items-center text-center">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} mb-3 group-hover:scale-110 transition-transform duration-200`}>
          <action.icon className="w-6 h-6 text-white" />
        </div>
        <p className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">
          {action.title}
        </p>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-700/50 rounded-lg transition-colors">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
        <User className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">
          <span className="text-purple-400">{activity.user}</span>
        </p>
        <p className="text-sm text-gray-300">{activity.action}: {activity.description}</p>
        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
      </div>
    </div>
  );

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const today = currentDate.getDate();
  
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Dilip</span>
          </h1>
          <p className="text-gray-400">{formatDate(currentDate)}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
          <div className="p-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} action={action} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={CheckCircle}
          title="Tasks Completed"
          value={stats.tasksCompleted}
          change="+12%"
          color="bg-gradient-to-r from-green-600 to-green-700"
        />
        <StatCard
          icon={Code}
          title="Active Projects"
          value={stats.activeProjects}
          change="+2"
          color="bg-gradient-to-r from-blue-600 to-blue-700"
        />
        <StatCard
          icon={MessageCircle}
          title="Messages"
          value={stats.messages}
          change="+8"
          color="bg-gradient-to-r from-purple-600 to-purple-700"
        />
        <StatCard
          icon={Clock}
          title="Working Hours"
          value={stats.workingHours}
          change="+0.5h"
          color="bg-gradient-to-r from-orange-600 to-orange-700"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* My Tasks */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">My Tasks</h2>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {myTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
            <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-2 transition-all duration-300" 
                style={{ width: `${(myTasks.filter(t => t.completed).length / myTasks.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              {myTasks.filter(t => t.completed).length} of {myTasks.length} completed
            </p>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Calendar</h2>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-1">{monthName}</p>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-400 p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`text-center text-sm p-2 rounded transition-colors ${
                    day === today 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold' 
                      : day 
                        ? 'text-gray-300 hover:bg-gray-700 cursor-pointer' 
                        : ''
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GitHub Activity */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">GitHub Activity</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {githubActivity.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* All Tasks */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Tasks</h2>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {allTasks.map(task => (
                <TaskItem key={task.id} task={task} showAssignee />
              ))}
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Streak</h2>
          </div>
          <div className="p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <div className="text-2xl font-bold text-white">
                    {streakData.current}
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {streakData.current}-{streakData.type} streak
              </h3>
              <p className="text-sm text-gray-400">
                Keep it up! Your longest streak was {streakData.longest} days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;