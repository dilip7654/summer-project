import React, { useState, useRef } from 'react';
import { 
  Users, 
  MessageCircle, 
  Video, 
  FileText, 
  Code, 
  GitBranch, 
  Upload, 
  Download, 
  Share2, 
  Settings, 
  Bell, 
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  Lock,
  Eye,
  Edit3,
  Folder,
  File,
  Image,
  Archive,
  Play,
  Music,
  Database,
  Globe,
  Clock,
  User,
  Shield,
  X,
  Check,
  AlertCircle,
  Cloud,
  HardDrive,
  Trash2,
  Copy,
  Star,
  Filter,
  MoreHorizontal
} from 'lucide-react';

const OrganizationPlatform = () => {
  const [activeTab, setActiveTab] = useState('files');
  const [selectedFile, setSelectedFile] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState(['projects', 'shared']);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [userRole, setUserRole] = useState('employee'); // individual, employee, admin
  const fileInputRef = useRef(null);

  const fileTypes = {
    'image': { icon: Image, color: 'text-green-500' },
    'video': { icon: Play, color: 'text-red-500' },
    'audio': { icon: Music, color: 'text-purple-500' },
    'code': { icon: Code, color: 'text-blue-500' },
    'document': { icon: FileText, color: 'text-orange-500' },
    'archive': { icon: Archive, color: 'text-gray-500' },
    'database': { icon: Database, color: 'text-indigo-500' },
    'folder': { icon: Folder, color: 'text-yellow-600' }
  };

  const getFileType = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
    if (['mp4', 'avi', 'mov', 'mkv'].includes(ext)) return 'video';
    if (['mp3', 'wav', 'flac', 'aac'].includes(ext)) return 'audio';
    if (['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'html', 'css'].includes(ext)) return 'code';
    if (['pdf', 'doc', 'docx', 'txt', 'md'].includes(ext)) return 'document';
    if (['zip', 'rar', '7z', 'tar'].includes(ext)) return 'archive';
    if (['sql', 'db', 'sqlite'].includes(ext)) return 'database';
    return 'document';
  };

  const sampleFiles = [
    { id: 1, name: 'Project Requirements.pdf', size: '2.4 MB', type: 'document', owner: 'Admin', permission: 'read', shared: true, starred: false, modified: '2 hours ago', path: '/projects/webapp' },
    { id: 2, name: 'UI Components.jsx', size: '156 KB', type: 'code', owner: 'John Doe', permission: 'edit', shared: false, starred: true, modified: '1 day ago', path: '/projects/webapp/src' },
    { id: 3, name: 'Team Meeting Recording.mp4', size: '245 MB', type: 'video', owner: 'Sarah Wilson', permission: 'read', shared: true, starred: false, modified: '3 days ago', path: '/shared/meetings' },
    { id: 4, name: 'Database Schema.sql', size: '45 KB', type: 'database', owner: 'Mike Chen', permission: 'edit', shared: true, starred: false, modified: '1 week ago', path: '/projects/backend' },
    { id: 5, name: 'Brand Assets.zip', size: '89 MB', type: 'archive', owner: 'Design Team', permission: 'read', shared: true, starred: true, modified: '2 weeks ago', path: '/shared/assets' },
    { id: 6, name: 'API Documentation.md', size: '78 KB', type: 'document', owner: 'Dev Team', permission: 'edit', shared: true, starred: false, modified: '5 days ago', path: '/projects/api' }
  ];

  const folderStructure = [
    {
      name: 'projects',
      type: 'folder',
      children: [
        { name: 'webapp', type: 'folder', files: 12 },
        { name: 'mobile-app', type: 'folder', files: 8 },
        { name: 'backend', type: 'folder', files: 15 }
      ]
    },
    {
      name: 'shared',
      type: 'folder',
      children: [
        { name: 'meetings', type: 'folder', files: 6 },
        { name: 'assets', type: 'folder', files: 24 },
        { name: 'templates', type: 'folder', files: 9 }
      ]
    },
    {
      name: 'personal',
      type: 'folder',
      children: [
        { name: 'drafts', type: 'folder', files: 3 },
        { name: 'notes', type: 'folder', files: 7 }
      ]
    }
  ];

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  const handleFileSelect = (file) => {
    setSelectedFiles(prev => 
      prev.includes(file.id) 
        ? prev.filter(id => id !== file.id)
        : [...prev, file.id]
    );
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const FileIcon = ({ type, className = "w-4 h-4" }) => {
    const IconComponent = fileTypes[type]?.icon || FileText;
    const colorClass = fileTypes[type]?.color || 'text-gray-500';
    return <IconComponent className={`${className} ${colorClass}`} />;
  };

  const PermissionBadge = ({ permission }) => {
    const config = {
      read: { icon: Eye, color: 'bg-blue-100 text-blue-800', text: 'Read Only' },
      edit: { icon: Edit3, color: 'bg-green-100 text-green-800', text: 'Edit' },
      admin: { icon: Shield, color: 'bg-purple-100 text-purple-800', text: 'Admin' }
    };
    
    const { icon: Icon, color, text } = config[permission] || config.read;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {text}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold text-white">DevCollab</h1>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-2 space-y-1">
            {[
              { id: 'files', icon: FileText, label: 'Files' },
              { id: 'chat', icon: MessageCircle, label: 'Chat' },
              { id: 'meetings', icon: Video, label: 'Meetings' },
              { id: 'code', icon: Code, label: 'Code Editor' },
              { id: 'git', icon: GitBranch, label: 'Git Integration' },
              { id: 'team', icon: Users, label: 'Team' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* File Tree */}
          {activeTab === 'files' && !sidebarCollapsed && (
            <div className="p-2 mt-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">WORKSPACE</h3>
              <div className="space-y-1">
                {folderStructure.map(folder => (
                  <div key={folder.name}>
                    <button
                      onClick={() => toggleFolder(folder.name)}
                      className="w-full flex items-center px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
                    >
                      {expandedFolders.includes(folder.name) ? (
                        <ChevronDown className="w-4 h-4 mr-1" />
                      ) : (
                        <ChevronRight className="w-4 h-4 mr-1" />
                      )}
                      <FileIcon type="folder" className="w-4 h-4 mr-2" />
                      {folder.name}
                    </button>
                    {expandedFolders.includes(folder.name) && (
                      <div className="ml-6 space-y-1">
                        {folder.children.map(child => (
                          <div key={child.name} className="flex items-center px-2 py-1 text-sm text-gray-400 hover:bg-gray-700 rounded cursor-pointer">
                            <FileIcon type="folder" className="w-3 h-3 mr-2" />
                            <span className="flex-1">{child.name}</span>
                            <span className="text-xs text-gray-500">{child.files}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            {!sidebarCollapsed && (
              <div className="ml-3 flex-1">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-gray-400 capitalize">{userRole}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold">File Management</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-2 hover:bg-gray-700 rounded"
                >
                  <Filter className="w-4 h-4" />
                </button>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search files..."
                    className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleUpload}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* File Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Action Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {sampleFiles.length} files • {selectedFiles.length} selected
              </span>
              {selectedFiles.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </button>
                  <button className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                  <button className="flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <select className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm">
                <option>All Files</option>
                <option>My Files</option>
                <option>Shared with Me</option>
                <option>Recent</option>
                <option>Starred</option>
              </select>
            </div>
          </div>

          {/* Files Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-2'}>
            {sampleFiles.map(file => {
              const isSelected = selectedFiles.includes(file.id);
              return (
                <div
                  key={file.id}
                  onClick={() => handleFileSelect(file)}
                  className={`${viewMode === 'grid' ? 'p-4' : 'p-3 flex items-center'} bg-gray-800 border border-gray-700 rounded-lg cursor-pointer transition-colors hover:bg-gray-750 ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-900/20' : ''
                  }`}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <FileIcon type={getFileType(file.name)} className="w-8 h-8" />
                        <div className="flex items-center space-x-1">
                          {file.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          {file.shared && <Globe className="w-4 h-4 text-blue-400" />}
                          <button className="p-1 hover:bg-gray-700 rounded">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-medium text-white mb-1 truncate">{file.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">{file.size}</p>
                      <div className="flex items-center justify-between">
                        <PermissionBadge permission={file.permission} />
                        <span className="text-xs text-gray-500">{file.modified}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        by {file.owner}
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleFileSelect(file)}
                        className="mr-3"
                      />
                      <FileIcon type={getFileType(file.name)} className="w-5 h-5 mr-3" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <span className="font-medium text-white truncate">{file.name}</span>
                          <div className="flex items-center ml-2 space-x-1">
                            {file.starred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                            {file.shared && <Globe className="w-3 h-3 text-blue-400" />}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-400 mt-1">
                          <span>{file.size}</span>
                          <span className="mx-2">•</span>
                          <span>{file.owner}</span>
                          <span className="mx-2">•</span>
                          <span>{file.modified}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <PermissionBadge permission={file.permission} />
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          console.log('Files selected:', e.target.files);
          // Handle file upload logic here
        }}
      />
    </div>
  );
};

export default OrganizationPlatform;