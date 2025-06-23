import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  MessageCircle, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Share2, 
  CheckCircle, 
  XCircle, 
  Grid, 
  List,
  ChevronLeft,
  ChevronRight,
  Settings,
  UserPlus,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Save,
  X,
  AlertTriangle
} from 'lucide-react';

const MeetingPlatform = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [meetingToDelete, setMeetingToDelete] = useState(null);

  // Mock data matching the image
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'AI Project Planning',
      organizer: 'Vishal Patel',
      date: 'May 25',
      time: '2:00 PM',
      endTime: '3:00 PM',
      duration: 60,
      participants: 3,
      status: 'upcoming',
      isPrivate: true,
      agenda: 'Review model architecture and project timeline',
      meetingLink: 'https://meet.example.com/ai-project-123',
      description: 'Deep dive into the AI project requirements and technical specifications.'
    },
    {
      id: 2,
      title: 'Daily Standup',
      organizer: 'Sophia Kumar',
      date: 'May 25',
      time: '9:30 AM',
      endTime: '10:00 AM',
      duration: 30,
      participants: 5,
      status: 'upcoming',
      isPrivate: false,
      meetingLink: 'https://meet.example.com/standup-456',
      description: 'Daily team sync-up to discuss progress and blockers.'
    },
    {
      id: 3,
      title: 'Daily Standup',
      organizer: 'Ananya Rao',
      date: 'May 24',
      time: '9:30 AM',
      endTime: '10:00 AM',
      duration: 30,
      participants: 2,
      status: 'upcoming',
      isPrivate: false,
      meetingLink: 'https://meet.example.com/standup-789',
      description: 'Quick team check-in and task updates.'
    },
    {
      id: 4,
      title: 'Design Review',
      organizer: 'Aditi Sharma',
      date: 'May 23',
      time: '3:00 PM',
      endTime: '4:00 PM',
      duration: 60,
      participants: 4,
      status: 'upcoming',
      isPrivate: false,
      meetingLink: 'https://meet.example.com/design-review-101',
      description: 'Review and feedback on the latest design iterations.'
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    type: 'one-time',
    isPrivate: false,
    participants: [],
    agenda: ''
  });

  useEffect(() => {
    if (meetings.length > 0 && !selectedMeeting) {
      setSelectedMeeting(meetings[0]);
    }
  }, [meetings]);

  const handleScheduleMeeting = () => {
    const meeting = {
      id: Date.now(),
      ...newMeeting,
      organizer: 'You',
      status: 'upcoming',
      meetingLink: `https://meet.example.com/${newMeeting.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      participants: Math.floor(Math.random() * 8) + 1,
      endTime: calculateEndTime(newMeeting.time, newMeeting.duration)
    };
    setMeetings([...meetings, meeting]);
    resetNewMeeting();
    setShowScheduleModal(false);
  };

  const handleEditMeeting = () => {
    const updatedMeetings = meetings.map(meeting => 
      meeting.id === editingMeeting.id 
        ? { ...editingMeeting, endTime: calculateEndTime(editingMeeting.time, editingMeeting.duration) }
        : meeting
    );
    setMeetings(updatedMeetings);
    if (selectedMeeting && selectedMeeting.id === editingMeeting.id) {
      setSelectedMeeting(editingMeeting);
    }
    setShowEditModal(false);
    setEditingMeeting(null);
  };

  const handleDeleteMeeting = () => {
    const updatedMeetings = meetings.filter(meeting => meeting.id !== meetingToDelete.id);
    setMeetings(updatedMeetings);
    if (selectedMeeting && selectedMeeting.id === meetingToDelete.id) {
      setSelectedMeeting(updatedMeetings.length > 0 ? updatedMeetings[0] : null);
    }
    setShowDeleteModal(false);
    setMeetingToDelete(null);
  };

  const calculateEndTime = (startTime, duration) => {
    if (!startTime) return '';
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + duration;
    const endHours = Math.floor(endMinutes / 60) % 24;
    const endMins = endMinutes % 60;
    const period = endHours >= 12 ? 'PM' : 'AM';
    const displayHours = endHours % 12 || 12;
    return `${displayHours}:${endMins.toString().padStart(2, '0')} ${period}`;
  };

  const resetNewMeeting = () => {
    setNewMeeting({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: 60,
      type: 'one-time',
      isPrivate: false,
      participants: [],
      agenda: ''
    });
  };

  const handleJoinMeeting = (meeting) => {
    window.open(meeting.meetingLink, '_blank');
  };

  const openEditModal = (meeting) => {
    setEditingMeeting({...meeting});
    setShowEditModal(true);
  };

  const openDeleteModal = (meeting) => {
    setMeetingToDelete(meeting);
    setShowDeleteModal(true);
  };

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || meeting.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const MeetingCard = ({ meeting }) => (
    <div className={`group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 hover:from-slate-750 hover:to-slate-850 transition-all duration-300 cursor-pointer border border-slate-700/50 hover:border-slate-600/50 hover:shadow-xl hover:shadow-blue-500/10 ${
      selectedMeeting?.id === meeting.id ? 'ring-2 ring-blue-500/50 border-blue-500/50' : ''
    }`} onClick={() => setSelectedMeeting(meeting)}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-purple-600/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors">{meeting.title}</h3>
              {meeting.isPrivate && (
                <div className="flex items-center gap-1 text-xs bg-slate-700/80 text-slate-300 px-2 py-1 rounded-full backdrop-blur-sm">
                  <Lock className="w-3 h-3" />
                  Private
                </div>
              )}
            </div>
            
            <div className="text-slate-400 text-sm mb-2 group-hover:text-slate-300 transition-colors">
              {meeting.date}, {meeting.time} – {meeting.endTime}
            </div>
            
            <div className="text-slate-300 text-sm mb-4 group-hover:text-slate-200 transition-colors">
              Organized by {meeting.organizer}
            </div>

            {meeting.participants && (
              <div className="flex items-center gap-2 text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{meeting.participants} participants</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                openEditModal(meeting);
              }}
              className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
              title="Edit Meeting"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal(meeting);
              }}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
              title="Delete Meeting"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleJoinMeeting(meeting);
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );

  const DetailedMeetingView = ({ meeting }) => {
    if (!meeting) return null;
    
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border-l-4 border-blue-500 shadow-xl sticky top-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-2xl font-semibold text-white">{meeting.title}</h3>
            {meeting.isPrivate && (
              <div className="flex items-center gap-1 text-xs bg-slate-700/80 text-slate-300 px-2 py-1 rounded-full backdrop-blur-sm">
                <Lock className="w-3 h-3" />
                Private
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="text-lg">{meeting.date}</span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-lg">{meeting.time} – {meeting.endTime}</span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-300">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Organized by {meeting.organizer}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Users className="w-5 h-5 text-blue-400" />
              <span>{meeting.participants} participants</span>
            </div>
          </div>
        </div>

        {meeting.description && (
          <div className="mb-6">
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              Description
            </h4>
            <p className="text-slate-300 leading-relaxed">{meeting.description}</p>
          </div>
        )}

        {meeting.agenda && (
          <div className="mb-6">
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              <List className="w-4 h-4 text-blue-400" />
              Agenda
            </h4>
            <p className="text-slate-300 leading-relaxed">{meeting.agenda}</p>
          </div>
        )}

        <div className="space-y-3 mt-6">
          <button 
            onClick={() => handleJoinMeeting(meeting)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium text-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25"
          >
            Join Meeting
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={() => openEditModal(meeting)}
              className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(meeting.meetingLink);
              }}
              className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 w-full max-w-md border border-slate-700/50 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/0 to-purple-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Meetings
          </h1>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Schedule Meeting
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-8 bg-slate-800/50 rounded-xl p-1 backdrop-blur-sm border border-slate-700/50">
          {[
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'ongoing', label: 'Ongoing' },
            { key: 'past', label: 'Past' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 font-medium transition-all duration-200 rounded-lg ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search meetings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 backdrop-blur-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Meeting List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredMeetings.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No meetings found</p>
                <p className="text-sm">Try adjusting your search or create a new meeting</p>
              </div>
            ) : (
              filteredMeetings.map(meeting => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))
            )}
          </div>

          {/* Detailed Meeting View */}
          <div className="lg:col-span-1">
            <DetailedMeetingView meeting={selectedMeeting} />
          </div>
        </div>

        {/* Schedule Meeting Modal */}
        <Modal 
          show={showScheduleModal} 
          onClose={() => {
            setShowScheduleModal(false);
            resetNewMeeting();
          }}
          title="Schedule New Meeting"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Meeting Title</label>
              <input
                type="text"
                value={newMeeting.title}
                onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter meeting title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Description</label>
              <textarea
                value={newMeeting.description}
                onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 h-24 resize-none backdrop-blur-sm transition-all duration-200"
                placeholder="Enter meeting description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Agenda</label>
              <textarea
                value={newMeeting.agenda}
                onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 h-20 resize-none backdrop-blur-sm transition-all duration-200"
                placeholder="Enter meeting agenda"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Date</label>
                <input
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 backdrop-blur-sm transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Time</label>
                <input
                  type="time"
                  value={newMeeting.time}
                  onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Duration (minutes)</label>
              <select
                value={newMeeting.duration}
                onChange={(e) => setNewMeeting({...newMeeting, duration: parseInt(e.target.value)})}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 backdrop-blur-sm transition-all duration-200"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={newMeeting.isPrivate}
                  onChange={(e) => setNewMeeting({...newMeeting, isPrivate: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-slate-700/50 border-slate-600/50 rounded focus:ring-blue-500 focus:ring-2 focus:ring-blue-500/25"
                />
                <span className="text-sm text-slate-300">Private Meeting</span>
              </label>
              
              <select
                value={newMeeting.type}
                onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
                className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 backdrop-blur-sm transition-all duration-200"
              >
                <option value="one-time">One-time</option>
                <option value="recurring">Recurring</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleScheduleMeeting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
            >
              Schedule Meeting
            </button>
            <button
              onClick={() => {
                setShowScheduleModal(false);
                resetNewMeeting();
              }}
              className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-white py-3 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm"
            >
              Cancel
            </button>
          </div>
        </Modal>

        {/* Edit Meeting Modal */}
        <Modal 
          show={showEditModal} 
          onClose={() => {
            setShowEditModal(false);
            setEditingMeeting(null);
          }}
          title="Edit Meeting"
        >
          {editingMeeting && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Meeting Title</label>
                <input
                  type="text"
                  value={editingMeeting.title}
                  onChange={(e) => setEditingMeeting({...editingMeeting, title: e.target.value})}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 backdrop-blur-sm transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Description</label>
                <textarea
                  value={editingMeeting.description || ''}
                  onChange={(e) => setEditingMeeting({...editingMeeting, description: e.target.value})}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 h-24 resize-none backdrop-blur-sm transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Agenda</label>
                <textarea
                  value={editingMeeting.agenda || ''}
                  onChange={(e) => setEditingMeeting({...editingMeeting, agenda: e.target.value})}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 h-20 resize-none backdrop-blur-sm transition-all duration-200"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Date</label>
                  <input
                    type="date"
                    value={editingMeeting.date}
                    onChange={(e) => setEditingMeeting({...editingMeeting, date: e.target.value})}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Time</label>
                  <input
                    type="time"
                    value={editingMeeting.time}
                    onChange={(e) => setEditingMeeting({...editingMeeting, time: e.target.value})}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Duration (minutes)</label>
                <select
                  value={editingMeeting.duration}
                  onChange={(e) => setEditingMeeting({...editingMeeting, duration: parseInt(e.target.value)})}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 backdrop-blur-sm transition-all duration-200"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={editingMeeting.isPrivate}
                    onChange={(e) => setEditingMeeting({...editingMeeting, isPrivate: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-slate-700/50 border-slate-600/50 rounded focus:ring-blue-500 focus:ring-2 focus:ring-blue-500/25"
                  />
                  <span className="text-sm text-slate-300">Private Meeting</span>
                </label>
              </div>
            </div>
          )}
          
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleEditMeeting}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditingMeeting(null);
              }}
              className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-white py-3 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm"
            >
              Cancel
            </button>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal 
          show={showDeleteModal} 
          onClose={() => {
            setShowDeleteModal(false);
            setMeetingToDelete(null);
          }}
          title="Delete Meeting"
        >
          {meetingToDelete && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-800/30 rounded-lg backdrop-blur-sm">
                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Are you sure you want to delete this meeting?</p>
                  <p className="text-slate-300 text-sm mt-1">This action cannot be undone.</p>
                </div>
              </div>
              
              <div className="bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="text-white font-medium mb-2">{meetingToDelete.title}</h4>
                <p className="text-slate-300 text-sm">
                  {meetingToDelete.date} at {meetingToDelete.time}
                </p>
                <p className="text-slate-400 text-sm">
                  Organized by {meetingToDelete.organizer}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleDeleteMeeting}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Meeting
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setMeetingToDelete(null);
              }}
              className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-white py-3 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MeetingPlatform;