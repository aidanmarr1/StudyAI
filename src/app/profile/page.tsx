'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth, UserProfile } from '../../utils/AuthContext';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Edit, Award, Cake, Mail, Phone, Eye, EyeOff, 
  Shield, FileCheck, BookOpen, Clock, Sparkles 
} from 'lucide-react';

// Sample achievements data
const achievements = [
  { 
    id: 1, 
    name: 'Early Adopter', 
    description: 'Joined StudyAI during the beta phase', 
    icon: <Sparkles className="w-5 h-5 text-yellow-500" />,
    earned: true
  },
  { 
    id: 2, 
    name: 'Study Streak', 
    description: 'Studied for 7 consecutive days', 
    icon: <Clock className="w-5 h-5 text-purple-500" />,
    earned: true
  },
  { 
    id: 3, 
    name: 'Flashcard Master', 
    description: 'Created over 100 flashcards', 
    icon: <BookOpen className="w-5 h-5 text-blue-500" />,
    earned: false
  },
  { 
    id: 4, 
    name: 'Perfect Score', 
    description: 'Achieved 100% on a practice test', 
    icon: <FileCheck className="w-5 h-5 text-green-500" />,
    earned: true
  },
];

export default function ProfilePage() {
  const { user, userProfile, updateProfile, uploadAvatar, refreshProfile } = useAuth();
  
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    activityVisible: true
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Effect to load initial user profile data when it changes
  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || '');
      setDisplayName(userProfile.display_name || '');
      setAvatarUrl(userProfile.avatar_url || null);
      setIsLoading(false);
    }
  }, [userProfile]);
  
  // Load profile on mount
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        await refreshProfile();
        // If refreshProfile doesn't set the userProfile state after 3 seconds, stop loading
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } catch (error) {
        console.error('Error loading profile:', error);
        setIsLoading(false);
      }
    };
    
    if (user) {
      loadProfileData();
    } else {
      setIsLoading(false);
    }
  }, [refreshProfile, user]);
  
  // Handle avatar file selection
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    
    // Validate file size (2MB max)
    if (fileSizeInMB > 2) {
      setMessage({
        type: 'error',
        text: 'Image too large. Please select an image under 2MB.'
      });
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setMessage({
        type: 'error',
        text: 'Please select a valid image file.'
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const { error, url } = await uploadAvatar(file);
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (url) {
        setAvatarUrl(url);
        setMessage({
          type: 'success',
          text: 'Profile picture updated successfully!'
        });
      }
    } catch (error: unknown) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error uploading profile picture.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Trigger file input click
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  
  // Validate username format
  const validateUsername = (username: string): boolean => {
    if (!username) return true;
    
    try {
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(username)) {
        setUsernameError('Username must be 3-20 characters and can only contain letters, numbers, and underscores.');
        return false;
      }
      
      setUsernameError(null);
      return true;
    } catch (error) {
      console.error('Error validating username:', error);
      setUsernameError('Error validating username format.');
      return false;
    }
  };
  
  // Handle username change with validation
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate username format
    if (!validateUsername(username)) {
      return;
    }
    
    try {
      setIsLoading(true);
      setMessage(null);
      
      const profileData: Partial<UserProfile> = {};
      
      // Only include fields that have changed
      if (username !== (userProfile?.username || '')) {
        profileData.username = username || null;
      }
      
      if (displayName !== (userProfile?.display_name || '')) {
        profileData.display_name = displayName || null;
      }
      
      // If no changes, don't submit
      if (Object.keys(profileData).length === 0) {
        setMessage({
          type: 'error', 
          text: 'No changes to save.'
        });
        setIsLoading(false);
        return;
      }
      
      const { error } = await updateProfile(profileData);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
    } catch (error: unknown) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error updating profile.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle privacy setting changes
  const handlePrivacyChange = (setting: string, value: boolean | string) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: value
    });
  };
  
  // Get earned badges count
  const earnedBadgesCount = achievements.filter(badge => badge.earned).length;
  
  // Show loading state while user profile is loading
  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-b-transparent border-l-transparent border-r-transparent animate-spin mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300">Loading your profile...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Profile Header */}
        <div className="bg-indigo-600 dark:bg-indigo-800">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
              <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-0">
                <div 
                  onClick={handleAvatarClick}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden cursor-pointer border-4 border-white dark:border-gray-700 hover:opacity-90 transition-opacity shadow-lg mb-4 sm:mb-0 sm:mr-6"
                >
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="Profile picture"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-indigo-400 dark:bg-indigo-700">
                      <span className="text-white text-2xl font-bold">
                        {displayName?.charAt(0) || username?.charAt(0) || user?.email?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                    <Edit className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-1 -right-1 bg-indigo-500 dark:bg-indigo-600 p-1 rounded-full border-2 border-white dark:border-gray-700">
                    <Edit className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <input 
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {displayName || username || user?.email?.split('@')[0] || 'User'}
                  </h1>
                  <p className="text-indigo-200 mt-1">
                    @{username || user?.email?.split('@')[0] || 'user'}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-300 text-indigo-800 mr-2">
                      <Award className="w-3 h-3 mr-1" />
                      {earnedBadgesCount} Achievements
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-300 text-purple-800">
                      <Cake className="w-3 h-3 mr-1" />
                      Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 bg-white text-indigo-700 rounded-md hover:bg-indigo-50 font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('general')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'general'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                General Information
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'security'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Security & Privacy
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'achievements'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Achievements
              </button>
            </nav>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {message && (
            <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'}`}>
              {message.text}
            </div>
          )}
          
          {/* General Information Tab */}
          {activeTab === 'general' && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Update your personal information and how you appear on the platform
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Display Name
                    </label>
                    <input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your preferred display name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      This is how your name will appear to others
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Username
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                        @
                      </span>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="username"
                        className={`flex-1 block w-full rounded-none rounded-r-md border ${usernameError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} px-3 py-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    {usernameError ? (
                      <p className="mt-1 text-xs text-red-500">{usernameError}</p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        3-20 characters, letters, numbers, and underscores only
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        id="email"
                        type="email"
                        value={userProfile?.email || user?.email || ''}
                        disabled
                        className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 focus:outline-none"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Your email cannot be changed
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                        <Phone className="w-4 h-4" />
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        value={userProfile?.phone || ''}
                        disabled
                        className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 focus:outline-none"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Contact support to change your phone number
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading || !!usernameError}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Security & Privacy Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Password
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your password to keep your account secure
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Privacy Settings
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Control what information is visible to others
                  </p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Profile Visibility</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Determine who can see your profile
                      </p>
                    </div>
                    <div>
                      <select
                        value={privacySettings.profileVisibility}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        className="block w-36 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white text-sm"
                      >
                        <option value="public">Public</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Contact Information</h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Show email to others</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePrivacyChange('showEmail', !privacySettings.showEmail)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          privacySettings.showEmail ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span className="sr-only">Show email</span>
                        <span
                          className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            privacySettings.showEmail ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Show phone number to others</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePrivacyChange('showPhone', !privacySettings.showPhone)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          privacySettings.showPhone ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span className="sr-only">Show phone</span>
                        <span
                          className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            privacySettings.showPhone ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Activity Visibility</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Allow others to see your study activity and achievements
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePrivacyChange('activityVisible', !privacySettings.activityVisible)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          privacySettings.activityVisible ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span className="sr-only">Activity visibility</span>
                        <span
                          className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            privacySettings.activityVisible ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save Privacy Settings
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        Two-Factor Authentication
                      </h2>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Shield className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
                  </p>
                  
                  <button
                    type="button"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Enable Two-Factor Authentication
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Your Achievements</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Badges and awards earned through your study journey
                </p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {earnedBadgesCount} of {achievements.length} badges earned
                  </span>
                  <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${(earnedBadgesCount / achievements.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {achievements.map((badge) => (
                    <li 
                      key={badge.id} 
                      className={`border rounded-lg overflow-hidden p-4 ${
                        badge.earned 
                          ? 'border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-900/20' 
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-md mr-4 ${
                          badge.earned 
                            ? 'bg-indigo-100 dark:bg-indigo-800/50' 
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          {badge.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {badge.name}
                            {badge.earned && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Earned
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
} 