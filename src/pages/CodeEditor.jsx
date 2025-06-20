import React, { useState, useRef, useEffect } from 'react';
import { 
  File, 
  Folder, 
  FolderOpen, 
  Plus, 
  X, 
  Save, 
  Play, 
  Search,
  Settings,
  ChevronRight,
  ChevronDown,
  FileText,
  Code,
  Palette,
  Globe,
  Image,
  Package,
  GitBranch,
  Bug,
  BookOpen,
  Archive,
  Monitor,
  MoreHorizontal,
  Trash2,
  Edit3,
  Copy,
  FolderPlus,
  FilePlus
} from 'lucide-react';

const CodeEditor = () => {
  const [activeView, setActiveView] = useState('explorer');
  const [files, setFiles] = useState([
    { 
      id: '1', 
      name: 'index.js', 
      path: 'src/index.js',
      content: `// Welcome to the VS Code-like Editor
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`, 
      type: 'javascript', 
      isOpen: true,
      isModified: false,
      folder: 'src'
    },
    { 
      id: '2', 
      name: 'App.js', 
      path: 'src/App.js',
      content: `import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Counter App</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </header>
    </div>
  );
}

export default App;`, 
      type: 'javascript', 
      isOpen: false,
      isModified: false,
      folder: 'src'
    },
    { 
      id: '3', 
      name: 'App.css', 
      path: 'src/App.css',
      content: `.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}

button {
  background-color: #61dafb;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #4fa8c5;
}`, 
      type: 'css', 
      isOpen: false,
      isModified: false,
      folder: 'src'
    },
    { 
      id: '4', 
      name: 'package.json', 
      path: 'package.json',
      content: `{
  "name": "my-react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`, 
      type: 'json', 
      isOpen: false,
      isModified: false,
      folder: 'root'
    },
    { 
      id: '5', 
      name: 'README.md', 
      path: 'README.md',
      content: `# My React App

This is a sample React application created with Create React App.

## Available Scripts

In the project directory, you can run:

### \`npm start\`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### \`npm test\`

Launches the test runner in the interactive watch mode.

### \`npm run build\`

Builds the app for production to the \`build\` folder.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).`, 
      type: 'markdown', 
      isOpen: false,
      isModified: false,
      folder: 'root'
    }
  ]);
  
  const [folders, setFolders] = useState({
    'src': { name: 'src', isOpen: true, parent: null },
    'public': { name: 'public', isOpen: false, parent: null },
    'node_modules': { name: 'node_modules', isOpen: false, parent: null }
  });
  
  const [activeFileId, setActiveFileId] = useState('1');
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const textareaRef = useRef(null);

  const activeFile = files.find(f => f.id === activeFileId);
  const openFiles = files.filter(f => f.isOpen);

  const sidebarViews = {
    explorer: { icon: File, label: 'Explorer' },
    search: { icon: Search, label: 'Search' },
    git: { icon: GitBranch, label: 'Source Control' },
    debug: { icon: Bug, label: 'Run and Debug' },
    extensions: { icon: Archive, label: 'Extensions' }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        setSidebarWidth(Math.max(200, Math.min(500, e.clientX)));
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    const handleClickOutside = () => {
      setContextMenu(null);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isResizing]);

  const updateFileContent = (content) => {
    setFiles(prev => prev.map(f => 
      f.id === activeFileId ? { ...f, content, isModified: true } : f
    ));
  };

  const openFile = (fileId) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, isOpen: true } : f
    ));
    setActiveFileId(fileId);
  };

  const closeFile = (fileId, e) => {
    e.stopPropagation();
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, isOpen: false } : f
    ));
    
    if (fileId === activeFileId) {
      const remainingOpen = files.filter(f => f.isOpen && f.id !== fileId);
      if (remainingOpen.length > 0) {
        setActiveFileId(remainingOpen[0].id);
      }
    }
  };

  const toggleFolder = (folderName) => {
    setFolders(prev => ({
      ...prev,
      [folderName]: { ...prev[folderName], isOpen: !prev[folderName].isOpen }
    }));
  };

  const createNewFile = (folder = 'src') => {
    const newId = Date.now().toString();
    const fileName = `untitled-${newId}.js`;
    const newFile = {
      id: newId,
      name: fileName,
      path: folder === 'root' ? fileName : `${folder}/${fileName}`,
      content: '// New file\n',
      type: 'javascript',
      isOpen: true,
      isModified: true,
      folder
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newId);
  };

  const createNewFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      setFolders(prev => ({
        ...prev,
        [folderName]: { name: folderName, isOpen: true, parent: null }
      }));
    }
  };

  const handleRightClick = (e, item, type) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item,
      type
    });
  };

  const getFileIcon = (type, name) => {
    if (name.endsWith('.js') || name.endsWith('.jsx')) return <Code size={16} className="text-yellow-400" />;
    if (name.endsWith('.css')) return <Palette size={16} className="text-blue-400" />;
    if (name.endsWith('.html')) return <Globe size={16} className="text-orange-400" />;
    if (name.endsWith('.json')) return <Settings size={16} className="text-green-400" />;
    if (name.endsWith('.md')) return <BookOpen size={16} className="text-gray-400" />;
    if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.svg')) return <Image size={16} className="text-purple-400" />;
    return <FileText size={16} className="text-gray-400" />;
  };

  const getFolderIcon = (folderName, isOpen) => {
    const iconClass = "text-blue-400";
    if (folderName === 'node_modules') return <Package size={16} className={iconClass} />;
    if (folderName === 'public') return <Globe size={16} className={iconClass} />;
    return isOpen ? <FolderOpen size={16} className={iconClass} /> : <Folder size={16} className={iconClass} />;
  };

  const highlightSyntax = (code, type) => {
    if (type === 'javascript') {
      return code
        .replace(/\b(function|const|let|var|if|else|for|while|return|import|export|from|class|extends|async|await|try|catch|finally)\b/g, '<span style="color: #569cd6">$1</span>')
        .replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #569cd6">$1</span>')
        .replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span style="color: #ce9178">$1$2$1</span>')
        .replace(/(\/\/.*$)/gm, '<span style="color: #6a9955">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #6a9955">$1</span>');
    } else if (type === 'css') {
      return code
        .replace(/([a-zA-Z-]+)(?=\s*:)/g, '<span style="color: #9cdcfe">$1</span>')
        .replace(/(#[0-9a-fA-F]{3,6}|rgb\([^)]*\)|rgba\([^)]*\))/g, '<span style="color: #ce9178">$1</span>')
        .replace(/(\{|\})/g, '<span style="color: #ffd700">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #6a9955">$1</span>');
    } else if (type === 'json') {
      return code
        .replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<span style="color: #9cdcfe">$1</span>:')
        .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span style="color: #ce9178">$1</span>')
        .replace(/:\s*(\d+)/g, ': <span style="color: #b5cea8">$1</span>')
        .replace(/:\s*(true|false|null)/g, ': <span style="color: #569cd6">$1</span>');
    }
    return code;
  };

  const renderExplorerView = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">MY-REACT-APP</span>
          <div className="flex space-x-1">
            <FilePlus 
              size={16} 
              className="text-gray-400 hover:text-white cursor-pointer p-1 hover:bg-gray-600 rounded"
              onClick={() => createNewFile('src')}
              title="New File"
            />
            <FolderPlus 
              size={16} 
              className="text-gray-400 hover:text-white cursor-pointer p-1 hover:bg-gray-600 rounded"
              onClick={createNewFolder}
              title="New Folder"
            />
          </div>
        </div>
        
        {/* Root files */}
        {files.filter(f => f.folder === 'root').map(file => (
          <div
            key={file.id}
            className={`flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer rounded text-sm ${
              file.id === activeFileId ? 'bg-gray-700' : ''
            }`}
            onClick={() => openFile(file.id)}
            onContextMenu={(e) => handleRightClick(e, file, 'file')}
          >
            {getFileIcon(file.type, file.name)}
            <span className="ml-2 flex-1">{file.name}</span>
            {file.isModified && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </div>
        ))}

        {/* Folders */}
        {Object.entries(folders).map(([folderName, folder]) => (
          <div key={folderName}>
            <div 
              className="flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer rounded text-sm"
              onClick={() => toggleFolder(folderName)}
              onContextMenu={(e) => handleRightClick(e, folder, 'folder')}
            >
              {folder.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              {getFolderIcon(folderName, folder.isOpen)}
              <span className="ml-2">{folderName}</span>
            </div>
            
            {folder.isOpen && (
              <div className="ml-6 mt-1">
                {files.filter(f => f.folder === folderName).map(file => (
                  <div
                    key={file.id}
                    className={`flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer rounded text-sm ${
                      file.id === activeFileId ? 'bg-gray-700' : ''
                    }`}
                    onClick={() => openFile(file.id)}
                    onContextMenu={(e) => handleRightClick(e, file, 'file')}
                  >
                    {getFileIcon(file.type, file.name)}
                    <span className="ml-2 flex-1">{file.name}</span>
                    {file.isModified && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSearchView = () => (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
      />
      <div className="mt-4 text-sm text-gray-400">
        {searchTerm ? `Searching for "${searchTerm}"...` : 'Search across files'}
      </div>
    </div>
  );

  const renderGitView = () => (
    <div className="p-4">
      <div className="text-sm text-gray-400 mb-4">Source Control</div>
      <div className="space-y-2">
        <div className="text-xs text-gray-500">Changes</div>
        {files.filter(f => f.isModified).map(file => (
          <div key={file.id} className="flex items-center text-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-orange-300">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSidebarContent = () => {
    switch(activeView) {
      case 'explorer': return renderExplorerView();
      case 'search': return renderSearchView();
      case 'git': return renderGitView();
      default: return renderExplorerView();
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-mono text-sm">
      {/* Activity Bar */}
      <div className="w-12 bg-gray-800 flex flex-col items-center py-4 space-y-6">
        {Object.entries(sidebarViews).map(([key, view]) => {
          const IconComponent = view.icon;
          return (
            <div
              key={key}
              className={`p-2 rounded cursor-pointer transition-colors ${
                activeView === key ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveView(key)}
              title={view.label}
            >
              <IconComponent size={20} />
            </div>
          );
        })}
      </div>

      {/* Sidebar */}
      <div 
        className="bg-gray-800 flex flex-col relative"
        style={{ width: sidebarWidth }}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
              {sidebarViews[activeView].label}
            </span>
            <MoreHorizontal size={16} className="text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>

        {renderSidebarContent()}

        {/* Resize Handle */}
        <div
          className="absolute right-0 top-0 w-1 h-full bg-transparent hover:bg-blue-500 cursor-col-resize"
          onMouseDown={() => setIsResizing(true)}
        />
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Tab Bar */}
        <div className="bg-gray-800 border-b border-gray-700 flex overflow-x-auto">
          {openFiles.map(file => (
            <div
              key={file.id}
              className={`flex items-center px-4 py-2 border-r border-gray-700 cursor-pointer min-w-0 ${
                file.id === activeFileId ? 'bg-gray-900 text-white' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              onClick={() => setActiveFileId(file.id)}
            >
              {getFileIcon(file.type, file.name)}
              <span className="ml-2 text-sm truncate">{file.name}</span>
              {file.isModified && <div className="w-2 h-2 bg-white rounded-full ml-2"></div>}
              <X 
                size={14} 
                className="ml-2 hover:bg-gray-600 rounded p-0.5 cursor-pointer flex-shrink-0"
                onClick={(e) => closeFile(file.id, e)}
              />
            </div>
          ))}
        </div>

        {/* Editor Content */}
        <div className="flex-1 flex">
          {activeFile ? (
            <div className="flex-1 relative">
              {/* Line Numbers */}
              <div className="absolute left-0 top-0 bg-gray-850 text-gray-500 text-right pr-4 pl-2 py-4 select-none z-10 border-r border-gray-700">
                {activeFile.content.split('\n').map((_, i) => (
                  <div key={i} className="h-6 leading-6 text-xs">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Code Editor */}
              <div className="ml-16 relative">
                <textarea
                  ref={textareaRef}
                  value={activeFile.content}
                  onChange={(e) => updateFileContent(e.target.value)}
                  className="w-full h-full bg-gray-900 text-white p-4 resize-none outline-none font-mono text-sm leading-6 absolute inset-0 z-20"
                  style={{ background: 'transparent' }}
                  spellCheck={false}
                />
                
                {/* Syntax Highlighting Overlay */}
                <div 
                  className="absolute top-0 left-0 w-full h-full p-4 pointer-events-none text-sm leading-6 whitespace-pre-wrap break-words z-10"
                  dangerouslySetInnerHTML={{
                    __html: highlightSyntax(activeFile.content, activeFile.type)
                      .replace(/\n/g, '<br>')
                      .replace(/ /g, '&nbsp;')
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Monitor size={64} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">Welcome to VS Code</p>
                <p className="text-sm">Open a file to get started</p>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-blue-600 text-white px-4 py-1 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <GitBranch size={12} />
            <span>main</span>
            <span>Ln {activeFile ? activeFile.content.split('\n').length : 0}, Col 1</span>
            <span>{activeFile ? activeFile.type.toUpperCase() : ''}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>UTF-8</span>
            <span>LF</span>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-gray-800 border border-gray-600 rounded shadow-lg py-2 z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm flex items-center">
            <Copy size={14} className="mr-2" />
            Copy
          </div>
          <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm flex items-center">
            <Edit3 size={14} className="mr-2" />
            Rename
          </div>
          <div className="border-t border-gray-600 my-1"></div>
          <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm flex items-center text-red-400">
            <Trash2 size={14} className="mr-2" />
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;