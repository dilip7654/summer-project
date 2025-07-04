import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  Plus, 
  Video, 
  Users, 
  Settings, 
  Filter, 
  Grid, 
  List, 
  Play, 
  Pause, 
  MessageCircle, 
  Download, 
  Share2, 
  Edit3, 
  Trash2, 
  Copy, 
  Check, 
  X,
  Globe,
  Lock,
  UserPlus,
  MoreHorizontal
} from 'lucide-react';

const MeetingPlatform = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinRequests, setShowJoinRequests] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);
  const [currentUser] = useState({ id: 1, name: 'John Doe', avatar: '👤' });

  // Sample meeting data
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Team Sprint Planning',
      description: 'Weekly sprint planning and task allocation',
      date: '2025-07-04',
      time: '10:00',
      duration: 60,
      type: 'recurring',
      organizer: 'John Doe',
      organizerId: 1,
      participants: 8,
      status: 'upcoming',
      privacy: 'private',
      meetingLink: 'https://platform.com/meeting/1',
      hasNotes: true,
      category: 'development'
    },
    {
      id: 2,
      title: 'Live: Client Presentation',
      description: 'Product demo for client stakeholders',
      date: '2025-07-03',
      time: '14:30',
      duration: 45,
      type: 'one-time',
      organizer: 'Sarah Wilson',
      organizerId: 2,
      participants: 5,
      status: 'ongoing',
      privacy: 'public',
      meetingLink: 'https://platform.com/meeting/2',
      hasNotes: false,
      category: 'presentation'
    },
    {
      id: 3,
      title: 'Code Review Session',
      description: 'Review pull requests and discuss implementation',
      date: '2025-07-02',
      time: '16:00',
      duration: 90,
      type: 'one-time',
      organizer: 'Mike Johnson',
      organizerId: 3,
      participants: 6,
      status: 'completed',
      privacy: 'private',
      meetingLink: 'https://platform.com/meeting/3',
      hasNotes: true,
      category: 'development'
    }
  ]);

  const [joinRequests] = useState([
    { id: 1, meetingId: 1, userName: 'Alex Kumar', userAvatar: '👨‍💻', requestTime: '2 min ago' },
    { id: 2, meetingId: 1, userName: 'Lisa Chen', userAvatar: '👩‍💼', requestTime: '5 min ago' }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    privacy: 'private',
    category: 'general'
  });

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || meeting.category === filterType;
    const matchesTab = activeTab === 'all' || meeting.status === activeTab;
    return matchesSearch && matchesFilter && matchesTab;
  });

  const handleCreateMeeting = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.time) {
      const meeting = {
        id: meetings.length + 1,
        ...newMeeting,
        organizer: currentUser.name,
        organizerId: currentUser.id,
        participants: 1,
        status: 'upcoming',
        meetingLink: `https://platform.com/meeting/${meetings.length + 1}`,
        hasNotes: false
      };
      setMeetings([...meetings, meeting]);
      setNewMeeting({ title: '', description: '', date: '', time: '', duration: 60, privacy: 'private', category: 'general' });
      setShowCreateModal(false);
    }
  };

  const copyMeetingLink = (meetingId, link) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(meetingId);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const deleteMeeting = (meetingId) => {
    setMeetings(meetings.filter(m => m.id !== meetingId));
  };

  const handleJoinRequest = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
    // Handle join request logic here
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ongoing': return 'bg-red-500';
      case 'upcoming': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'ongoing': return <Play className="w-4 h-4" />;
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'completed': return <Check className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const MeetingCard = ({ meeting }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(meeting.status)}`}></div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{meeting.title}</h3>
            <p className="text-sm text-gray-600">{meeting.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {meeting.privacy === 'private' ? 
            <Lock className="w-4 h-4 text-gray-500" /> : 
            <Globe className="w-4 h-4 text-green-500" />
          }
          {meeting.organizerId === currentUser.id && (
            <div className="flex space-x-1">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Edit3 className="w-4 h-4 text-gray-500" />
              </button>
              <button 
                onClick={() => deleteMeeting(meeting.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{meeting.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{meeting.time} ({meeting.duration}min)</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>{meeting.participants} participants</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {meeting.category}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {meeting.status === 'ongoing' && (
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Video className="w-4 h-4" />
              <span>Join Now</span>
            </button>
          )}
          {meeting.status === 'upcoming' && (
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Schedule</span>
            </button>
          )}
          {meeting.status === 'completed' && meeting.hasNotes && (
            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Notes</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => copyMeetingLink(meeting.id, meeting.meetingLink)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {copiedLink === meeting.id ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-gray-500" />
            )}
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Share2 className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageCircle className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
              {joinRequests.length > 0 && (
                <button
                  onClick={() => setShowJoinRequests(true)}
                  className="relative bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
                >
                  <UserPlus className="w-4 h-4 inline mr-1" />
                  {joinRequests.length} Requests
                </button>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Meeting</span>
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
          {[
            { id: 'upcoming', label: '📅 Upcoming', count: meetings.filter(m => m.status === 'upcoming').length },
            { id: 'ongoing', label: '🔴 Ongoing', count: meetings.filter(m => m.status === 'ongoing').length },
            { id: 'completed', label: '📜 Past', count: meetings.filter(m => m.status === 'completed').length },
            { id: 'all', label: '📋 All', count: meetings.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeTab === tab.id ? 'bg-blue-700' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search meetings, organizers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="development">Development</option>
            <option value="presentation">Presentation</option>
            <option value="general">General</option>
          </select>
        </div>

        {/* Meetings Grid/List */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredMeetings.map(meeting => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>

        {filteredMeetings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Create Meeting Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Meeting</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Meeting Title"
                value={newMeeting.title}
                onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Description (optional)"
                value={newMeeting.description}
                onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="time"
                  value={newMeeting.time}
                  onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={newMeeting.duration}
                  onChange={(e) => setNewMeeting({...newMeeting, duration: parseInt(e.target.value)})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
                <select
                  value={newMeeting.privacy}
                  onChange={(e) => setNewMeeting({...newMeeting, privacy: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="private">🔒 Private</option>
                  <option value="public">🌐 Public</option>
                </select>
              </div>
              <select
                value={newMeeting.category}
                onChange={(e) => setNewMeeting({...newMeeting, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="development">Development</option>
                <option value="presentation">Presentation</option>
                <option value="training">Training</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMeeting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Meeting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Requests Modal */}
      {showJoinRequests && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Join Requests</h2>
            <div className="space-y-3">
              {joinRequests.map(request => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{request.userAvatar}</span>
                    <div>
                      <p className="font-medium">{request.userName}</p>
                      <p className="text-sm text-gray-500">{request.requestTime}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleJoinRequest(request.id, 'accept')}
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleJoinRequest(request.id, 'reject')}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowJoinRequests(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingPlatform;