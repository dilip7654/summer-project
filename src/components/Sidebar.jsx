import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Code, 
  Video, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Home,
  LogOut,
  UserPlus
} from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../components/firebase'; 
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ currentPath, onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // new state for role
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        // Example: getting role from localStorage or user metadata
        const role = localStorage.getItem('userRole'); // 'admin' | 'employee' | 'user'
        setUserRole(role || 'user');
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  };

  const handleNavigation = (path) => {
    if (!isLoggedIn && path.includes('dashboard')) {
      alert('Please log in to access the dashboard.');
      return;
    }

    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Base items
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    ...(userRole === 'user' ? [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/userdashboard' }
    ] : []),
    ...(userRole === 'employee' ? [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/employeedashboard' }
    ] : []),
    ...(userRole === 'admin' ? [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admindashboard' }
    ] : []),
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: Code, label: 'Code Editor', path: '/code-editor' },
    { icon: Video, label: 'Meetings', path: '/meetings' },
    { icon: Share2, label: 'File Share', path: '/file-share' },
    !isLoggedIn
      ? { icon: UserPlus, label: 'Login', path: '/signin-up' }
      : { icon: LogOut, label: 'Logout', action: handleLogout }
  ];

  return (
    <div className={`
      bg-gray-900 text-white h-screen transition-all duration-300 ease-in-out
      ${isExpanded ? 'w-64' : 'w-16'}
      flex flex-col relative border-r border-gray-700 z-10
    `}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-gray-700 hover:bg-gray-600 rounded-full p-1 border border-gray-600 transition-colors z-20"
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className={`flex items-center ${isExpanded ? 'justify-start' : 'justify-center'}`}>
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold">
            A
          </div>
          {isExpanded && (
            <span className="ml-3 font-semibold text-lg">Team collab</span>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPath === item.path;

          return (
            <button
              key={item.label}
              onClick={() => item.action ? item.action() : handleNavigation(item.path)}
              className={`
                w-full flex items-center px-4 py-3 hover:bg-gray-800 transition-colors
                ${isActive ? 'bg-gray-800 border-r-2 border-blue-500' : ''}
                ${!isExpanded ? 'justify-center' : 'justify-start'}
              `}
              title={!isExpanded ? item.label : ''}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'} flex-shrink-0`} />
              {isExpanded && (
                <span className={`ml-3 ${isActive ? 'text-blue-400' : 'text-gray-300'} whitespace-nowrap`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className={`flex items-center ${isExpanded ? 'justify-start' : 'justify-center'}`}>
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
            {isLoggedIn ? 'U' : '?'}
          </div>
          {isExpanded && (
            <div className="ml-3 min-w-0">
              <div className="text-sm font-medium truncate">
                {isLoggedIn ? 'User' : 'Guest'}
              </div>
              <div className="text-xs text-gray-400">
                {isLoggedIn ? 'Online' : 'Offline'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
