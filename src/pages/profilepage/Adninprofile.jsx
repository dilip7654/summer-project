import React, { useState } from 'react';
import { User, Settings, Shield, Activity, Users, Code, GitBranch, MessageSquare, Calendar, Files, Palette, Eye, EyeOff, Bell, Moon, Sun } from 'lucide-react';

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isPrivate, setIsPrivate] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState('discord');

  const avatars = [
    { id: 1, name: 'Avatar 1', color: 'bg-blue-500' },
    { id: 2, name: 'Avatar 2', color: 'bg-green-500' },
    { id: 3, name: 'Avatar 3', color: 'bg-purple-500' },
    { id: 4, name: 'Avatar 4', color: 'bg-red-500' },
    { id: 5, name: 'Avatar 5', color: 'bg-yellow-500' },
    { id: 6, name: 'Avatar 6', color: 'bg-pink-500' }
  ];

  const themes = [
    { id: 'discord', name: 'Discord Dark', primary: '#5865F2', secondary: '#2F3136' },
    { id: 'vscode', name: 'VS Code Dark', primary: '#007ACC', secondary: '#1E1E1E' },
    { id: 'github', name: 'GitHub Dark', primary: '#238636', secondary: '#0D1117' },
    { id: 'custom', name: 'Custom Purple', primary: '#7C3AED', secondary: '#1F2937' }
  ];

  const activities = [
    { type: 'code', action: 'Created new repository', time: '2 hours ago', icon: GitBranch },
    { type: 'meeting', action: 'Scheduled team meeting', time: '4 hours ago', icon: Calendar },
    { type: 'chat', action: 'Sent message in #general', time: '6 hours ago', icon: MessageSquare },
    { type: 'file', action: 'Uploaded design files', time: '1 day ago', icon: Files },
    { type: 'user', action: 'Added new team member', time: '2 days ago', icon: Users }
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'permissions', name: 'Permissions', icon: Shield },
    { id: 'activity', name: 'Activity', icon: Activity },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const permissions = [
    { name: 'User Management', description: 'Create, edit, and delete user accounts', enabled: true },
    { name: 'Team Management', description: 'Manage teams and team permissions', enabled: true },
    { name: 'Repository Access', description: 'Full access to all repositories', enabled: true },
    { name: 'Meeting Control', description: 'Schedule and manage meetings', enabled: true },
    { name: 'File Management', description: 'Upload, delete, and manage files', enabled: true },
    { name: 'Analytics Access', description: 'View platform analytics and reports', enabled: true },
    { name: 'System Settings', description: 'Configure platform settings', enabled: true }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full ${avatars.find(a => a.id === selectedAvatar)?.color} flex items-center justify-center text-white font-bold text-lg`}>
              A
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Platform Administrator</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} min-h-screen p-4`}>
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800')
                      : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700')
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 mb-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Full Name</label>
                    <input
                      type="text"
                      defaultValue="Admin User"
                      className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Email</label>
                    <input
                      type="email"
                      defaultValue="admin@company.com"
                      className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Role</label>
                    <select className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}>
                      <option>Super Admin</option>
                      <option>Admin</option>
                      <option>Moderator</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Department</label>
                    <input
                      type="text"
                      defaultValue="IT Administration"
                      className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="Platform administrator with expertise in team management and system operations."
                    className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsPrivate(!isPrivate)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isPrivate ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white transition-colors`}
                    >
                      {isPrivate ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{isPrivate ? 'Private Profile' : 'Public Profile'}</span>
                    </button>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="max-w-4xl mx-auto">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-semibold mb-4">Admin Permissions</h2>
                <div className="space-y-4">
                  {permissions.map((permission, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div>
                        <h3 className="font-medium">{permission.name}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{permission.description}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full ${permission.enabled ? 'bg-green-500' : 'bg-gray-400'} relative cursor-pointer`}>
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${permission.enabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="max-w-4xl mx-auto">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-semibold mb-4">Activity History</h2>
                <div className="space-y-4">
                  {activities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="max-w-4xl mx-auto">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 mb-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-semibold mb-4">Avatar Selection</h2>
                <div className="grid grid-cols-6 gap-4">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`w-16 h-16 rounded-full ${avatar.color} flex items-center justify-center text-white font-bold text-lg border-4 ${
                        selectedAvatar === avatar.id ? 'border-blue-500' : 'border-transparent'
                      } hover:border-blue-400 transition-colors`}
                    >
                      A
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-semibold mb-4">Theme Selection</h2>
                <div className="grid grid-cols-2 gap-4">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-4 rounded-lg border-2 ${
                        selectedTheme === theme.id ? 'border-blue-500' : (darkMode ? 'border-gray-600' : 'border-gray-300')
                      } hover:border-blue-400 transition-colors`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.secondary }}></div>
                        </div>
                        <span className="font-medium">{theme.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Receive email notifications for important updates</p>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-green-500 relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Enable
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">API Access</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Generate API keys for external integrations</p>
                    </div>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      Manage
                    </button>
                  </div>
                  
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-medium text-red-500 mb-2">Danger Zone</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Permanently delete this account and all associated data</p>
                      </div>
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;