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
  XCircle
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
      downloads: 12
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
      downloads: 5
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
      downloads: 8
    }
  ]);

  const [folders, setFolders] = useState([
    { id: 1, name: 'Project Documents', fileCount: 15, sharedWith: 3 },
    { id: 2, name: 'Images', fileCount: 28, sharedWith: 0 },
    { id: 3, name: 'Shared Resources', fileCount: 7, sharedWith: 12 }
  ]);

  const [viewMode, setViewMode] = useState('grid');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareFile, setShareFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const fileInputRef = useRef(null);

  const getFileIcon = (type) => {
    const iconMap = {
      pdf: FileText,
      doc: FileText,
      txt: FileText,
      jpg: Image,
      png: Image,
      gif: Image,
      mp4: Video,
      avi: Video,
      mp3: Music,
      wav: Music,
      zip: Archive,
      rar: Archive,
      js: Code,
      py: Code,
      html: Code
    };
    const IconComponent = iconMap[type] || File;
    return <IconComponent className="w-8 h-8" />;
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
        downloads: 0
      };
      setFiles(prev => [newFile, ...prev]);
    });
    setShowUploadModal(false);
  };

  const handleShare = (file) => {
    setShareFile(file);
    setShowShareModal(true);
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const ShareModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md">
        <h3 className="text-lg font-semibold mb-4">Share "{shareFile?.name}"</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Share with users</label>
            <input
              type="email"
              placeholder="Enter email addresses..."
              className="w-full p-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Permission Level</label>
            <select className="w-full p-2 border rounded-lg">
              <option>View Only</option>
              <option>Edit</option>
              <option>Full Access</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="public" />
            <label htmlFor="public" className="text-sm">Make publicly accessible</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="download" />
            <label htmlFor="download" className="text-sm">Allow downloads</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="expire" />
            <label htmlFor="expire" className="text-sm">Set expiration date</label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => setShowShareModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowShareModal(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );

  const UploadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md">
        <h3 className="text-lg font-semibold mb-4">Upload Files</h3>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <CloudUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Drag and drop files here or click to browse</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Choose Files
          </button>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-600">
            <p>• No file size limit</p>
            <p>• All file types supported</p>
            <p>• Cloud storage integration</p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => setShowUploadModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">File Manager</h1>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">Individual</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border rounded px-3 py-1"
              >
                <option value="all">All Files</option>
                <option value="pdf">PDFs</option>
                <option value="jpg">Images</option>
                <option value="mp4">Videos</option>
                <option value="zip">Archives</option>
              </select>
              <div className="text-sm text-gray-500">
                {filteredFiles.length} files
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Folders */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Folders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {folders.map(folder => (
              <div key={folder.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Folder className="w-8 h-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">{folder.name}</h3>
                    <p className="text-sm text-gray-500">{folder.fileCount} files</p>
                    {folder.sharedWith > 0 && (
                      <p className="text-xs text-blue-600">{folder.sharedWith} shared</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Files */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Files</h2>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map(file => (
                <div key={file.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file.type)}
                        <div className="flex-1">
                          <h3 className="font-medium text-sm truncate">{file.name}</h3>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{file.uploadedAt}</span>
                      <span>v{file.version}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      {file.owner === 'You' ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Owner</span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Shared</span>
                      )}
                      {file.isPublic && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Public</span>
                      )}
                      {file.permissions === 'read-only' ? (
                        <Eye className="w-3 h-3 text-gray-400" />
                      ) : (
                        <Edit3 className="w-3 h-3 text-green-500" />
                      )}
                    </div>
                    
                    {file.sharedWith.length > 0 && (
                      <div className="flex items-center space-x-1 mb-3">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{file.sharedWith.length} people</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{file.downloads} downloads</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleShare(file)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shared</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFiles.map(file => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getFileIcon(file.type)}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{file.name}</div>
                              <div className="text-sm text-gray-500">v{file.version}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.uploadedAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {file.sharedWith.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">{file.sharedWith.length}</span>
                              </div>
                            )}
                            {file.permissions === 'read-only' ? (
                              <Eye className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Edit3 className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleShare(file)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
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

      {/* Modals */}
      {showUploadModal && <UploadModal />}
      {showShareModal && <ShareModal />}
    </div>
  );
};

export default FileSharePlatform;