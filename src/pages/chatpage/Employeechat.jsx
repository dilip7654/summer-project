import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  Settings, 
  Search, 
  Hash, 
  Users, 
  Lock, 
  Bell, 
  Pin,
  Code,
  FileText,
  Calendar,
  CheckSquare,
  MoreHorizontal,
  Star,
  MessageCircle,
  Folder,
  GitBranch,
  Play,
  User,
  ChevronDown,
  ChevronRight,
  X,
  Maximize2,
  Minimize2
} from 'lucide-react';

const EmployeeChatPage = () => {
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [expandedSections, setExpandedSections] = useState({
    channels: true,
    dms: true,
    projects: true,
    tasks: true
  });
  const [isCodeEditorOpen, setIsCodeEditorOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const messageInputRef = useRef(null);

  const channels = [
    { id: 'general', name: 'general', type: 'public', unread: 0 },
    { id: 'development', name: 'development', type: 'public', unread: 3 },
    { id: 'design', name: 'design', type: 'public', unread: 0 },
    { id: 'project-alpha', name: 'project-alpha', type: 'private', unread: 1 },
    { id: 'standup', name: 'daily-standup', type: 'public', unread: 0 }
  ];

  const directMessages = [
    { id: 'john', name: 'John Smith', status: 'online', unread: 2 },
    { id: 'sarah', name: 'Sarah Wilson', status: 'away', unread: 0 },
    { id: 'mike', name: 'Mike Johnson', status: 'busy', unread: 1 },
    { id: 'admin', name: 'Admin Team', status: 'online', unread: 0 }
  ];

  const projects = [
    { id: 'web-app', name: 'Web Application', status: 'active', members: 5 },
    { id: 'mobile-app', name: 'Mobile App', status: 'review', members: 3 },
    { id: 'api-service', name: 'API Service', status: 'planning', members: 7 }
  ];

  const tasks = [
    { id: 1, title: 'Implement user authentication', priority: 'high', dueDate: '2025-07-05', status: 'in-progress' },
    { id: 2, title: 'Design database schema', priority: 'medium', dueDate: '2025-07-07', status: 'todo' },
    { id: 3, title: 'Code review for API endpoints', priority: 'low', dueDate: '2025-07-10', status: 'todo' }
  ];

  const messages = [
    {
      id: 1,
      sender: 'John Smith',
      avatar: '👨‍💻',
      message: 'Hey team! I just pushed the latest changes to the authentication module.',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      avatar: '👩‍🎨',
      message: 'Great work! I\'ve updated the UI designs accordingly.',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      avatar: '👨‍💼',
      message: 'Here\'s the code snippet for the login validation:',
      timestamp: '10:35 AM',
      type: 'code',
      code: `const validateLogin = (email, password) => {
  if (!email || !password) {
    return { valid: false, error: 'Email and password required' };
  }
  
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  return { valid: true };
};`
    },
    {
      id: 4,
      sender: 'You',
      avatar: '👤',
      message: 'Thanks Mike! This looks perfect. I\'ll integrate it now.',
      timestamp: '10:38 AM',
      type: 'text'
    }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const StatusIndicator = ({ status }) => {
    const colors = {
      online: 'bg-green-400',
      away: 'bg-yellow-400',
      busy: 'bg-red-400',
      offline: 'bg-gray-400'
    };
    return <div className={`w-3 h-3 rounded-full ${colors[status]} border-2 border-white`} />;
  };

  const PriorityBadge = ({ priority }) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colors[priority]}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-white">DevTeam Workspace</h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
            {[
              { id: 'chat', icon: MessageCircle, label: 'Chat' },
              { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
              { id: 'files', icon: Folder, label: 'Files' },
              { id: 'code', icon: Code, label: 'Code' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'chat' && (
            <div className="p-4 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Channels */}
              <div>
                <button
                  onClick={() => toggleSection('channels')}
                  className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white mb-2"
                >
                  <div className="flex items-center space-x-2">
                    {expandedSections.channels ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <span className="text-sm font-medium">CHANNELS</span>
                  </div>
                </button>
                
                {expandedSections.channels && (
                  <div className="space-y-1 ml-4">
                    {channels.map(channel => (
                      <button
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel.id)}
                        className={`flex items-center justify-between w-full p-2 rounded-lg text-left transition-colors ${
                          selectedChannel === channel.id ? 'bg-blue-600' : 'hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {channel.type === 'private' ? <Lock className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
                          <span className="text-sm">{channel.name}</span>
                        </div>
                        {channel.unread > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {channel.unread}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Messages */}
              <div>
                <button
                  onClick={() => toggleSection('dms')}
                  className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white mb-2"
                >
                  <div className="flex items-center space-x-2">
                    {expandedSections.dms ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <span className="text-sm font-medium">DIRECT MESSAGES</span>
                  </div>
                </button>
                
                {expandedSections.dms && (
                  <div className="space-y-1 ml-4">
                    {directMessages.map(dm => (
                      <button
                        key={dm.id}
                        onClick={() => setSelectedChannel(dm.id)}
                        className={`flex items-center justify-between w-full p-2 rounded-lg text-left transition-colors ${
                          selectedChannel === dm.id ? 'bg-blue-600' : 'hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <User className="w-4 h-4" />
                            <div className="absolute -bottom-1 -right-1">
                              <StatusIndicator status={dm.status} />
                            </div>
                          </div>
                          <span className="text-sm">{dm.name}</span>
                        </div>
                        {dm.unread > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {dm.unread}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Projects */}
              <div>
                <button
                  onClick={() => toggleSection('projects')}
                  className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white mb-2"
                >
                  <div className="flex items-center space-x-2">
                    {expandedSections.projects ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <span className="text-sm font-medium">PROJECTS</span>
                  </div>
                </button>
                
                {expandedSections.projects && (
                  <div className="space-y-1 ml-4">
                    {projects.map(project => (
                      <button
                        key={project.id}
                        onClick={() => setSelectedChannel(project.id)}
                        className={`flex items-center justify-between w-full p-2 rounded-lg text-left transition-colors ${
                          selectedChannel === project.id ? 'bg-blue-600' : 'hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Folder className="w-4 h-4" />
                          <div>
                            <div className="text-sm">{project.name}</div>
                            <div className="text-xs text-gray-400">{project.members} members</div>
                          </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          project.status === 'active' ? 'bg-green-400' :
                          project.status === 'review' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">My Tasks</h3>
                <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
              </div>
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="p-3 bg-gray-700 rounded-lg border border-gray-600 hover:border-gray-500 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-white">{task.title}</h4>
                    <PriorityBadge priority={task.priority} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Due: {task.dueDate}</span>
                    <span className={`px-2 py-1 rounded ${
                      task.status === 'in-progress' ? 'bg-blue-900 text-blue-300' :
                      task.status === 'todo' ? 'bg-gray-600 text-gray-300' : 'bg-green-900 text-green-300'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'files' && (
            <div className="p-4">
              <h3 className="text-lg font-medium mb-4">Recent Files</h3>
              <div className="space-y-2">
                {['README.md', 'package.json', 'app.js', 'styles.css'].map(file => (
                  <div key={file} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Code Editor</h3>
                <button
                  onClick={() => setIsCodeEditorOpen(!isCodeEditorOpen)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  {isCodeEditorOpen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
              <div className="space-y-2">
                <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-700 rounded-lg text-left">
                  <GitBranch className="w-4 h-4 text-green-400" />
                  <span className="text-sm">main branch</span>
                </button>
                <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-700 rounded-lg text-left">
                  <Play className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Run Code</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">YO</span>
              </div>
              <StatusIndicator status="online" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Your Name</div>
              <div className="text-xs text-gray-400">Employee</div>
            </div>
            <button className="p-1 hover:bg-gray-700 rounded">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Hash className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-medium">{selectedChannel}</h2>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <Users className="w-4 h-4" />
                <span>12 members</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                <Video className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                <Pin className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                <Users className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="flex items-start space-x-3 hover:bg-gray-800 p-2 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm">{msg.sender}</span>
                  <span className="text-xs text-gray-400">{msg.timestamp}</span>
                </div>
                {msg.type === 'code' ? (
                  <div>
                    <p className="text-sm text-gray-300 mb-2">{msg.message}</p>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 overflow-x-auto">
                      <pre className="text-sm text-green-400">
                        <code>{msg.code}</code>
                      </pre>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-300">{msg.message}</p>
                )}
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex items-end space-x-3">
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                ref={messageInputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Message #${selectedChannel}`}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <Code className="w-5 h-5" />
            </button>
            <button 
              className="p-2 hover:bg-gray-700 rounded-lg"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="w-5 h-5" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Formatting Options */}
          <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>•</span>
            <button className="hover:text-white">Format with Markdown</button>
            <span>•</span>
            <button className="hover:text-white">Code snippets</button>
          </div>
        </div>
      </div>

      {/* Code Editor Modal */}
      {isCodeEditorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg w-4/5 h-4/5 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium">Code Editor</h3>
              <button
                onClick={() => setIsCodeEditorOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 p-4">
              <textarea
                className="w-full h-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-white font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                placeholder="// Start coding here..."
                style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
              />
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-between">
              <div className="flex items-center space-x-2">
                <select className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm">
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C++</option>
                </select>
                <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm">
                  Run Code
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                  Share Snippet
                </button>
                <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeChatPage;