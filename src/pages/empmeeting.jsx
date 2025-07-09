import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Search, 
  Filter, 
  Plus, 
  Share2, 
  Edit3, 
  Trash2, 
  Download, 
  Check, 
  X, 
  Eye, 
  Lock,
  Globe,
  MessageCircle,
  Settings,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const MeetingPlatform = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [viewMode, setViewMode] = useState('list'); // list or calendar
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleView, setScheduleView] = useState('week'); // day, week
  
  // Mock user data
  const currentUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@company.com',
    permissions: ['create_meeting', 'edit_own', 'delete_own']
  };

  // Mock meetings data
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Product Review Meeting',
      type: 'public',
      organizer: 'John Doe',
      organizerId: 1,
      date: '2025-07-09',
      time: '10:00 AM',
      duration: 60,
      status: 'upcoming',
      participants: 8,
      description: 'Monthly product review and planning session',
      joinLink: 'https://meet.company.com/product-review-123',
      hasNotes: true,
      pendingRequests: 2
    },
    {
      id: 2,
      title: 'Team Standup',
      type: 'private',
      organizer: 'Jane Smith',
      organizerId: 2,
      date: '2025-07-08',
      time: '9:00 AM',
      duration: 30,
      status: 'ongoing',
      participants: 5,
      description: 'Daily team standup meeting',
      joinLink: 'https://meet.company.com/standup-456',
      hasNotes: false,
      pendingRequests: 0
    },
    {
      id: 3,
      title: 'Client Presentation',
      type: 'public',
      organizer: 'John Doe',
      organizerId: 1,
      date: '2025-07-07',
      time: '2:00 PM',
      duration: 90,
      status: 'completed',
      participants: 12,
      description: 'Quarterly client presentation and feedback session',
      joinLink: null,
      hasNotes: true,
      pendingRequests: 0
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    type: 'public',
    date: '',
    time: '',
    duration: 60,
    description: '',
    participants: []
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'text-blue-500';
      case 'ongoing': return 'text-red-500';
      case 'completed': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'upcoming': return '📅';
      case 'ongoing': return '🔴';
      case 'completed': return '📜';
      default: return '📅';
    }
  };

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || meeting.type === filterBy || meeting.status === filterBy;
    const matchesTab = activeTab === 'all' || meeting.status === activeTab;
    
    return matchesSearch && matchesFilter && matchesTab;
  });

  const createMeeting = () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.time) return;
    
    const meeting = {
      id: meetings.length + 1,
      ...newMeeting,
      organizer: currentUser.name,
      organizerId: currentUser.id,
      status: 'upcoming',
      participants: 0,
      joinLink: `https://meet.company.com/${newMeeting.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
      hasNotes: false,
      pendingRequests: 0
    };
    
    setMeetings([...meetings, meeting]);
    setNewMeeting({ title: '', type: 'public', date: '', time: '', duration: 60, description: '', participants: [] });
    setShowCreateModal(false);
  };

  const deleteMeeting = (id) => {
    setMeetings(meetings.filter(m => m.id !== id));
  };

  const joinMeeting = (meeting) => {
    window.open(meeting.joinLink, '_blank');
  };

  const shareInvite = (meeting) => {
    navigator.clipboard.writeText(meeting.joinLink);
    alert('Meeting link copied to clipboard!');
  };

  const downloadNotes = (meeting) => {
    const notes = `Meeting Notes - ${meeting.title}\nDate: ${meeting.date}\nTime: ${meeting.time}\nOrganizer: ${meeting.organizer}\n\nNotes content would be here...`;
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${meeting.title}-notes.txt`;
    a.click();
  };

  const CalendarView = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayMeetings = meetings.filter(m => {
        const meetingDate = new Date(m.date);
        return meetingDate.getDate() === day && 
               meetingDate.getMonth() === currentDate.getMonth() &&
               meetingDate.getFullYear() === currentDate.getFullYear();
      });
      
      days.push(
        <div key={day} className="p-2 border border-gray-200 dark:border-gray-700 min-h-[80px] hover:bg-gray-50 dark:hover:bg-gray-800">
          <div className="font-medium text-sm">{day}</div>
          {dayMeetings.map(meeting => (
            <div key={meeting.id} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-1 rounded mt-1 truncate">
              {meeting.time} - {meeting.title}
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium text-gray-600 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  const MeetingCard = ({ meeting }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{getStatusIcon(meeting.status)}</span>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{meeting.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Organized by {meeting.organizer}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {meeting.type === 'private' ? (
            <Lock size={16} className="text-gray-500" />
          ) : (
            <Globe size={16} className="text-gray-500" />
          )}
          <div className="relative">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{meeting.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{meeting.time} ({meeting.duration}min)</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>{meeting.participants} participants</span>
        </div>
      </div>
      
      {meeting.description && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{meeting.description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {meeting.status === 'upcoming' && (
            <button 
              onClick={() => joinMeeting(meeting)}
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
            >
              <Video size={14} />
              Join
            </button>
          )}
          {meeting.status === 'ongoing' && (
            <button 
              onClick={() => joinMeeting(meeting)}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm animate-pulse"
            >
              <Video size={14} />
              Join Live
            </button>
          )}
          <button 
            onClick={() => shareInvite(meeting)}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
          >
            <Share2 size={14} />
            Share
          </button>
          {meeting.hasNotes && (
            <button 
              onClick={() => downloadNotes(meeting)}
              className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm"
            >
              <Download size={14} />
              Notes
            </button>
          )}
        </div>
        
        {meeting.organizerId === currentUser.id && (
          <div className="flex gap-1">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <Edit3 size={14} />
            </button>
            <button 
              onClick={() => deleteMeeting(meeting.id)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
      
      {meeting.pendingRequests > 0 && meeting.organizerId === currentUser.id && (
        <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            {meeting.pendingRequests} pending join requests
          </p>
          <div className="flex gap-2 mt-1">
            <button className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-xs">
              <Check size={12} />
              Accept All
            </button>
            <button className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded text-xs">
              <X size={12} />
              Decline All
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Meetings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your team meetings and collaborations</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <Users size={16} />
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded-lg ${viewMode === 'calendar' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <Calendar size={16} />
              </button>
            </div>
            
            {currentUser.permissions.includes('create_meeting') && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                <Plus size={16} />
                Create Meeting
              </button>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search meetings by title, organizer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white dark:bg-gray-800 rounded-lg p-1">
          {[
            { id: 'upcoming', label: 'Upcoming Meetings', icon: '📅' },
            { id: 'ongoing', label: 'Ongoing Meetings', icon: '🔴' },
            { id: 'completed', label: 'Past Meetings', icon: '📜' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                {meetings.filter(m => m.status === tab.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        {viewMode === 'calendar' ? (
          <CalendarView />
        ) : (
          <div className="grid gap-4">
            {filteredMeetings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                  No meetings found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms' : 'Create your first meeting to get started'}
                </p>
              </div>
            ) : (
              filteredMeetings.map(meeting => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))
            )}
          </div>
        )}

        {/* Create Meeting Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Create New Meeting</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter meeting title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Meeting Type
                  </label>
                  <select
                    value={newMeeting.type}
                    onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newMeeting.date}
                      onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newMeeting.time}
                      onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={newMeeting.duration}
                    onChange={(e) => setNewMeeting({...newMeeting, duration: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    min="15"
                    max="480"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newMeeting.description}
                    onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows="3"
                    placeholder="Meeting description (optional)"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={createMeeting}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  Create Meeting
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingPlatform;