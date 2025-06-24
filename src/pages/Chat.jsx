import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Code, Smile, MoreVertical, Search, Phone, Video, Info, Hash, Settings, UserPlus, Pin, Archive, Star, Trash2, Download, Copy, Edit3, FileText, Image, Zap } from 'lucide-react';

const IndividualChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      content: 'Hey! How are you doing with the new project setup?',
      timestamp: '10:30 AM',
      type: 'text',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      role: 'Senior Developer'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Going well! Just finished setting up the authentication system. Check out this middleware:',
      timestamp: '10:32 AM',
      type: 'text',
      isOwn: true
    },
    {
      id: 3,
      sender: 'You',
      content: `const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};`,
      timestamp: '10:32 AM',
      type: 'code',
      language: 'javascript',
      fileName: 'authMiddleware.js',
      isOwn: true
    },
    {
      id: 4,
      sender: 'John Doe',
      content: 'Perfect! That looks solid. The error handling is clean too. 🚀',
      timestamp: '10:35 AM',
      type: 'text',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      role: 'Senior Developer'
    },
    {
      id: 5,
      sender: 'John Doe',
      content: null,
      timestamp: '10:36 AM',
      type: 'file',
      fileName: 'project-architecture.pdf',
      fileSize: '2.4 MB',
      fileType: 'pdf',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      role: 'Senior Developer'
    },
    {
      id: 6,
      sender: 'You',
      content: 'Thanks! I\'ll review the architecture doc. Should we schedule a code review session?',
      timestamp: '10:38 AM',
      type: 'text',
      isOwn: true
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState('');
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [codeContent, setCodeContent] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [codeFileName, setCodeFileName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        content: currentMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage('');
    }
  };

  const sendCodeSnippet = () => {
    if (codeContent.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        content: codeContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'code',
        language: codeLanguage,
        fileName: codeFileName || `code.${codeLanguage === 'javascript' ? 'js' : codeLanguage}`,
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setCodeContent('');
      setCodeFileName('');
      setShowCodeEditor(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0] || 'file';
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        content: null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'file',
        fileName: file.name,
        fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        fileType: fileType,
        isOwn: true
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getFileIcon = (fileType, fileName) => {
    if (fileType === 'image') return <Image size={20} className="text-green-400" />;
    if (fileName?.endsWith('.pdf')) return <FileText size={20} className="text-red-400" />;
    if (fileName?.match(/\.(js|ts|jsx|tsx)$/)) return <Code size={20} className="text-yellow-400" />;
    if (fileName?.match(/\.(py|pyw)$/)) return <Code size={20} className="text-blue-400" />;
    return <FileText size={20} className="text-gray-400" />;
  };

  const getLanguageColor = (language) => {
    const colors = {
      javascript: 'text-yellow-400',
      typescript: 'text-blue-400',
      python: 'text-green-400',
      java: 'text-orange-400',
      cpp: 'text-blue-500',
      html: 'text-orange-500',
      css: 'text-blue-300',
      json: 'text-yellow-300'
    };
    return colors[language] || 'text-gray-400';
  };

  const filteredMessages = messages.filter(message =>
    message.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.fileName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-6 group hover:bg-gray-800/30 px-4 py-2 rounded-lg transition-colors`}>
      {!message.isOwn && (
        <img 
          src={message.avatar} 
          alt={message.sender}
          className="w-10 h-10 rounded-full mr-4 mt-1 ring-2 ring-gray-600"
        />
      )}
      <div className={`max-w-lg ${message.isOwn ? 'order-1' : 'order-2'}`}>
        {!message.isOwn && (
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-white font-semibold text-sm">{message.sender}</span>
            {message.role && <span className="text-blue-400 text-xs bg-blue-500/20 px-2 py-0.5 rounded">{message.role}</span>}
            <span className="text-gray-500 text-xs">{message.timestamp}</span>
          </div>
        )}
        
        <div className={`${message.isOwn ? 'bg-indigo-600' : 'bg-gray-700'} rounded-lg overflow-hidden`}>
          {message.type === 'text' && (
            <div className="px-4 py-3">
              <p className="text-gray-100 break-words leading-relaxed">{message.content}</p>
            </div>
          )}
          
          {message.type === 'code' && (
            <div className="bg-gray-900 border border-gray-700">
              <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Code size={16} className={getLanguageColor(message.language)} />
                  <span className="text-gray-300 text-sm font-mono">{message.fileName}</span>
                  <span className={`text-xs uppercase ${getLanguageColor(message.language)}`}>{message.language}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700">
                    <Copy size={14} />
                  </button>
                  <button className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700">
                    <Download size={14} />
                  </button>
                </div>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-gray-100 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  <code>{message.content}</code>
                </pre>
              </div>
            </div>
          )}
          
          {message.type === 'file' && (
            <div className="p-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg border border-gray-600">
                <div className="p-2 bg-gray-700 rounded-lg">
                  {getFileIcon(message.fileType, message.fileName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-100 text-sm truncate">{message.fileName}</p>
                  <p className="text-xs text-gray-400">{message.fileSize}</p>
                </div>
                <button className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-600 transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {message.isOwn && (
          <div className="flex items-center justify-end mt-1 space-x-2">
            <span className="text-gray-500 text-xs">{message.timestamp}</span>
          </div>
        )}
        
        <div className={`opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 mt-1 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
          <button className="text-gray-500 hover:text-gray-300 p-1 rounded hover:bg-gray-700">
            <Star size={12} />
          </button>
          <button className="text-gray-500 hover:text-gray-300 p-1 rounded hover:bg-gray-700">
            <Pin size={12} />
          </button>
          <button className="text-gray-500 hover:text-gray-300 p-1 rounded hover:bg-gray-700">
            <MoreVertical size={12} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-4">
            <Hash size={24} className="text-gray-400" />
            <div className="flex items-center space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="John Doe"
                className="w-10 h-10 rounded-full ring-2 ring-green-500"
              />
              <div>
                <h2 className="font-semibold text-white flex items-center space-x-2">
                  <span>John Doe</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </h2>
                <p className="text-sm text-gray-400">Senior Developer • Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 rounded-lg transition-colors ${showSearch ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
            >
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors">
              <Phone size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors">
              <Video size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors">
              <UserPlus size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {(searchQuery ? filteredMessages : messages).map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-gray-500 text-sm">John is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Code Editor Modal */}
        {showCodeEditor && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <Code size={24} className="text-indigo-400" />
                  <h3 className="text-xl font-semibold text-white">Share Code Snippet</h3>
                </div>
                <button 
                  onClick={() => setShowCodeEditor(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                    <select 
                      value={codeLanguage}
                      onChange={(e) => setCodeLanguage(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="json">JSON</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">File Name (Optional)</label>
                    <input
                      type="text"
                      value={codeFileName}
                      onChange={(e) => setCodeFileName(e.target.value)}
                      placeholder={`code.${codeLanguage === 'javascript' ? 'js' : codeLanguage}`}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Code</label>
                  <textarea
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    placeholder="Enter your code here..."
                    className="w-full h-80 p-4 bg-gray-900 border border-gray-600 rounded-lg font-mono text-sm text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 scrollbar-thin scrollbar-thumb-gray-600"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
                <button 
                  onClick={() => setShowCodeEditor(false)}
                  className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={sendCodeSnippet}
                  disabled={!codeContent.trim()}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <Zap size={16} />
                  <span>Send Code</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <button 
                  onClick={() => setShowCodeEditor(true)}
                  className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-gray-700 rounded-lg transition-colors group"
                  title="Share code snippet"
                >
                  <Code size={20} />
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Upload file"
                >
                  <Paperclip size={20} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-700 rounded-lg transition-colors">
                  <Smile size={20} />
                </button>
              </div>
              
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Message John Doe..."
                    rows="1"
                    className="w-full resize-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent scrollbar-thin scrollbar-thumb-gray-600"
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim()}
                  className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualChatPage;