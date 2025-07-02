import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Code, 
  Users, 
  Hash, 
  Phone, 
  Video, 
  MoreHorizontal,
  Search,
  Bell,
  Settings,
  Plus,
  ChevronDown,
  ChevronRight,
  Circle,
  CheckCircle,
  Clock,
  FileText,
  Image,
  Folder,
  GitBranch,
  Calendar,
  User,
  Crown,
  Shield
} from 'lucide-react';

const AdminChatPlatform = () => {
  const [selectedChat, setSelectedChat] = useState('general');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [expandedOrgs, setExpandedOrgs] = useState(['techcorp']);
  const [onlineUsers, setOnlineUsers] = useState(['john', 'sarah', 'mike']);
  const messageEndRef = useRef(null);

  const organizations = [
    {
      id: 'techcorp',
      name: 'TechCorp Inc.',
      channels: [
        { id: 'general', name: 'general', type: 'channel', unread: 3 },
        { id: 'dev-team', name: 'dev-team', type: 'channel', unread: 0 },
        { id: 'project-alpha', name: 'project-alpha', type: 'channel', unread: 7 },
        { id: 'random', name: 'random', type: 'channel', unread: 0 }
      ],
      members: [
        { id: 'john', name: 'John Doe', role: 'Developer', status: 'online' },
        { id: 'sarah', name: 'Sarah Wilson', role: 'Designer', status: 'online' },
        { id: 'mike', name: 'Mike Johnson', role: 'PM', status: 'away' },
        { id: 'emma', name: 'Emma Davis', role: 'QA', status: 'offline' }
      ]
    }
  ];

  const messages = {
    'general': [
      {
        id: 1,
        user: 'Sarah Wilson',
        avatar: 'SW',
        time: '10:30 AM',
        content: 'Hey team! The new design mockups are ready for review.',
        type: 'text'
      },
      {
        id: 2,
        user: 'John Doe',
        avatar: 'JD',
        time: '10:32 AM',
        content: 'Great! Can you share them in the design channel?',
        type: 'text'
      },
      {
        id: 3,
        user: 'Mike Johnson',
        avatar: 'MJ',
        time: '10:35 AM',
        content: 'Here\'s the updated component:\n\n```jsx\nconst Button = ({ children, onClick }) => {\n  return (\n    <button onClick={onClick} className="btn-primary">\n      {children}\n    </button>\n  );\n};\n```',
        type: 'code',
        language: 'jsx'
      },
      {
        id: 4,
        user: 'Admin',
        avatar: 'AD',
        time: '10:45 AM',
        content: 'Team meeting at 2 PM today. Please join the video call.',
        type: 'announcement'
      }
    ]
  };

  const tasks = [
    { id: 1, title: 'Review pull requests', status: 'pending', assignee: 'John Doe', due: '2024-01-15' },
    { id: 2, title: 'Update documentation', status: 'completed', assignee: 'Sarah Wilson', due: '2024-01-14' },
    { id: 3, title: 'Fix authentication bug', status: 'in-progress', assignee: 'Mike Johnson', due: '2024-01-16' }
  ];

  const toggleOrg = (orgId) => {
    setExpandedOrgs(prev => 
      prev.includes(orgId) 
        ? prev.filter(id => id !== orgId)
        : [...prev, orgId]
    );
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage('');
    }
  };

  const renderMessage = (msg) => {
    return (
      <div key={msg.id} className="group hover:bg-gray-50 px-4 py-2">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
            {msg.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{msg.user}</span>
              <span className="text-xs text-gray-500">{msg.time}</span>
              {msg.type === 'announcement' && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Admin</span>
              )}
            </div>
            {msg.type === 'code' ? (
              <div className="mt-1 bg-gray-900 rounded-lg p-3 overflow-x-auto">
                <pre className="text-sm text-green-400">
                  <code>{msg.content.split('\n').slice(2, -1).join('\n')}</code>
                </pre>
              </div>
            ) : (
              <div className="mt-1 text-gray-800 whitespace-pre-wrap">{msg.content}</div>
            )}
          </div>
          <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
            <button className="p-1 hover:bg-gray-200 rounded">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-100 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === 'chat' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Chat
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === 'tasks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Tasks
          </button>
          <button 
            onClick={() => setActiveTab('files')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === 'files' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Files
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'chat' && (
            <div className="p-2">
              {organizations.map(org => (
                <div key={org.id} className="mb-4">
                  <button 
                    onClick={() => toggleOrg(org.id)}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-gray-900">{org.name}</span>
                    </div>
                    {expandedOrgs.includes(org.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  {expandedOrgs.includes(org.id) && (
                    <div className="ml-4 mt-2 space-y-1">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-1">Channels</div>
                      {org.channels.map(channel => (
                        <button
                          key={channel.id}
                          onClick={() => setSelectedChat(channel.id)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg ${selectedChat === channel.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-200 text-gray-700'}`}
                        >
                          <div className="flex items-center space-x-2">
                            <Hash className="w-4 h-4" />
                            <span className="text-sm">{channel.name}</span>
                          </div>
                          {channel.unread > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] h-5 flex items-center justify-center">
                              {channel.unread}
                            </span>
                          )}
                        </button>
                      ))}
                      
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-1 mt-4">Members</div>
                      {org.members.map(member => (
                        <button
                          key={member.id}
                          className="w-full flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg"
                        >
                          <div className="relative">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                              member.status === 'online' ? 'bg-green-400' : 
                              member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          <div className="text-left">
                            <div className="text-sm text-gray-900">{member.name}</div>
                            <div className="text-xs text-gray-500">{member.role}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="p-4 space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {task.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : task.status === 'in-progress' ? (
                        <Clock className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm font-medium">{task.title}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Assigned to: {task.assignee} • Due: {task.due}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'files' && (
            <div className="p-4 space-y-2">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <Folder className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Project Documents</span>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm">meeting-notes.md</span>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <Image className="w-4 h-4 text-green-500" />
                <span className="text-sm">design-mockup.png</span>
              </div>
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <Code className="w-4 h-4 text-purple-500" />
                <span className="text-sm">component.jsx</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3">
            <Hash className="w-5 h-5 text-gray-400" />
            <div>
              <h2 className="font-semibold text-gray-900">general</h2>
              <p className="text-sm text-gray-500">{organizations[0].members.length} members</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Video className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Users className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-white">
          {messages[selectedChat]?.map(renderMessage)}
          <div ref={messageEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full p-3 border-none resize-none focus:outline-none rounded-lg"
                  rows="1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <div className="flex items-center justify-between px-3 pb-3">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Paperclip className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Code className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <GitBranch className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 bg-gray-50 border-l border-gray-200 p-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Online Now</h3>
            <div className="space-y-2">
              {organizations[0].members
                .filter(member => member.status === 'online')
                .map(member => (
                <div key={member.id} className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Activity</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div>John pushed to main branch</div>
              <div>Sarah updated design docs</div>
              <div>New pull request #123</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm">
                <Calendar className="w-4 h-4 inline mr-2" />
                Schedule Meeting
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm">
                <Plus className="w-4 h-4 inline mr-2" />
                Create Task
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm">
                <GitBranch className="w-4 h-4 inline mr-2" />
                View Repository
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatPlatform;