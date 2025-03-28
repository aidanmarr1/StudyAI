'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth, UserProfile } from '../../utils/AuthContext';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Edit, Award, Cake, Mail, Phone, Eye, EyeOff, 
  Shield, FileCheck, BookOpen, Clock, Sparkles, AlertTriangle, Loader2 
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
    // Add a timeout to prevent infinite loading
    const loadTimeout = setTimeout(() => {
      if (isLoading) {
        console.log('Profile loading timed out after 10 seconds');
        setIsLoading(false);
      }
    }, 10000);
    
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setMessage(null);
        setError(null);
        if (user) {
          try {
            await refreshProfile();
          } catch (err: any) {
            console.error('Error refreshing profile:', err);
            setError('Failed to load profile data. Using default profile information.');
          }
        }
      } catch (err: any) {
        console.error('Error loading profile:', err);
        setError('Could not load profile data. Please try again later.');
      } finally {
        setIsLoading(false);
        clearTimeout(loadTimeout);
      }
    };
    
    loadProfile();
    
    return () => clearTimeout(loadTimeout);
  }, [user, refreshProfile]);
  
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
        profileData.username = username || undefined;
      }
      
      if (displayName !== (userProfile?.display_name || '')) {
        profileData.display_name = displayName || undefined;
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Not Signed In</h2>
          <p className="text-gray-600 mb-4">You need to sign in to view your profile.</p>
          <a 
            href="/auth/signin" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {message && (
            <div className={`mb-6 bg-${message.type === 'success' ? 'green' : 'red'}-50 dark:bg-${message.type === 'success' ? 'green' : 'red'}-900/20 p-4 rounded-lg`}>
              {message.text}
            </div>
          )}
          
          {error && (
            <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-3" />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">{error}</p>
              </div>
            </div>
          )}
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            {/* Profile header */}
            <div className="px-6 py-8 sm:px-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 mb-4 sm:mb-0">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <span className="text-4xl font-medium text-gray-500 dark:text-gray-400">
                        {displayName?.charAt(0) || username?.charAt(0) || user?.email?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="sm:ml-6 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {displayName || username || 'User'}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
                  <div className="mt-2 flex flex-wrap justify-center sm:justify-start">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 mr-2 mb-2">
                      Premium Member
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 mr-2 mb-2">
                      Active Streak: {userProfile?.streak_days || 0} days
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile details */}
            <div className="px-6 py-6 sm:px-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{userProfile?.username || 'Not set'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Display Name</h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{userProfile?.display_name || 'Not set'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">Premium</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {userProfile?.created_at 
                      ? new Date(userProfile.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {userProfile?.last_sign_in 
                      ? new Date(userProfile.last_sign_in).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                  </p>
                </div>
              </div>
            </div>
            
            {/* User stats */}
            <div className="px-6 py-6 sm:px-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Statistics</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300">Total Study Hours</h3>
                  <p className="mt-1 text-2xl font-semibold text-indigo-900 dark:text-indigo-100">{userProfile?.total_study_hours || 0}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300">Flashcards Created</h3>
                  <p className="mt-1 text-2xl font-semibold text-purple-900 dark:text-purple-100">{userProfile?.flashcards_created || 0}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Achievements Earned</h3>
                  <p className="mt-1 text-2xl font-semibold text-green-900 dark:text-green-100">{userProfile?.achievements_count || 0}</p>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="px-6 py-6 sm:px-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <a 
                  href="/settings" 
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Edit Profile
                </a>
                <a 
                  href="/dashboard" 
                  className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 