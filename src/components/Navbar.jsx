import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Code, 
  Video, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Home
} from 'lucide-react';

const Sidebar = ({ currentPath, onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: Code, label: 'Code Editor', path: '/code-editor' },
    { icon: Video, label: 'Meetings', path: '/meetings' },
    { icon: Share2, label: 'File Share', path: '/file-share' }
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

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
              key={item.path}
              onClick={() => handleNavigation(item.path)}
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
            U
          </div>
          {isExpanded && (
            <div className="ml-3 min-w-0">
              <div className="text-sm font-medium truncate">User</div>
              <div className="text-xs text-gray-400">Online</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;