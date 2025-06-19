import React, { useState, useCallback } from 'react';
import { Mail, ArrowLeft, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../components/firebase';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    if (status) {
      setStatus('');
      setMessage('');
    }
  }, [status]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus('success');
      setMessage('Password reset email sent! Check your inbox and spam folder.');
    } catch (error) {
      setStatus('error');
      switch (error.code) {
        case 'auth/user-not-found':
          setMessage('This email is not registered. Please check or sign up.');
          break;
        case 'auth/invalid-email':
          setMessage('Please enter a valid email address');
          break;
        case 'auth/too-many-requests':
          setMessage('Too many requests. Please try again later');
          break;
        default:
          setMessage('Failed to send reset email. Please try again');
      }
    }
  }, [email]);

  const handleBackToLogin = useCallback(() => {
     navigate('/signin-up');
    console.log('Navigate to login page');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-xl">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Team collab
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Reset Your Password</h1>
          <p className="text-gray-400">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <button
            type="button"
            onClick={handleBackToLogin}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Sign In</span>
          </button>

          {status === 'success' ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-green-500/20 rounded-full">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Email Sent!</h3>
                <p className="text-gray-400 mb-6">{message}</p>
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or try again in a few minutes.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setStatus('');
                    setMessage('');
                    setEmail('');
                  }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  Send Another Email
                </button>
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full py-3 px-4 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-200 hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-gray-500/50"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      autoComplete="email"
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:outline-none transition-colors duration-200 ${
                        status === 'error'
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                          : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500/50'
                      }`}
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm">{message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full py-3 px-4 font-semibold rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    status === 'loading'
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {status === 'loading' ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Reset Email'
                  )}
                </button>
              </div>
            </form>
          )}

          {status !== 'success' && (
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Remember your password?</p>
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors focus:outline-none"
                >
                  Sign in instead
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            Having trouble? Contact support for additional help with your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
