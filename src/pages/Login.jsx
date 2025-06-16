import React, { useState, useCallback, useMemo } from 'react';
import { Eye, EyeOff, Users, Shield, Code, Hash, Mail, Lock, User, Building, Github } from 'lucide-react';

const AuthSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    organizationName: '',
    organizationCode: '',
    userType: 'self'
  });

  // Stable input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }, []);

  const generateOrgCode = useCallback(() => {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (currentView === 'signup' && userRole === 'admin') {
      const orgCode = generateOrgCode();
      alert(`Organization created! Your code is: ${orgCode}\nShare this code with team members to join your organization.`);
    } else {
      alert(`${currentView === 'login' ? 'Login' : 'Signup'} successful!`);
    }
  }, [currentView, userRole, generateOrgCode]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Memoized components to prevent unnecessary re-renders
  const SocialButton = useMemo(() => ({ icon: Icon, provider, color }) => (
    <button
      type="button"
      className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-600 hover:border-gray-500 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-200 group"
    >
      <Icon className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
      <span>Continue with {provider}</span>
    </button>
  ), []);

  const RoleCard = useMemo(() => ({ role, icon: Icon, title, description, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
        isSelected 
          ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
          : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`p-4 rounded-full ${isSelected ? 'bg-blue-500/20' : 'bg-gray-700'}`}>
          <Icon className={`w-8 h-8 ${isSelected ? 'text-blue-400' : 'text-gray-400'}`} />
        </div>
        <div>
          <h3 className={`font-semibold text-lg ${isSelected ? 'text-blue-300' : 'text-gray-300'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-400 mt-2">{description}</p>
        </div>
      </div>
    </div>
  ), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-xl">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Team collab
            </div>
          </div>
          <p className="text-gray-400">
            {currentView === 'login' ? 'Welcome back to your workspace' : 'Join the developer community'}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex mb-8 bg-gray-800/50 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setCurrentView('login')}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                currentView === 'login'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('signup')}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                currentView === 'signup'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Role Selection for Signup */}
          {currentView === 'signup' && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Choose your role</h3>
              <div className="grid grid-cols-2 gap-4">
                <RoleCard
                  role="admin"
                  icon={Shield}
                  title="Admin"
                  description="Create and manage organizations"
                  isSelected={userRole === 'admin'}
                  onClick={() => setUserRole('admin')}
                />
                <RoleCard
                  role="user"
                  icon={Users}
                  title="User"
                  description="Join existing organizations"
                  isSelected={userRole === 'user'}
                  onClick={() => setUserRole('user')}
                />
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {currentView === 'signup' && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    key="fullName"
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  key="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  key="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {currentView === 'signup' && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    key="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none"
                  />
                </div>
              )}

              {/* Admin Organization Setup */}
              {currentView === 'signup' && userRole === 'admin' && (
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    key="organizationName"
                    type="text"
                    name="organizationName"
                    placeholder="Organization Name"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none"
                  />
                </div>
              )}

              {/* User Join Options */}
              {currentView === 'signup' && userRole === 'user' && (
                <>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-300">I am a:</h4>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="userType"
                          value="self"
                          checked={formData.userType === 'self'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
                          formData.userType === 'self' ? 'border-blue-500 bg-blue-500' : 'border-gray-500'
                        }`}>
                          {formData.userType === 'self' && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-gray-300">Individual</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="userType"
                          value="employee"
                          checked={formData.userType === 'employee'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
                          formData.userType === 'employee' ? 'border-blue-500 bg-blue-500' : 'border-gray-500'
                        }`}>
                          {formData.userType === 'employee' && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-gray-300">Employee</span>
                      </label>
                    </div>
                  </div>

                  {formData.userType === 'employee' && (
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <input
                        key="organizationCode"
                        type="text"
                        name="organizationCode"
                        placeholder="Organization Code"
                        value={formData.organizationCode}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none"
                      />
                    </div>
                  )}
                </>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {currentView === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">or continue with</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <SocialButton icon={Github} provider="GitHub" color="text-white" />
            <SocialButton icon={Mail} provider="Google" color="text-red-400" />
            <div className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-600 hover:border-gray-500 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-200 group cursor-pointer">
              <svg className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Continue with Facebook</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {currentView === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setCurrentView(currentView === 'login' ? 'signup' : 'login')}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors focus:outline-none"
              >
                {currentView === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;