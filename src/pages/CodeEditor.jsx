import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Folder, 
  FolderOpen, 
  Search, 
  Settings, 
  Play, 
  Square, 
  RotateCcw,
  Save,
  Download,
  Upload,
  GitBranch,
  Users,
  MessageSquare,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Share2,
  Bot
} from 'lucide-react';

const VSCodeEditor = () => {
  const [activeFile, setActiveFile] = useState('index.js');
  const [code, setCode] = useState(`// Welcome to your collaborative code editor!
function hello() {
    console.log("Hello, World!");
    return "Ready to code together!";
}

// AI Assistant is ready to help
class TeamProject {
    constructor(name) {
        this.name = name;
        this.members = [];
        this.meetings = [];
    }
    
    addMember(member) {
        this.members.push(member);
        console.log(\`\${member} joined the team!\`);
    }
    
    startMeeting() {
        console.log("Meeting started for", this.name);
    }
}

const project = new TeamProject("Awesome App");
project.addMember("Developer");
hello();`);

  const [files, setFiles] = useState([
    { name: 'index.js', type: 'file', active: true },
    { name: 'styles.css', type: 'file', active: false },
    { name: 'components', type: 'folder', expanded: true, children: [
      { name: 'Header.jsx', type: 'file', active: false },
      { name: 'Sidebar.jsx', type: 'file', active: false }
    ]},
    { name: 'utils', type: 'folder', expanded: false, children: [
      { name: 'helpers.js', type: 'file', active: false }
    ]},
    { name: 'README.md', type: 'file', active: false }
  ]);

  const [sidebarView, setSidebarView] = useState('files');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('Console ready...\n');
  const [searchTerm, setSearchTerm] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { user: 'System', message: 'Team chat initialized', time: '10:30' },
    { user: 'AI Assistant', message: 'Ready to help with your code!', time: '10:31' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [code]);

  const runCode = () => {
    setIsRunning(true);
    setOutput(prev => prev + '\n> Running code...\n');
    
    setTimeout(() => {
      try {
        // Simulate code execution
        setOutput(prev => prev + 'Hello, World!\nReady to code together!\nDeveloper joined the team!\nMeeting started for Awesome App\n> Execution completed successfully ✓\n');
      } catch (error) {
        setOutput(prev => prev + `Error: ${error.message}\n`);
      }
      setIsRunning(false);
    }, 1500);
  };

  const handleFileClick = (fileName) => {
    setActiveFile(fileName);
    setFiles(prev => prev.map(file => ({
      ...file,
      active: file.name === fileName
    })));
  };

  const toggleFolder = (folderName) => {
    setFiles(prev => prev.map(file => 
      file.name === folderName 
        ? { ...file, expanded: !file.expanded }
        : file
    ));
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const time = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      setChatMessages(prev => [...prev, { 
        user: 'You', 
        message: newMessage, 
        time 
      }]);
      
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          user: 'AI Assistant', 
          message: 'I can help you with that! Would you like me to generate some code?', 
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
      
      setNewMessage('');
    }
  };

  const FileTreeItem = ({ file, level = 0 }) => (
    <div key={file.name}>
      <div 
        className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-700 ${
          file.active ? 'bg-blue-600' : ''
        }`}
        style={{ paddingLeft: `${8 + level * 16}px` }}
        onClick={() => file.type === 'file' ? handleFileClick(file.name) : toggleFolder(file.name)}
      >
        {file.type === 'folder' ? (
          file.expanded ? <FolderOpen size={16} className="mr-2 text-blue-400" /> 
                       : <Folder size={16} className="mr-2 text-blue-400" />
        ) : (
          <FileText size={16} className="mr-2 text-gray-400" />
        )}
        <span className="text-sm">{file.name}</span>
      </div>
      {file.type === 'folder' && file.expanded && file.children && 
        file.children.map(child => (
          <FileTreeItem key={child.name} file={child} level={level + 1} />
        ))
      }
    </div>
  );

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold">CodeCollab Studio</h1>
          <div className="flex items-center space-x-2 text-sm">
            <GitBranch size={16} />
            <span>main</span>
            <span className="text-green-400">● synced</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Meeting Controls */}
          <div className="flex items-center space-x-2 bg-gray-700 rounded-md px-3 py-1">
            <button
              onClick={() => setIsMeetingActive(!isMeetingActive)}
              className={`p-2 rounded ${isMeetingActive ? 'bg-red-600' : 'bg-green-600'} hover:opacity-80`}
            >
              <Video size={16} />
            </button>
            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className={`p-2 rounded ${micEnabled ? 'bg-gray-600' : 'bg-red-600'} hover:opacity-80`}
            >
              {micEnabled ? <Mic size={16} /> : <MicOff size={16} />}
            </button>
            <button
              onClick={() => setVideoEnabled(!videoEnabled)}
              className={`p-2 rounded ${videoEnabled ? 'bg-gray-600' : 'bg-red-600'} hover:opacity-80`}
            >
              {videoEnabled ? <Video size={16} /> : <VideoOff size={16} />}
            </button>
            <Share2 size={16} className="text-blue-400 cursor-pointer hover:text-blue-300" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-green-400" />
            <span className="text-sm">3 online</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Sidebar Navigation */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setSidebarView('files')}
              className={`flex-1 py-3 px-4 text-sm ${sidebarView === 'files' ? 'bg-gray-700 border-b-2 border-blue-500' : 'hover:bg-gray-700'}`}
            >
              <FileText size={16} className="inline mr-2" />
              Files
            </button>
            <button
              onClick={() => setSidebarView('search')}
              className={`flex-1 py-3 px-4 text-sm ${sidebarView === 'search' ? 'bg-gray-700 border-b-2 border-blue-500' : 'hover:bg-gray-700'}`}
            >
              <Search size={16} className="inline mr-2" />
              Search
            </button>
            <button
              onClick={() => setSidebarView('chat')}
              className={`flex-1 py-3 px-4 text-sm ${sidebarView === 'chat' ? 'bg-gray-700 border-b-2 border-blue-500' : 'hover:bg-gray-700'}`}
            >
              <MessageSquare size={16} className="inline mr-2" />
              Chat
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {sidebarView === 'files' && (
              <div className="p-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-300">PROJECT FILES</h3>
                  <div className="flex space-x-1">
                    <Upload size={14} className="cursor-pointer hover:text-blue-400" />
                    <Download size={14} className="cursor-pointer hover:text-blue-400" />
                  </div>
                </div>
                {files.map(file => <FileTreeItem key={file.name} file={file} />)}
              </div>
            )}

            {sidebarView === 'search' && (
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Search in files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
                <div className="mt-4 text-sm text-gray-400">
                  {searchTerm ? `Searching for "${searchTerm}"...` : 'Enter search term'}
                </div>
              </div>
            )}

            {sidebarView === 'chat' && (
              <div className="p-4 flex flex-col h-full">
                <div className="flex-1 bg-gray-700 rounded p-3 mb-4 overflow-y-auto max-h-64">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span className={msg.user === 'AI Assistant' ? 'text-blue-400' : 'text-green-400'}>
                          {msg.user}
                        </span>
                        <span>{msg.time}</span>
                      </div>
                      <div className="text-sm mt-1">{msg.message}</div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm"
                  >
                    Send
                  </button>
                </div>
                <button className="mt-2 flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded text-sm">
                  <Bot size={16} />
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* File Tabs */}
          <div className="bg-gray-800 border-b border-gray-700 flex items-center px-4 py-2">
            <div className="flex space-x-2">
              <div className="bg-gray-700 px-3 py-1 rounded-t text-sm flex items-center space-x-2">
                <FileText size={14} />
                <span>{activeFile}</span>
                <span className="cursor-pointer hover:text-red-400">×</span>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <Save size={16} className="cursor-pointer hover:text-green-400" title="Save" />
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-3 py-1 rounded text-sm"
              >
                {isRunning ? <Square size={14} /> : <Play size={14} />}
                <span>{isRunning ? 'Stop' : 'Run'}</span>
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 flex">
            <div className="flex-1 relative">
              <div className="absolute inset-0 flex">
                {/* Line Numbers */}
                <div className="bg-gray-800 text-gray-500 text-sm font-mono p-4 pr-2 select-none">
                  {code.split('\n').map((_, index) => (
                    <div key={index} className="leading-6">
                      {index + 1}
                    </div>
                  ))}
                </div>
                
                {/* Code Editor */}
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 bg-gray-900 text-white font-mono text-sm p-4 resize-none focus:outline-none leading-6"
                  style={{ minHeight: '100%' }}
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Output Panel */}
            <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
              <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-semibold">Output</span>
                <div className="flex space-x-2">
                  <RotateCcw 
                    size={16} 
                    className="cursor-pointer hover:text-blue-400"
                    onClick={() => setOutput('Console ready...\n')}
                  />
                </div>
              </div>
              <div className="flex-1 bg-black p-4 font-mono text-sm overflow-y-auto">
                <pre className="whitespace-pre-wrap text-green-400">{output}</pre>
                {isRunning && (
                  <div className="text-yellow-400 animate-pulse">Executing...</div>
                )}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-blue-600 text-white px-4 py-1 text-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span>JavaScript</span>
              <span>UTF-8</span>
              <span>Ln 1, Col 1</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-300">● Live Share Active</span>
              <span>3 collaborators</span>
              <GitBranch size={14} className="inline mr-1" />
              <span>main</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSCodeEditor;