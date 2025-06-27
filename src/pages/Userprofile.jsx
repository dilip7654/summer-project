import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Activity, 
  FileText, 
  Code, 
  Github, 
  MessageSquare, 
  Video, 
  Calendar,
  Edit3,
  Save,
  X,
  Upload,
  Palette,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Star,
  Award,
  Clock,
  Folder
} from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Kumar',
    email: 'alex.kumar@example.com',
    username: 'alexdev_01',
    bio: 'Full-stack developer passionate about creating amazing web experiences. Love working with React, Node.js, and modern web technologies.',
    location: 'Mumbai, India',
    website: 'https://alexkumar.dev',
    github: 'alexkumar-dev',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'Docker'],
    joinDate: 'January 2024',
    timezone: 'Asia/Kolkata'
  });

  const [tempProfile, setTempProfile] = useState({...userProfile});
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    activityVisible: true,
    projectsVisible: true,
    skillsVisible: true
  });

  const themes = [
    { id: 'dark', name: 'Dark Theme', bg: 'bg-gray-900', accent: 'bg-blue-600' },
    { id: 'light', name: 'Light Theme', bg: 'bg-gray-100', accent: 'bg-blue-500' },
    { id: 'discord', name: 'Discord', bg: 'bg-indigo-900', accent: 'bg-indigo-500' },
    { id: 'vscode', name: 'VS Code', bg: 'bg-gray-800', accent: 'bg-green-500' },
    { id: 'monokai', name: 'Monokai', bg: 'bg-gray-900', accent: 'bg-pink-500' }
  ];

  const avatars = [
    { id: 1, url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { id: 2, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { id: 3, url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
    { id: 4, url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face' }
  ];

  const recentActivity = [
    { id: 1, type: 'code', action: 'Pushed to repository', project: 'web-platform', time: '2 hours ago', icon: Github },
    { id: 2, type: 'meeting', action: 'Attended team meeting', project: 'Daily Standup', time: '4 hours ago', icon: Video },
    { id: 3, type: 'file', action: 'Shared design file', project: 'UI Components', time: '6 hours ago', icon: FileText },
    { id: 4, type: 'chat', action: 'Started discussion', project: 'Feature Planning', time: '1 day ago', icon: MessageSquare },
    { id: 5, type: 'code', action: 'Created new branch', project: 'auth-system', time: '2 days ago', icon: Code }
  ];

  const projects = [
    { name: 'Web Platform', role: 'Lead Developer', status: 'Active', commits: 127 },
    { name: 'Mobile App', role: 'Frontend Developer', status: 'Completed', commits: 89 },
    { name: 'API Service', role: 'Backend Developer', status: 'In Progress', commits: 45 }
  ];

  const handleSave = () => {
    setUserProfile({...tempProfile});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile({...userProfile});
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePrivacy = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className={`min-h-screen ${selectedTheme === 'dark' ? 'bg-gray-900 text-white' : selectedTheme === 'light' ? 'bg-gray-50 text-gray-900' : selectedTheme === 'discord' ? 'bg-indigo-900 text-white' : selectedTheme === 'vscode' ? 'bg-gray-800 text-gray-100' : 'bg-gray-900 text-white'}`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={avatars.find(a => a.id === selectedAvatar)?.url} 
                alt="Profile" 
                className="w-20 h-20 rounded-full border-4 border-blue-500"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userProfile.name}</h1>
              <p className="text-gray-400">@{userProfile.username}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-400">Individual Plan</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 rounded-lg p-1">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'activity', label: 'Activity', icon: Activity },
            { id: 'projects', label: 'Projects', icon: Folder },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p>{userProfile.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p>@{userProfile.username}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={tempProfile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p>{userProfile.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p>{userProfile.location}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={tempProfile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-300">{userProfile.bio}</p>
                    )}
                  </div>
                  {isEditing && (
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {isEditing && (
                      <button className="px-3 py-1 bg-gray-600 text-white rounded-full text-sm hover:bg-gray-500 transition-colors">
                        + Add Skill
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'code' ? 'bg-green-500' :
                        activity.type === 'meeting' ? 'bg-blue-500' :
                        activity.type === 'file' ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`}>
                        <activity.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-400">{activity.project}</p>
                      </div>
                      <div className="text-sm text-gray-400">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">My Projects</h3>
                <div className="space-y-4">
                  {projects.map(project => (
                    <div key={project.name} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{project.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'Active' ? 'bg-green-500' :
                          project.status === 'Completed' ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{project.role}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span>{project.commits} commits</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Theme Settings */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Theme & Appearance</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {themes.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          selectedTheme === theme.id 
                            ? 'border-blue-500' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className={`w-full h-8 rounded mb-2 ${theme.bg}`}></div>
                        <div className={`w-3/4 h-2 rounded mb-2 ${theme.accent}`}></div>
                        <p className="text-sm">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Avatar Settings */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Avatar</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    {avatars.map(avatar => (
                      <button
                        key={avatar.id}
                        onClick={() => setSelectedAvatar(avatar.id)}
                        className={`rounded-full border-4 transition-colors ${
                          selectedAvatar === avatar.id 
                            ? 'border-blue-500' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <img 
                          src={avatar.url} 
                          alt={`Avatar ${avatar.id}`}
                          className="w-16 h-16 rounded-full"
                        />
                      </button>
                    ))}
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Custom Avatar</span>
                  </button>
                </div>

                {/* Privacy Settings */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    {Object.entries(privacySettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {value ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          <span className="capitalize">{key.replace('Visible', ' Visibility')}</span>
                        </div>
                        <button
                          onClick={() => togglePrivacy(key)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            value ? 'bg-blue-600' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Projects</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Commits</span>
                  <span className="font-semibold">261</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Files Shared</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Meetings</span>
                  <span className="font-semibold">89</span>
                </div>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </div>
                  <span className="text-green-500 text-sm">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Google Calendar</span>
                  </div>
                  <button className="text-blue-500 text-sm hover:underline">Connect</button>
                </div>
              </div>
            </div>

            {/* Recent Files */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Files</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Code className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">main.tsx</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">requirements.md</p>
                    <p className="text-xs text-gray-400">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">api.js</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;