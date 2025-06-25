{/* <tr>
  <td className="px-4 py-3">
    <div className="flex items-center gap-3">
      {getFileIcon(item.type, item.name, item.fileType)}
      <span className="text-sm text-white">{item.name}</span>
    </div>
  </td>
  <td className="px-4 py-3 text-sm text-gray-400">
    {item.type === 'file' ? item.size : '--'}
  </td>
  <td className="px-4 py-3 text-sm text-gray-400">
    {item.modified || '--'}
  </td>
  <td className="px-4 py-3 text-sm text-gray-400">
    <div className="flex items-center gap-1">
      {item.permissions === 'read-only' ? (
        <>
          <Lock className="w-3 h-3 text-yellow-400" />
          <span>Read Only</span>
        </>
      ) : (
        <>
          <Unlock className="w-3 h-3 text-green-400" />
          <span>Read Write</span>
        </>
      )}
    </div>
  </td>
  <td className="px-4 py-3 text-sm text-gray-400">
    {item.version && `v${item.version}`}
  </td>
  <td className="px-4 py-3">
    <div className="relative group">
      <button className="p-1 hover:bg-gray-700 rounded">
        <MoreVertical className="w-4 h-4 text-gray-400" />
      </button>
      <div className="absolute right-0 top-8 bg-gray-800 border border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[150px]">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFileForAction(item.name);
            setShowShareModal(true);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-t-lg"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
          <Download className="w-4 h-4" />
          Download
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
          <Edit3 className="w-4 h-4" />
          Rename
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFileForAction(item.name);
            setShowDeleteModal(true);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-b-lg"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  </td>
</tr> */}

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  File, 
  Folder, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Share2, 
  Eye, 
  Edit3, 
  Trash2, 
  Clock, 
  User, 
  Lock, 
  Unlock,
  Grid3X3,
  List,
  Plus,
  ChevronRight,
  ChevronDown,
  Star,
  GitBranch,
  Cloud,
  Settings,
  X,
  Check,
  Copy,
  Image,
  FileText,
  Archive,
  Code,
  Music,
  Video,
  Calendar,
  Users,
  Send,
  AlertTriangle
} from 'lucide-react';

const getFileIcon = (type, name, fileType) => {
  if (type === 'folder') return <Folder className="w-4 h-4 text-yellow-400" />;
  if (fileType === 'pdf') return <FileText className="w-4 h-4 text-red-500" />;
  if (fileType === 'image') return <Image className="w-4 h-4 text-green-500" />;
  return <File className="w-4 h-4 text-gray-400" />;
};

const FileShareDashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFolder, setCurrentFolder] = useState('root');
  const [expandedFolders, setExpandedFolders] = useState(['root']);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedFileForAction, setSelectedFileForAction] = useState(null);
  const [filters, setFilters] = useState({
    fileType: 'all',
    dateRange: 'all',
    sharedBy: 'all',
    sharedWith: 'all',
    permission: 'all'
  });
  const fileInputRef = useRef(null);

  // Mock data for files and folders
  const [fileSystem, setFileSystem] = useState({
    root: {
      name: 'Root',
      type: 'folder',
      children: ['projects', 'shared', 'personal', 'recent'],
      path: 'root'
    },
    projects: {
      name: 'Projects',
      type: 'folder',
      children: ['project1.zip', 'design-assets'],
      path: 'root/projects',
      permissions: 'read-write'
    },
    shared: {
      name: 'Shared with me',
      type: 'folder',
      children: ['team-doc.pdf', 'presentation.pptx'],
      path: 'root/shared',
      permissions: 'read-only'
    },
    personal: {
      name: 'Personal',
      type: 'folder',
      children: ['resume.pdf', 'photos.zip'],
      path: 'root/personal',
      permissions: 'read-write'
    },
    recent: {
      name: 'Recent',
      type: 'folder',
      children: ['code-review.md', 'meeting-notes.docx'],
      path: 'root/recent',
      permissions: 'read-write'
    },
    'project1.zip': {
      name: 'project1.zip',
      type: 'file',
      size: '2.5 MB',
      modified: '2 hours ago',
      sharedWith: ['alice@company.com', 'bob@company.com', 'charlie@company.com'],
      sharedBy: 'me',
      permissions: 'read-write',
      version: '1.2',
      path: 'root/projects/project1.zip',
      fileType: 'archive',
      dateModified: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    'design-assets': {
      name: 'Design Assets',
      type: 'folder',
      children: ['logo.svg', 'icons.zip'],
      path: 'root/projects/design-assets',
      permissions: 'read-write'
    },
    'team-doc.pdf': {
      name: 'Team Documentation.pdf',
      type: 'file',
      size: '1.8 MB',
      modified: '1 day ago',
      sharedWith: ['me'],
      sharedBy: 'john.doe@company.com',
      permissions: 'read-only',
      version: '2.1',
      path: 'root/shared/team-doc.pdf',
      fileType: 'document',
      dateModified: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    'logo.svg': {
      name: 'logo.svg',
      type: 'file',
      size: '45 KB',
      modified: '3 days ago',
      sharedWith: [],
      sharedBy: 'me',
      permissions: 'read-write',
      version: '1.0',
      path: 'root/projects/design-assets/logo.svg',
      fileType: 'image',
      dateModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    'icons.zip': {
      name: 'icons.zip',
      type: 'file',
      size: '890 KB',
      modified: '1 week ago',
      sharedWith: ['designer@company.com'],
      sharedBy: 'me',
      permissions: 'read-write',
      version: '1.1',
      path: 'root/projects/design-assets/icons.zip',
      fileType: 'archive',
      dateModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    'resume.pdf': {
      name: 'resume.pdf',
      type: 'file',
      size: '245 KB',
      modified: '2 weeks ago',
      sharedWith: [],
      sharedBy: 'me',
      permissions: 'read-write',
      version: '3.0',
      path: 'root/personal/resume.pdf',
      fileType: 'document',
      dateModified: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    },
    'presentation.pptx': {
      name: 'Q4 Presentation.pptx',
      type: 'file',
      size: '4.2 MB',
      modified: '5 days ago',
      sharedWith: ['me'],
      sharedBy: 'manager@company.com',
      permissions: 'read-only',
      version: '1.5',
      path: 'root/shared/presentation.pptx',
      fileType: 'document',
      dateModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    'code-review.md': {
      name: 'code-review.md',
      type: 'file',
      size: '12 KB',
      modified: '1 hour ago',
      sharedWith: ['dev1@company.com', 'dev2@company.com'],
      sharedBy: 'me',
      permissions: 'read-write',
      version: '1.0',
      path: 'root/recent/code-review.md',
      fileType: 'code',
      dateModified: new Date(Date.now() - 60 * 60 * 1000)
    },
    'meeting-notes.docx': {
      name: 'meeting-notes.docx',
      type: 'file',
      size: '156 KB',
      modified: '6 hours ago',
      sharedWith: ['team@company.com'],
      sharedBy: 'me',
      permissions: 'read-write',
      version: '1.2',
      path: 'root/recent/meeting-notes.docx',
      fileType: 'document',
      dateModified: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  });

  const getCurrentFolderContents = () => {
    const folder = fileSystem[currentFolder];
    if (!folder || !folder.children) return [];
    
    return folder.children.map(childId => fileSystem[childId]).filter(Boolean);
  };

  const applyFilters = (items) => {
    return items.filter(item => {
      // File type filter
      if (filters.fileType !== 'all' && item.fileType !== filters.fileType) return false;
      
      // Date range filter
      if (filters.dateRange !== 'all' && item.dateModified) {
        const now = new Date();
        const itemDate = item.dateModified;
        const daysDiff = (now - itemDate) / (1000 * 60 * 60 * 24);
        
        switch (filters.dateRange) {
          case 'today':
            if (daysDiff > 1) return false;
            break;
          case 'week':
            if (daysDiff > 7) return false;
            break;
          case 'month':
            if (daysDiff > 30) return false;
            break;
        }
      }
      
      // Shared by filter
      if (filters.sharedBy !== 'all') {
        if (filters.sharedBy === 'me' && item.sharedBy !== 'me') return false;
        if (filters.sharedBy === 'others' && item.sharedBy === 'me') return false;
      }
      
      // Permission filter
      if (filters.permission !== 'all' && item.permissions !== filters.permission) return false;
      
      return true;
    });
  };

  const filteredContents = applyFilters(getCurrentFolderContents()).filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDeleteFiles = () => {
    if (selectedFileForAction) {
      // Delete single file
      setFileSystem(prev => {
        const newFileSystem = { ...prev };
        delete newFileSystem[selectedFileForAction];
        
        // Remove from parent folder
        Object.keys(newFileSystem).forEach(key => {
          if (newFileSystem[key].children?.includes(selectedFileForAction)) {
            newFileSystem[key] = {
              ...newFileSystem[key],
              children: newFileSystem[key].children.filter(child => child !== selectedFileForAction)
            };
          }
        });
        
        return newFileSystem;
      });
    } else {
      // Delete selected files
      setFileSystem(prev => {
        const newFileSystem = { ...prev };
        selectedFiles.forEach(fileId => {
          delete newFileSystem[fileId];
          // Remove from parent folders
          Object.keys(newFileSystem).forEach(key => {
            if (newFileSystem[key].children?.includes(fileId)) {
              newFileSystem[key] = {
                ...newFileSystem[key],
                children: newFileSystem[key].children.filter(child => child !== fileId)
              };
            }
          });
        });
        return newFileSystem;
      });
      setSelectedFiles([]);
    }
    setShowDeleteModal(false);
    setSelectedFileForAction(null);
  };

  const handleShareFile = (shareData) => {
    if (selectedFileForAction) {
      setFileSystem(prev => ({
        ...prev,
        [selectedFileForAction]: {
          ...prev[selectedFileForAction],
          sharedWith: [
            ...prev[selectedFileForAction].sharedWith,
            ...shareData.emails.filter(email => !prev[selectedFileForAction].sharedWith.includes(email))
          ]
        }
      }));
    }
    setShowShareModal(false);
    setSelectedFileForAction(null);
  };

  const getFileIcon = (type, name, fileType) => {
    if (type === 'folder') return <Folder className="w-5 h-5 text-blue-400" />;
    
    const iconClass = "w-5 h-5";
    
    switch (fileType) {
      case 'image': return <Image className={`${iconClass} text-green-400`} />;
      case 'document': return <FileText className={`${iconClass} text-blue-400`} />;
      case 'archive': return <Archive className={`${iconClass} text-yellow-400`} />;
      case 'code': return <Code className={`${iconClass} text-green-500`} />;
      case 'audio': return <Music className={`${iconClass} text-purple-400`} />;
      case 'video': return <Video className={`${iconClass} text-red-400`} />;
      default: return <File className={`${iconClass} text-gray-400`} />;
    }
  };

  const Sidebar = () => (
    <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">File Explorer</h2>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Upload Files
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {['root', 'projects', 'shared', 'personal', 'recent'].map(folderId => {
            const folder = fileSystem[folderId];
            if (!folder) return null;
            
            return (
              <div key={folderId} className="text-sm">
                <button
                  onClick={() => {
                    setCurrentFolder(folderId);
                    toggleFolder(folderId);
                  }}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-800 transition-colors ${
                    currentFolder === folderId ? 'bg-gray-800 text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {expandedFolders.includes(folderId) ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                  <Folder className="w-4 h-4" />
                  <span className="truncate">{folder.name}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex items-center gap-2">
            <Cloud className="w-3 h-3" />
            <span>Storage: 15.2 GB / 50 GB</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '30%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const FileCard = ({ item }) => (
    <div 
      className={`bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors cursor-pointer ${
        selectedFiles.includes(item.name) ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => handleFileSelect(item.name)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {getFileIcon(item.type, item.name, item.fileType)}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white truncate">{item.name}</h3>
            {item.type === 'file' && (
              <p className="text-xs text-gray-400 mt-1">
                {item.size} • {item.modified}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {item.permissions === 'read-only' && <Lock className="w-3 h-3 text-yellow-400" />}
          {item.version && <GitBranch className="w-3 h-3 text-green-400" />}
          <div className="relative group">
            <button className="p-1 hover:bg-gray-700 rounded">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
            <div className="absolute right-0 top-8 bg-gray-800 border border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[150px]">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFileForAction(item.name);
                  setShowShareModal(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-t-lg"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                <Edit3 className="w-4 h-4" />
                Rename
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFileForAction(item.name);
                  setShowDeleteModal(true);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-b-lg"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {item.type === 'file' && (
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-4">
            {item.sharedWith && item.sharedWith.length > 0 && (
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {item.sharedWith.length}
              </span>
            )}
            {item.sharedBy && item.sharedBy !== 'me' && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {item.sharedBy.split('@')[0]}
              </span>
            )}
          </div>
          {item.version && <span>v{item.version}</span>}
        </div>
      )}
    </div>
  );

  const FileRow = ({ item }) => (
    <tr 
      className={`hover:bg-gray-800 cursor-pointer ${
        selectedFiles.includes(item.name) ? 'bg-gray-800' : ''
      }`}
      onClick={() => handleFileSelect(item.name)}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {getFileIcon(item.type, item.name)}
          <span className="text-sm text-white">{item.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-400">
        {item.type === 'file' ? item.size : '--'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-400">
        {item.modified || '--'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          {item.permissions === 'read-only' ? (
            <>
              <Lock className="w-3 h-3 text-yellow-400" />
              <span>Read Only</span>
            </>
          ) : (
            <>
              <Unlock className="w-3 h-3 text-green-400" />
              <span>Read Write</span>
            </>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-400">
        {item.version && `v${item.version}`}
      </td>
      <td className="px-4 py-3">
        <button className="p-1 hover:bg-gray-700 rounded">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="h-screen bg-gray-900 text-white flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">
                {fileSystem[currentFolder]?.name || 'Files'}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{filteredContents.length} items</span>
                {selectedFiles.length > 0 && (
                  <span>• {selectedFiles.length} selected</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search files and folders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Action Bar */}
        {selectedFiles.length > 0 && (
          <div className="bg-blue-900/50 border-b border-blue-700 p-3">
            <div className="flex items-center gap-4">
              <span className="text-sm">{selectedFiles.length} items selected</span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button 
                  onClick={() => {
                    setShowShareModal(true);
                    setSelectedFileForAction(null);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button 
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedFileForAction(null);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredContents.map((item, index) => (
                <FileCard key={index} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Size</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Modified</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Access</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Version</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredContents.map((item, index) => (
                    <FileRow key={index} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {filteredContents.length === 0 && (
            <div className="text-center py-12">
              <Folder className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No files found</h3>
              <p className="text-gray-500">Upload files or create folders to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload Files</h3>
            <div 
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 mb-1">Drop files here or click to browse</p>
              <p className="text-xs text-gray-500">No file size limit</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                // Handle file upload logic here
                console.log('Files selected:', e.target.files);
              }}
            />
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal 
          file={selectedFileForAction ? fileSystem[selectedFileForAction] : null}
          onShare={handleShareFile}
          onClose={() => {
            setShowShareModal(false);
            setSelectedFileForAction(null);
          }}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal 
          files={selectedFileForAction ? [selectedFileForAction] : selectedFiles}
          onDelete={handleDeleteFiles}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedFileForAction(null);
          }}
        />
      )}
    </div>
  );
};

// Share Modal Component
const ShareModal = ({ file, onShare, onClose }) => {
  const [shareEmails, setShareEmails] = useState('');
  const [permission, setPermission] = useState('read-only');
  const [message, setMessage] = useState('');

  const handleShare = () => {
    const emails = shareEmails.split(',').map(email => email.trim()).filter(email => email);
    onShare({ emails, permission, message });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Share File</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {file && (
          <div className="mb-4 p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2">
              <File className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white">{file.name}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email addresses (comma separated)
            </label>
            <textarea
              value={shareEmails}
              onChange={(e) => setShareEmails(e.target.value)}
              placeholder="user1@example.com, user2@example.com"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Permission</label>
            <select 
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="read-only">Can view only</option>
              <option value="read-write">Can edit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message..."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleShare}
            disabled={!shareEmails.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Modal Component
const DeleteModal = ({ files, onDelete, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <h3 className="text-lg font-semibold text-white">Delete {files.length > 1 ? 'Files' : 'File'}</h3>
        </div>
        
        <p className="text-gray-300 mb-4">
          Are you sure you want to delete {files.length} {files.length > 1 ? 'files' : 'file'}? 
          This action cannot be undone.
        </p>

        <div className="max-h-32 overflow-y-auto mb-4">
          {files.map((fileName, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-400 py-1">
              <File className="w-4 h-4" />
              <span>{fileName}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileShareDashboard;