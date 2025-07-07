import React, { useState, useRef } from 'react';
import { 
  Upload, 
  File, 
  Folder, 
  Share2, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  Lock, 
  Unlock, 
  Users, 
  Clock, 
  Filter,
  Search,
  Grid,
  List,
  Plus,
  Settings,
  CloudUpload,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Code,
  MoreVertical,
  User,
  Shield,
  CheckCircle,
  XCircle,
  Home,
  MessageSquare,
  Phone,
  Calendar,
  Bell,
  Hash,
  ChevronDown,
  Star,
  Pin,
  Copy,
  Link,
  UserPlus,
  Activity,
  Zap
} from 'lucide-react';

const FileSharePlatform = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Project_Proposal.pdf',
      type: 'pdf',
      size: '2.3 MB',
      uploadedAt: '2024-12-20',
      owner: 'You',
      sharedWith: ['john@company.com', 'sarah@company.com'],
      permissions: 'read-write',
      isPublic: false,
      version: '1.2',
      downloads: 12,
      isStarred: true
    },
    {
      id: 2,
      name: 'Design_Assets.zip',
      type: 'archive',
      size: '45.8 MB',
      uploadedAt: '2024-12-19',
      owner: 'You',
      sharedWith: [],
      permissions: 'read-only',
      isPublic: true,
      version: '2.0',
      downloads: 5,
      isStarred: false
    },
    {
      id: 3,
      name: 'Meeting_Recording.mp4',
      type: 'video',
      size: '128.5 MB',
      uploadedAt: '2024-12-18',
      owner: 'admin@company.com',
      sharedWith: ['you@company.com'],
      permissions: 'read-only',
      isPublic: false,
      version: '1.0',
      downloads: 8,
      isStarred: false
    },
    {
      id: 4,
      name: 'main.py',
      type: 'py',
      size: '15.2 KB',
      uploadedAt: '2024-12-21',
      owner: 'You',
      sharedWith: ['dev@company.com'],
      permissions: 'read-write',
      isPublic: false,
      version: '3.1',
      downloads: 23,
      isStarred: true
    }
  ]);

  const [folders, setFolders] = useState([
    { id: 1, name: 'Project Documents', fileCount: 15, sharedWith: 3, color: '#5865f2' },
    { id: 2, name: 'Design Assets', fileCount: 28, sharedWith: 0, color: '#57f287' },
    { id: 3, name: 'Code Repository', fileCount: 42, sharedWith: 8, color: '#fee75c' },
    { id: 4, name: 'Meeting Records', fileCount: 7, sharedWith: 12, color: '#eb459e' }
  ]);

  const [activeSection, setActiveSection] = useState('files');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareFile, setShareFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const fileInputRef = useRef(null);

  const sidebarItems = [
    { id: 'files', label: 'Files', icon: File, count: files.length },
    { id: 'shared', label: 'Shared with me', icon: Users, count: 8 },
    { id: 'starred', label: 'Starred', icon: Star, count: files.filter(f => f.isStarred).length },
    { id: 'recent', label: 'Recent', icon: Clock, count: 12 },
    { id: 'trash', label: 'Trash', icon: Trash2, count: 3 }
  ];

  const getFileIcon = (type) => {
    const iconMap = {
      pdf: { icon: FileText, color: '#e53e3e' },
      doc: { icon: FileText, color: '#2b6cb0' },
      txt: { icon: FileText, color: '#4a5568' },
      jpg: { icon: Image, color: '#38a169' },
      png: { icon: Image, color: '#38a169' },
      gif: { icon: Image, color: '#38a169' },
      mp4: { icon: Video, color: '#9f7aea' },
      avi: { icon: Video, color: '#9f7aea' },
      mp3: { icon: Music, color: '#ed8936' },
      wav: { icon: Music, color: '#ed8936' },
      zip: { icon: Archive, color: '#d69e2e' },
      rar: { icon: Archive, color: '#d69e2e' },
      js: { icon: Code, color: '#f6e05e' },
      py: { icon: Code, color: '#4299e1' },
      html: { icon: Code, color: '#f56565' }
    };
    const { icon: IconComponent, color } = iconMap[type] || { icon: File, color: '#718096' };
    return <IconComponent className="w-6 h-6" style={{ color }} />;
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    uploadedFiles.forEach(file => {
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.name.split('.').pop().toLowerCase(),
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        uploadedAt: new Date().toISOString().split('T')[0],
        owner: 'You',
        sharedWith: [],
        permissions: 'read-write',
        isPublic: false,
        version: '1.0',
        downloads: 0,
        isStarred: false
      };
      setFiles(prev => [newFile, ...prev]);
    });
    setShowUploadModal(false);
  };

  const handleShare = (file) => {
    setShareFile(file);
    setShowShareModal(true);
  };

  const handleDelete = (fileId) => {
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this file?')) {
      // Filter out the file with the given ID
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    }
  };


  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || file.type === filterType;
    const matchesSection = activeSection === 'files' || 
                          (activeSection === 'starred' && file.isStarred) ||
                          (activeSection === 'shared' && file.owner !== 'You');
    return matchesSearch && matchesFilter && matchesSection;
  });

  const ShareModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#36393f] rounded-lg p-6 w-[480px] max-w-md shadow-2xl border border-[#202225]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Share "{shareFile?.name}"</h3>
          <button 
            onClick={() => setShowShareModal(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Share with users</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email addresses..."
                className="w-full p-3 bg-[#40444b] border border-[#202225] rounded-md text-white placeholder-gray-400 focus:border-[#5865f2] focus:outline-none transition-colors"
              />
              <UserPlus className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Permission Level</label>
            <select className="w-full p-3 bg-[#40444b] border border-[#202225] rounded-md text-white focus:border-[#5865f2] focus:outline-none">
              <option>👁️ View Only</option>
              <option>✏️ Edit</option>
              <option>🔑 Full Access</option>
            </select>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#2f3136] rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-white text-sm">Make publicly accessible</span>
              </div>
              <input type="checkbox" className="w-4 h-4 text-[#5865f2] bg-[#40444b] border-gray-600 rounded focus:ring-[#5865f2]" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#2f3136] rounded-md">
              <div className="flex items-center space-x-3">
                <Download className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">Allow downloads</span>
              </div>
              <input type="checkbox" className="w-4 h-4 text-[#5865f2] bg-[#40444b] border-gray-600 rounded focus:ring-[#5865f2]" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#2f3136] rounded-md">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm">Set expiration date</span>
              </div>
              <input type="checkbox" className="w-4 h-4 text-[#5865f2] bg-[#40444b] border-gray-600 rounded focus:ring-[#5865f2]" />
            </div>
          </div>
          
          <div className="bg-[#2f3136] p-3 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <Link className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Share Link</span>
            </div>
            <div className="flex space-x-2">
              <input 
                value="https://files.app/share/abc123xyz"
                readOnly
                className="flex-1 p-2 bg-[#40444b] border border-[#202225] rounded text-white text-sm"
              />
              <button className="px-3 py-2 bg-[#5865f2] text-white rounded hover:bg-[#4752c4] transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowShareModal(false)}
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-[#40444b] rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowShareModal(false)}
            className="px-6 py-2 bg-[#5865f2] text-white rounded hover:bg-[#4752c4] transition-colors font-medium"
          >
            Share File
          </button>
        </div>
      </div>
    </div>
  );

  const UploadModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#36393f] rounded-lg p-6 w-[480px] max-w-md shadow-2xl border border-[#202225]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Upload Files</h3>
          <button 
            onClick={() => setShowUploadModal(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="border-2 border-dashed border-[#5865f2]/30 bg-[#5865f2]/5 rounded-lg p-8 text-center hover:border-[#5865f2]/50 transition-colors">
          <CloudUpload className="w-16 h-16 text-[#5865f2] mx-auto mb-4" />
          <p className="text-gray-300 mb-2 text-lg">Drop files here to upload</p>
          <p className="text-gray-400 text-sm mb-4">or click to browse your computer</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors font-medium"
          >
            Choose Files
          </button>
        </div>
        
        <div className="mt-6 space-y-3">
          <div className="bg-[#2f3136] p-4 rounded-md">
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Zap className="w-4 h-4 text-green-400" />
              <span>Unlimited file size</span>
            </div>
          </div>
          <div className="bg-[#2f3136] p-4 rounded-md">
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>All file types supported</span>
            </div>
          </div>
          <div className="bg-[#2f3136] p-4 rounded-md">
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <CloudUpload className="w-4 h-4 text-purple-400" />
              <span>Cloud storage integration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
      <div className="min-h-screen bg-[#0e639c] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#2f3136] flex flex-col border-r border-[#202225]">
        {/* Header */}
        <div className="p-4 border-b border-[#202225]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#5865f2] rounded-lg flex items-center justify-center">
              <File className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white">File Manager</h1>
              <p className="text-xs text-gray-400">Individual Workspace</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-2">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-md transition-colors ${
                activeSection === item.id 
                  ? 'bg-[#0e639c] text-white' 
                  : 'text-gray-300 hover:bg-[#40444b] hover:text-[#75beff]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count > 0 && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeSection === item.id ? 'bg-white/20' : 'bg-[#40444b] text-gray-300'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* User Info */}
       <div className="p-4 border-t border-[#1e1e1e]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">You</p>
              <p className="text-xs text-gray-400">Individual User</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

       <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-[#1e1e1e] p-4 border-b border-[#333333] flex items-center justify-between"> {/* VS Code top bar */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Hash className="w-5 h-5 text-gray-400" />
              <span className="font-semibold text-white capitalize">{activeSection}</span>
            </div>
            <div className="h-6 w-px bg-[#333333]"></div>
            <div className="text-sm text-gray-400">
              {filteredFiles.length} items
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#3c3c3c] border border-[#3c3c3c] rounded-md text-white placeholder-gray-400 w-64 focus:border-[#0e639c] focus:outline-none transition-colors" /* VS Code input */
              />
            </div>
            
            {/* Upload Button */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-[#0e639c] text-white px-4 py-2 rounded-md hover:bg-[#1177bb] transition-colors flex items-center space-x-2 font-medium" /* VS Code blue button */
            >
              <Plus className="w-4 h-4" />
              <span>Upload</span>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-[#252526] p-4 border-b border-[#333333] flex items-center justify-between"> {/* VS Code toolbar */}
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-[#3c3c3c] border border-[#3c3c3c] rounded px-3 py-2 text-white focus:border-[#0e639c] focus:outline-none" /* VS Code select */
            >
              <option value="all">All Files</option>
              <option value="pdf">📄 PDFs</option>
              <option value="jpg">🖼️ Images</option>
              <option value="mp4">🎥 Videos</option>
              <option value="zip">📦 Archives</option>
              <option value="py">💻 Code</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-[#37373d] text-white' : 'text-gray-400 hover:text-white hover:bg-[#2a2d2e]'
              }`} /* VS Code button states */
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-[#37373d] text-white' : 'text-gray-400 hover:text-white hover:bg-[#2a2d2e]'
              }`} /* VS Code button states */
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto bg-[#1e1e1e]"> {/* VS Code content area */}
          {/* Folders */}
          {activeSection === 'files' && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-white flex items-center space-x-2">
                <Folder className="w-5 h-5" />
                <span>Folders</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {folders.map(folder => (
                  <div key={folder.id} className="bg-[#252526] p-4 rounded-lg hover:bg-[#2a2d2e] transition-colors cursor-pointer border border-[#333333] group"> {/* VS Code card */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: folder.color + '20' }}>
                        <Folder className="w-6 h-6" style={{ color: folder.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white group-hover:text-[#75beff] transition-colors">{folder.name}</h3> {/* VS Code blue hover */}
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-sm text-gray-400">{folder.fileCount} files</p>
                          {folder.sharedWith > 0 && (
                            <>
                              <span className="text-gray-600">•</span>
                              <p className="text-xs text-[#75beff]">{folder.sharedWith} shared</p> {/* VS Code blue text */}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white flex items-center space-x-2">
              <File className="w-5 h-5" />
              <span>Files</span>
            </h2>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFiles.map(file => (
                  <div key={file.id} className="bg-[#2f3136] rounded-lg hover:bg-[#36393f] transition-colors border border-[#202225] group">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 bg-[#3c3c3c] rounded-lg flex items-center justify-center">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm text-white truncate group-hover:text-[#75beff] transition-colors">{file.name}</h3>
                            <p className="text-xs text-gray-400">{file.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {file.isStarred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                          <button className="p-1 hover:bg-[#3c3c3c] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span>{file.uploadedAt}</span>
                        <span className="bg-[#333333] px-2 py-1 rounded">v{file.version}</span> {/* VS Code badge */}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        {file.owner === 'You' ? (
                          <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">Owner</span>
                        ) : (
                          <span className="text-xs bg-[#0e639c]/10 text-[#75beff] px-2 py-1 rounded border border-[#0e639c]/20">Shared</span> 
                        )}
                        {file.isPublic && (
                          <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/20">Public</span>
                        )}
                        {file.permissions === 'read-only' ? (
                          <Eye className="w-3 h-3 text-gray-400" />
                        ) : (
                          <Edit3 className="w-3 h-3 text-green-400" />
                        )}
                      </div>
                      
                      {file.sharedWith.length > 0 && (
                        <div className="flex items-center space-x-1 mb-3">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400">{file.sharedWith.length} people</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-3 border-t border-[#202225]">
                        <div className="flex items-center space-x-1">
                          <Activity className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400">{file.downloads} downloads</span>
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleShare(file)}
                            className="p-1.5 hover:bg-[#3c3c3c] rounded transition-colors"
                          >
                            <Share2 className="w-4 h-4 text-gray-400 hover:text-[#75beff]" />
                          </button>
                          <button className="p-1.5 hover:bg-[#3c3c3c] rounded transition-colors">
                            <Download className="w-4 h-4 text-gray-400 hover:text-green-400" />
                          </button>
                          <button 
                            onClick={() => handleDelete(file.id)}
                            className="p-1.5 hover:bg-[#3c3c3c] rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#252526] rounded-lg border border-[#333333]"> {/* VS Code table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-[#2a2d2e]"> {/* VS Code table header */}
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-[#333333]">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-[#333333]">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-[#333333]">Modified</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-[#333333]">Shared</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-[#333333]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333333]">
                      {filteredFiles.map(file => (
                        <tr key={file.id} className="hover:bg-[#2a2d2e] transition-colors group"> {/* VS Code hover */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-[#333333] rounded-lg flex items-center justify-center mr-3"> {/* VS Code icon bg */}
                                {getFileIcon(file.type)}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <div className="text-sm font-medium text-white group-hover:text-[#75beff] transition-colors">{file.name}</div> {/* VS Code blue hover */}
                                  {file.isStarred && <Star className="w-3 h-3 text-yellow-400 fill-current" />}
                                </div>
                                <div className="text-sm text-gray-400">v{file.version}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{file.size}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{file.uploadedAt}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {file.sharedWith.length > 0 && (
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-300">{file.sharedWith.length}</span>
                                </div>
                              )}
                              {file.permissions === 'read-only' ? (
                                <Eye className="w-4 h-4 text-gray-400" />
                              ) : (
                                <Edit3 className="w-4 h-4 text-green-400" />
                              )}
                              {file.owner === 'You' ? (
                                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">Owner</span>
                              ) : (
                                <span className="text-xs bg-[#0e639c]/10 text-[#75beff] px-2 py-1 rounded border border-[#0e639c]/20">Shared</span> 
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleShare(file)}
                                className="text-blue-400 hover:text-[#75beff] p-1 hover:bg-[#3c3c3c] rounded transition-colors"
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                              <button className="text-green-400 hover:text-green-300 p-1 hover:bg-[#3c3c3c] rounded transition-colors">
                                <Download className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(file.id)}
                                className="text-red-400 hover:text-red-300 p-1 hover:bg-[#3c3c3c] rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showShareModal && <ShareModal />}
      {showUploadModal && <UploadModal />}
    </div>
  );
};

export default FileSharePlatform;