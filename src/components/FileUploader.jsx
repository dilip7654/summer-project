import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Plus, 
  Search, 
  Filter, 
  Share2, 
  Edit, 
  Trash2, 
  Download, 
  Eye,
  EyeOff,
  Copy,
  Check,
  X,
  MessageCircle,
  Settings,
  Grid,
  List,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const MeetingPlatform = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinRequests, setShowJoinRequests] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);
  const [expandedMeeting, setExpandedMeeting] = useState(null);

  // Mock data for meetings
  const [meetings, setMeetings] = useState({
    upcoming: [
      {
        id: 1,
        title: "Team Sprint Planning",
        date: "2025-07-05",
        time: "10:00 AM",
        duration: "2 hours",
        type: "public",
        organizer: "You",
        participants: 8,
        maxParticipants: 15,
        description: "Planning for upcoming sprint deliverables",
        link: "https://meet.platform.com/sprint-planning-123",
        hasNotes: true
      },
      {
        id: 2,
        title: "Client Review Meeting",
        date: "2025-07-06",
        time: "2:00 PM",
        duration: "1 hour",
        type: "private",
        organizer: "You",
        participants: 5,
        maxParticipants: 10,
        description: "Review project progress with client",
        link: "https://meet.platform.com/client-review-456",
        hasNotes: false
      }
    ],
    ongoing: [
      {
        id: 3,
        title: "Daily Standup",
        date: "2025-07-04",
        time: "9:00 AM",
        duration: "30 minutes",
        type: "public",
        organizer: "John Doe",
        participants: 12,
        maxParticipants: 15,
        description: "Daily team sync",
        link: "https://meet.platform.com/daily-standup-789",
        hasNotes: true,
        isLive: true
      }
    ],
    past: [
      {
        id: 4,
        title: "Code Review Session",
        date: "2025-07-03",
        time: "3:00 PM",
        duration: "1.5 hours",
        type: "private",
        organizer: "You",
        participants: 6,
        maxParticipants: 8,
        description: "Review recent code changes",
        link: "https://meet.platform.com/code-review-101",
        hasNotes: true,
        recording: "https://recordings.platform.com/code-review-101"
      },
      {
        id: 5,
        title: "Weekly Team Sync",
        date: "2025-07-02",
        time: "11:00 AM",
        duration: "1 hour",
        type: "public",
        organizer: "Jane Smith",
        participants: 10,
        maxParticipants: 12,
        description: "Weekly team updates and discussions",
        link: "https://meet.platform.com/weekly-sync-202",
        hasNotes: true,
        recording: "https://recordings.platform.com/weekly-sync-202"
      }
    ]
  });

  const [joinRequests, setJoinRequests] = useState([
    { id: 1, meetingId: 1, userName: "Alex Johnson", userEmail: "alex@example.com", requestTime: "2 hours ago" },
    { id: 2, meetingId: 2, userName: "Sarah Wilson", userEmail: "sarah@example.com", requestTime: "1 hour ago" }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    duration: '1',
    type: 'public',
    description: '',
    maxParticipants: 10
  });

  const handleCreateMeeting = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.time) {
      const meeting = {
        id: Date.now(),
        ...newMeeting,
        organizer: 'You',
        participants: 1,
        link: `https://meet.platform.com/${newMeeting.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        hasNotes: false
      };
      
      setMeetings(prev => ({
        ...prev,
        upcoming: [...prev.upcoming, meeting]
      }));
      
      setNewMeeting({
        title: '',
        date: '',
        time: '',
        duration: '1',
        type: 'public',
        description: '',
        maxParticipants: 10
      });
      setShowCreateModal(false);
    }
  };

  const handleCopyLink = (link, id) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleJoinRequest = (requestId, action) => {
    setJoinRequests(prev => prev.filter(req => req.id !== requestId));
    // In real app, you'd send this to backend
    console.log(`${action} request ${requestId}`);
  };

  const filteredMeetings = meetings[activeTab]?.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || meeting.type === filterType;
    return matchesSearch && matchesFilter;
  }) || [];

  const MeetingCard = ({ meeting }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
            {meeting.isLive && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                🔴 LIVE
              </span>
            )}
            <span className={`text-xs px-2 py-1 rounded-full ${
              meeting.type === 'private' 
                ? 'bg-orange-100 text-orange-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {meeting.type === 'private' ? '🔒 Private' : '🌐 Public'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {meeting.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {meeting.time}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {meeting.participants}/{meeting.maxParticipants}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{meeting.description}</p>
          <p className="text-xs text-gray-500">Organizer: {meeting.organizer}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpandedMeeting(expandedMeeting === meeting.id ? null : meeting.id)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            {expandedMeeting === meeting.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {expandedMeeting === meeting.id && (
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {activeTab === 'ongoing' && (
              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-1">
                <Video className="w-4 h-4" />
                Join Meeting
              </button>
            )}
            
            {activeTab === 'upcoming' && (
              <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 flex items-center gap-1">
                <Video className="w-4 h-4" />
                Start Meeting
              </button>
            )}

            {activeTab === 'past' && meeting.recording && (
              <button className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 flex items-center gap-1">
                <Video className="w-4 h-4" />
                View Recording
              </button>
            )}

            <button
              onClick={() => handleCopyLink(meeting.link, meeting.id)}
              className="bg-gray-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-700 flex items-center gap-1"
            >
              {copiedLink === meeting.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedLink === meeting.id ? 'Copied!' : 'Copy Link'}
            </button>

            {meeting.organizer === 'You' && activeTab !== 'past' && (
              <>
                <button className="bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-700 flex items-center gap-1">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 flex items-center gap-1">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </>
            )}

            {meeting.hasNotes && (
              <button className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-1">
                <Download className="w-4 h-4" />
                Download Notes
              </button>
            )}

            {activeTab === 'ongoing' && (
              <button className="bg-teal-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-teal-700 flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Video className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
            </div>
            <div className="flex items-center gap-3">
              {joinRequests.length > 0 && (
                <button
                  onClick={() => setShowJoinRequests(!showJoinRequests)}
                  className="relative bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Join Requests
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {joinRequests.length}
                  </span>
                </button>
              )}
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Meeting
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Join Requests Panel */}
        {showJoinRequests && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Pending Join Requests</h3>
            {joinRequests.map(request => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <div>
                  <p className="font-medium text-gray-900">{request.userName}</p>
                  <p className="text-sm text-gray-600">{request.userEmail} • {request.requestTime}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleJoinRequest(request.id, 'accept')}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleJoinRequest(request.id, 'reject')}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search meetings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                {viewMode === 'list' ? <Calendar className="w-4 h-4" /> : <List className="w-4 h-4" />}
                {viewMode === 'list' ? 'Calendar View' : 'List View'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📅 Upcoming Meetings ({meetings.upcoming.length})
            </button>
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'ongoing'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🔴 Ongoing Meetings ({meetings.ongoing.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'past'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📜 Past Meetings ({meetings.past.length})
            </button>
          </div>
        </div>

        {/* Meetings List */}
        <div className="space-y-4">
          {filteredMeetings.length === 0 ? (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Create your first meeting to get started'
                }
              </p>
            </div>
          ) : (
            filteredMeetings.map(meeting => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))
          )}
        </div>
      </div>

      {/* Create Meeting Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Meeting</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter meeting title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                  <select
                    value={newMeeting.duration}
                    onChange={(e) => setNewMeeting({...newMeeting, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="0.5">30 minutes</option>
                    <option value="1">1 hour</option>
                    <option value="1.5">1.5 hours</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newMeeting.type}
                    onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                <input
                  type="number"
                  value={newMeeting.maxParticipants}
                  onChange={(e) => setNewMeeting({...newMeeting, maxParticipants: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="2"
                  max="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter meeting description"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMeeting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingPlatform;