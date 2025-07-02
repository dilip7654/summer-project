import React, { useState } from 'react';
import { 
  User, Settings, Activity, FileText, GitBranch, MessageSquare, 
  Video, Calendar, Code, Github, Eye, EyeOff, Edit3, Save,
  Users, Clock, Star, Award, Zap, Shield, Camera
} from 'lucide-react';

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [visibilitySettings, setVisibilitySettings] = useState({
    personalInfo: 'team',
    skills: 'public',
    projects: 'team',
    activity: 'private'
  });

  // Mock employee data
  const [employeeData, setEmployeeData] = useState({
    id: 'EMP001',
    name: 'Rahul Sharma',
    username: 'rahul.sharma',
    email: 'rahul@company.com',
    role: 'Senior Full Stack Developer',
    department: 'Engineering',
    team: 'Frontend Team Alpha',
    joinDate: '2023-01-15',
    avatar: '👨‍💻',
    status: 'online',
    bio: 'Passionate developer who loves creating scalable web applications. Expert in React, Node.js, and cloud technologies.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB'],
    languages: ['JavaScript', 'Python', 'Java'],
    location: 'Mumbai, India',
    timezone: 'IST (UTC+5:30)',
    socialLinks: {
      github: 'https://github.com/rahulsharma',
      linkedin: 'https://linkedin.com/in/rahulsharma'
    }
  });

  const recentActivity = [
    { type: 'code', action: 'Pushed to main branch', repo: 'user-dashboard', time: '2 hours ago', icon: GitBranch },
    { type: 'meeting', action: 'Attended Daily Standup', team: 'Frontend Team', time: '3 hours ago', icon: Video },
    { type: 'chat', action: 'Replied in #general', message: 'Code review completed', time: '4 hours ago', icon: MessageSquare },
    { type: 'file', action: 'Shared design specs', file: 'UI-Components.pdf', time: '5 hours ago', icon: FileText },
    { type: 'code', action: 'Created new feature branch', repo: 'api-gateway', time: '1 day ago', icon: Code }
  ];

  const currentProjects = [
    { name: 'User Dashboard V2', status: 'In Progress', progress: 75, role: 'Lead Developer' },
    { name: 'API Gateway Refactor', status: 'Planning', progress: 20, role: 'Contributor' },
    { name: 'Mobile App Integration', status: 'Code Review', progress: 90, role: 'Senior Developer' }
  ];

  const achievements = [
    { title: 'Code Quality Champion', description: 'Maintained 95%+ code review approval rate', date: '2024-05', icon: Star },
    { title: 'Team Player', description: 'Mentored 3 junior developers', date: '2024-03', icon: Users },
    { title: 'Innovation Award', description: 'Implemented automated deployment pipeline', date: '2024-01', icon: Award }
  ];

  const availableAvatars = ['👨‍💻', '👩‍💻', '🧑‍💼', '👨‍🔬', '👩‍🔬', '🦸‍♂️', '🦸‍♀️', '🤖'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getVisibilityIcon = (level) => {
    switch(level) {
      case 'public': return <Eye className="w-4 h-4" />;
      case 'team': return <Users className="w-4 h-4" />;
      case 'private': return <EyeOff className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const toggleVisibility = (field) => {
    const levels = ['private', 'team', 'public'];
    const currentIndex = levels.indexOf(visibilitySettings[field]);
    const nextIndex = (currentIndex + 1) % levels.length;
    setVisibilitySettings(prev => ({
      ...prev,
      [field]: levels[nextIndex]
    }));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                  {employeeData.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(employeeData.status)} rounded-full border-2 ${theme === 'dark' ? 'border-gray-800' : 'border-white'}`}></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{employeeData.name}</h1>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>@{employeeData.username} • {employeeData.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                <span>{isEditing ? 'Save' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'activity', label: 'Activity', icon: Activity },
                  { id: 'projects', label: 'Projects', icon: Code },
                  { id: 'achievements', label: 'Achievements', icon: Award },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === id 
                        ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}` 
                        : `${theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Personal Info */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Personal Information</h3>
                        <button onClick={() => toggleVisibility('personalInfo')} className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                          {getVisibilityIcon(visibilitySettings.personalInfo)}
                          <span className="capitalize">{visibilitySettings.personalInfo}</span>
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className={`block text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Employee ID</label>
                          <p className="font-medium">{employeeData.id}</p>
                        </div>
                        <div>
                          <label className={`block text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Department</label>
                          <p className="font-medium">{employeeData.department}</p>
                        </div>
                        <div>
                          <label className={`block text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Team</label>
                          <p className="font-medium">{employeeData.team}</p>
                        </div>
                        <div>
                          <label className={`block text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Join Date</label>
                          <p className="font-medium">{new Date(employeeData.joinDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className={`block text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Location</label>
                          <p className="font-medium">{employeeData.location}</p>
                        </div>
                        <div>
                          <label className={`block text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Timezone</label>
                          <p className="font-medium">{employeeData.timezone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Bio & Skills */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">About</h3>
                        {isEditing ? (
                          <textarea 
                            className={`w-full p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                            rows="4"
                            value={employeeData.bio}
                            onChange={(e) => setEmployeeData(prev => ({...prev, bio: e.target.value}))}
                          />
                        ) : (
                          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{employeeData.bio}</p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold">Skills</h3>
                          <button onClick={() => toggleVisibility('skills')} className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                            {getVisibilityIcon(visibilitySettings.skills)}
                            <span className="capitalize">{visibilitySettings.skills}</span>
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {employeeData.skills.map((skill, index) => (
                            <span key={index} className={`px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {employeeData.languages.map((lang, index) => (
                            <span key={index} className={`px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'}`}>
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                    <button onClick={() => toggleVisibility('activity')} className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                      {getVisibilityIcon(visibilitySettings.activity)}
                      <span className="capitalize">{visibilitySettings.activity}</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className={`flex items-start space-x-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.action}</p>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                              {activity.repo && <span>Repository: {activity.repo} • </span>}
                              {activity.team && <span>Team: {activity.team} • </span>}
                              {activity.file && <span>File: {activity.file} • </span>}
                              {activity.message && <span>"{activity.message}" • </span>}
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Current Projects</h3>
                    <button onClick={() => toggleVisibility('projects')} className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                      {getVisibilityIcon(visibilitySettings.projects)}
                      <span className="capitalize">{visibilitySettings.projects}</span>
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {currentProjects.map((project, index) => (
                      <div key={index} className={`p-6 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-lg">{project.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Role: {project.role}</p>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className={`w-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                              style={{width: `${project.progress}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div>
                  <h3 className="text-lg font-semibold mb-6">Achievements & Recognition</h3>
                  <div className="grid gap-4">
                    {achievements.map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={index} className={`flex items-start space-x-4 p-6 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{achievement.title}</h4>
                            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{achievement.description}</p>
                            <p className="text-sm text-gray-500">Awarded: {achievement.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Profile Settings</h3>
                  
                  {/* Avatar Selection */}
                  <div>
                    <h4 className="font-medium mb-3">Choose Avatar</h4>
                    <div className="flex space-x-3">
                      {availableAvatars.map((avatar, index) => (
                        <button
                          key={index}
                          onClick={() => setEmployeeData(prev => ({...prev, avatar}))}
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all ${
                            employeeData.avatar === avatar 
                              ? 'border-blue-500 bg-blue-50' 
                              : `border-gray-300 ${theme === 'dark' ? 'hover:border-gray-500' : 'hover:border-gray-400'}`
                          }`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div>
                    <h4 className="font-medium mb-4">Privacy Settings</h4>
                    <div className="space-y-4">
                      {Object.entries(visibilitySettings).map(([field, level]) => (
                        <div key={field} className="flex items-center justify-between">
                          <span className="capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
                          <button
                            onClick={() => toggleVisibility(field)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                          >
                            {getVisibilityIcon(level)}
                            <span className="capitalize">{level}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Theme Settings */}
                  <div>
                    <h4 className="font-medium mb-3">Theme Preference</h4>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setTheme('dark')}
                        className={`px-4 py-2 rounded-lg border ${theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      >
                        🌙 Dark
                      </button>
                      <button
                        onClick={() => setTheme('light')}
                        className={`px-4 py-2 rounded-lg border ${theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      >
                        ☀️ Light
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;