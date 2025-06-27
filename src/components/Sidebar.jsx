import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Code, 
  Video, 
  Share2, 
  Home,
  LogOut,
  UserPlus
} from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../components/firebase'; 
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../components/firebase';

const Sidebar = ({ currentPath, onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role || 'user';
            setUserRole(role);
          } else {
            console.warn('User document not found.');
            setUserRole('user');
          }
        } catch (err) {
          console.error('Error fetching user role:', err);
          setUserRole('user');
        }
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
      setLoading(false);
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

  if (loading) return null;

  const getDashboardPath = () => {
    switch (userRole) {
      case 'admin':
        return '/admindashboard';
      case 'employee':
        return '/employeedashboard';
      case 'user':
      default:
        return '/userdashboard';
    }
  };

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    ...(userRole ? [{ icon: LayoutDashboard, label: 'Dashboard', path: getDashboardPath() }] : []),
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
      flex flex-col border-r border-gray-700 z-10
    `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={toggleSidebar}
          className={`flex items-center w-full hover:bg-gray-800 rounded-lg p-2 transition-colors ${isExpanded ? 'justify-start' : 'justify-center'}`}
          title={!isExpanded ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold flex-shrink-0">
            T
          </div>
          {isExpanded && (
            <span className="ml-3 font-semibold text-lg whitespace-nowrap">Team collab</span>
          )}
        </button>
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

      {/* Footer (Clickable User Profile) */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => handleNavigation('/user-profile')}
          className={`flex items-center w-full hover:bg-gray-800 p-2 rounded-lg transition-colors ${isExpanded ? 'justify-start' : 'justify-center'}`}
          title="Go to Profile"
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
            {isLoggedIn ? 'U' : '?'}
          </div>
          {isExpanded && (
            <div className="ml-3 min-w-0 text-left">
              <div className="text-sm font-medium truncate">
                {isLoggedIn ? 'User' : 'Guest'}
              </div>
              <div className="text-xs text-gray-400">
                {isLoggedIn ? 'Online' : 'Offline'}
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
