import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Code, Smile, MoreVertical, Search, Phone, Video, Info, Hash, Settings, UserPlus, Pin, Archive, Star, Trash2, Download, Copy, Edit3, FileText, Image, Zap, ChevronDown, MessageSquare, Github, Users } from 'lucide-react';

const DiscordStyleChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Bob',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timestamp: '10:24 AM',
      type: 'text',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Okay, I\'ll send them',
      timestamp: '10:28 AM',
      type: 'text',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Bob',
      content: 'Here are the files that you requested.',
      timestamp: '10:29 AM',
      type: 'text',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      sender: 'Bob',
      content: 'print("Hello, world!")',
      timestamp: '10:30 AM',
      type: 'code',
      language: 'python',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 5,
      sender: 'Bob',
      content: 'Certainly! Here\'s a Python function to write data to a file:\n\ndef write_to_file(filename, data):',
      timestamp: '10:31 AM',
      type: 'text',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
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
  const [selectedSection, setSelectedSection] = useState('Individual');
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const MessageComponent = ({ message, showAvatar = true, isFirstInGroup = false }) => (
    <div className={`px-4 py-1 hover:bg-gray-800/50 group ${isFirstInGroup ? 'mt-4' : ''}`}>
      <div className="flex items-start space-x-3">
        {showAvatar ? (
          <img 
            src={message.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'} 
            alt={message.sender}
            className="w-10 h-10 rounded-full mt-1"
          />
        ) : (
          <div className="w-10 flex justify-center">
            <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 font-mono">
              {message.timestamp}
            </span>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {showAvatar && (
            <div className="flex items-baseline space-x-2 mb-1">
              <span className="font-semibold text-white text-sm">{message.sender}</span>
              <span className="text-xs text-gray-500 font-mono">{message.timestamp}</span>
            </div>
          )}
          
          {message.type === 'text' && (
            <div className="text-gray-200 text-sm leading-relaxed break-words">
              {message.content}
            </div>
          )}
          
          {message.type === 'code' && (
            <div className="bg-gray-900 border border-gray-700 rounded-lg mt-2 overflow-hidden">
              <div className="px-3 py-2 bg-gray-800 border-b border-gray-700 text-xs text-gray-400 font-mono">
                {message.language}
              </div>
              <div className="p-3">
                <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
                  <code>{message.content}</code>
                </pre>
              </div>
            </div>
          )}
          
          {message.type === 'file' && (
            <div className="mt-2">
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg border border-gray-600 max-w-sm">
                <div className="p-2 bg-gray-700 rounded">
                  <FileText size={16} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-100 text-sm truncate">{message.fileName}</p>
                  <p className="text-xs text-gray-400">{message.fileSize}</p>
                </div>
                <button className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-600">
                  <Download size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const SidebarSection = ({ title, icon: Icon, items, isExpandable = true }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    
    return (
      <div className="mb-6">
        <div 
          className={`flex items-center justify-between px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-300 ${isExpandable ? '' : 'cursor-default'}`}
          onClick={isExpandable ? () => setIsExpanded(!isExpanded) : undefined}
        >
          <span>{title}</span>
          {isExpandable && (
            <ChevronDown size={12} className={`transform transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
          )}
        </div>
        {isExpanded && (
          <div className="mt-2 space-y-1">
            {items.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-3 px-2 py-1.5 text-sm rounded cursor-pointer transition-colors ${
                  item.active ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-gray-200'
                }`}
                onClick={() => setSelectedSection(item.name)}
              >
                {item.icon && <item.icon size={16} className="text-gray-400" />}
                <span className="truncate">{item.name}</span>
                {item.status && (
                  <div className={`w-2 h-2 rounded-full ${item.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const groupedMessages = messages.reduce((groups, message, index) => {
    const prevMessage = messages[index - 1];
    const shouldGroup = prevMessage && 
                       prevMessage.sender === message.sender && 
                       prevMessage.isOwn === message.isOwn &&
                       (new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime()) < 300000; // 5 minutes
    
    if (shouldGroup) {
      groups[groups.length - 1].messages.push(message);
    } else {
      groups.push({
        sender: message.sender,
        isOwn: message.isOwn,
        avatar: message.avatar,
        messages: [message]
      });
    }
    return groups;
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Left Sidebar */}
      <div className="w-60 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-white font-semibold">Individual</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <SidebarSection
            title="Organization"
            items={[]}
            isExpandable={true}
          />
          
          <SidebarSection
            title=""
            items={[
              { name: 'Chat', icon: MessageSquare, active: true },
              { name: 'Code Editor', icon: Code },
              { name: 'GitHub', icon: Github }
            ]}
            isExpandable={false}
          />
          
          <SidebarSection
            title="Direct Messages"
            items={[
              { name: 'Alice', status: 'online' },
              { name: 'Bob', status: 'online' }
            ]}
          />
          
          <SidebarSection
            title="AI Groups"
            items={[
              { name: 'Dev Team', icon: Hash }
            ]}
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Hash size={20} className="text-gray-400" />
            <h2 className="font-semibold text-white">Bob</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 rounded transition-colors ${showSearch ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
            >
              <Search size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors">
              <Phone size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors">
              <Video size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.messages.map((message, messageIndex) => (
                <MessageComponent 
                  key={message.id} 
                  message={message} 
                  showAvatar={messageIndex === 0}
                  isFirstInGroup={groupIndex === 0 || messageIndex === 0}
                />
              ))}
            </div>
          ))}
          {isTyping && (
            <div className="px-4 py-2 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-gray-500 text-xs italic">Bob is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Code Editor Modal */}
        {showCodeEditor && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Code size={20} className="text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Share Code Snippet</h3>
                </div>
                <button 
                  onClick={() => setShowCodeEditor(false)}
                  className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                    <select 
                      value={codeLanguage}
                      onChange={(e) => setCodeLanguage(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Code</label>
                  <textarea
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    placeholder="Enter your code here..."
                    className="w-full h-64 p-3 bg-gray-900 border border-gray-600 rounded font-mono text-sm text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-4 border-t border-gray-700">
                <button 
                  onClick={() => setShowCodeEditor(false)}
                  className="px-4 py-2 text-gray-300 border border-gray-600 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button 
                  onClick={sendCodeSnippet}
                  disabled={!codeContent.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Zap size={16} />
                  <span>Send Code</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-gray-800 border-t border-gray-700 p-4">
          <div className="flex items-end space-x-3">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors"
            >
              <Paperclip size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Bob..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button 
              onClick={() => setShowCodeEditor(true)}
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded transition-colors"
              title="Share code snippet"
            >
              <Code size={20} />
            </button>
            
            <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-700 rounded transition-colors">
              <Smile size={20} />
            </button>
            
            <button
              onClick={sendMessage}
              disabled={!currentMessage.trim()}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordStyleChat;