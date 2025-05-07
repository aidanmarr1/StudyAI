export default function ProfilePage() {
  return <ProfileClient />;
}

'use client';

import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Link from 'next/link';
import { 
  User, Settings, Key, LogOut, Upload, 
  Save, ArrowLeft, AlertTriangle, Loader2
} from 'lucide-react';

function ProfileClient() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user, userProfile, signOut, updateProfile } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    displayName: userProfile?.display_name || '',
    username: userProfile?.username || '',
    email: user?.email || '',
    phone: userProfile?.phone || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);
      
      // In a real app, this would update the user profile in Supabase
      await updateProfile({
        display_name: formData.displayName,
        username: formData.username,
        phone: formData.phone
      });
      
      setSuccess('Profile updated successfully');
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      // After sign out, the auth context should redirect to the sign-in page
    } catch (error: any) {
      setError(error.message || 'Failed to sign out');
    }
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <Link href="/dashboard" className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Sidebar */}
            <div className="md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
              <nav className="py-4">
                <div className="px-6 py-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="text-indigo-700 dark:text-indigo-300 font-medium">Profile</span>
                  </div>
                </div>
                <div className="px-6 py-4 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Preferences</span>
                  </div>
                </div>
                <div className="px-6 py-4 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <div className="flex items-center">
                    <Key className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Password</span>
                  </div>
                </div>
              </nav>
              
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={handleSignOut}
                  className="flex items-center text-red-500 hover:text-red-700 font-medium"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:w-3/4 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Profile</h2>
              
              {/* Profile Image */}
              <div className="mb-8 flex items-center">
                <div className="h-20 w-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                  {userProfile?.display_name?.[0] || user?.email?.[0] || 'U'}
                </div>
                <div className="ml-6">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="text-green-700 dark:text-green-300">{success}</p>
                </div>
              )}
              
              {/* Profile Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Email cannot be changed</p>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number (optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 