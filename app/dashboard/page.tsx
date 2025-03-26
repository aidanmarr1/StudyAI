'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  BookOpen, Clock, Award, Calendar, BrainCircuit, 
  ListChecks, Sparkles, ChevronRight, PlusCircle, FileText
} from 'lucide-react';

// Sample data for visualizations
const studyTimeData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1.8 },
  { day: 'Wed', hours: 3.2 },
  { day: 'Thu', hours: 2.1 },
  { day: 'Fri', hours: 1.5 },
  { day: 'Sat', hours: 0.8 },
  { day: 'Sun', hours: 2.3 },
];

const subjectDistribution = [
  { name: 'Math', value: 35 },
  { name: 'Science', value: 25 },
  { name: 'English', value: 20 },
  { name: 'History', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const recentActivities = [
  { 
    id: 1, 
    activity: 'Completed Math Flashcards', 
    timestamp: '2 hours ago',
    icon: <ListChecks size={18} className="text-indigo-500" />,
    performance: 'Great'
  },
  { 
    id: 2, 
    activity: 'AI-generated Study Notes: Physics', 
    timestamp: '6 hours ago',
    icon: <BrainCircuit size={18} className="text-purple-500" />,
    performance: null
  },
  { 
    id: 3, 
    activity: 'Study Session: Biology', 
    timestamp: 'Yesterday',
    icon: <BookOpen size={18} className="text-green-500" />,
    performance: 'Good'
  },
  { 
    id: 4, 
    activity: 'Created new flashcard deck', 
    timestamp: '3 days ago',
    icon: <FileText size={18} className="text-blue-500" />,
    performance: null
  },
];

const upcomingTasks = [
  {
    id: 1,
    task: 'Review Chemistry Notes',
    dueDate: 'Today',
    priority: 'High'
  },
  {
    id: 2,
    task: 'Math Practice Test',
    dueDate: 'Tomorrow',
    priority: 'Medium'
  },
  {
    id: 3,
    task: 'Complete History Essay',
    dueDate: 'In 3 days',
    priority: 'High'
  },
];

export default function DashboardPage() {
  const { user, userProfile, signOut, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  useEffect(() => {
    // Load user profile data
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        await refreshProfile();
      } catch (error: any) {
        console.error("Error loading profile:", error);
        
        // Check if the error is related to a missing profiles table
        if (error?.message?.includes('relation "public.profiles" does not exist') || 
            error?.message?.includes('42P01')) {
          setLoadError(`Database table "profiles" is missing. Please contact the administrator to run the required database migrations.`);
        } else {
          setLoadError("Failed to load profile data. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      loadProfile();
    } else {
      setIsLoading(false);
    }
  }, [refreshProfile, user]);

  const handleSignOut = async () => {
    await signOut();
    // AuthContext will handle the redirection
  };
  
  // Calculate study statistics
  const totalStudyHours = studyTimeData.reduce((total, day) => total + day.hours, 0);
  const totalFlashcards = 478; // Sample data
  const streakDays = 12; // Sample data
  
  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-indigo-500 border-b-transparent border-l-transparent border-r-transparent animate-spin"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (loadError) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="text-center">
                <h2 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">Error Loading Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{loadError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Dashboard Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mr-4">Dashboard</h1>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                  Premium
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  href="/profile" 
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {userProfile?.avatar_url ? (
                      <Image
                        src={userProfile.avatar_url}
                        alt="Profile"
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                          {userProfile?.display_name?.charAt(0) || userProfile?.username?.charAt(0) || user?.email?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="font-medium hidden sm:inline">{userProfile?.display_name || userProfile?.username || user?.email}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 rounded-md transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Total Study Time
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          {totalStudyHours.toFixed(1)} hrs
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link href="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                    View all sessions
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Flashcards Reviewed
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          {totalFlashcards}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link href="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                    Review flashcards
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Streak
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          {streakDays} days
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link href="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                    View achievements
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Upcoming Tasks
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          {upcomingTasks.length}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link href="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                    View schedule
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mb-8">
            {/* Study Time Chart */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 lg:col-span-2">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Weekly Study Activity</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={studyTimeData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="day" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        borderColor: '#374151',
                        color: '#F9FAFB'
                      }}
                      itemStyle={{ color: '#F9FAFB' }}
                      labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Bar dataKey="hours" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Subject Distribution */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Study Subjects</h2>
              <div className="h-64 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={subjectDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subjectDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {subjectDistribution.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div className="w-3 h-3 mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Activity Feed and Tasks */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg lg:col-span-2">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {activity.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.activity}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                        </div>
                      </div>
                      {activity.performance && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activity.performance === 'Great' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        }`}>
                          {activity.performance}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="px-6 py-4">
                  <Link href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center">
                    View all activity 
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Upcoming Tasks */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Tasks</h2>
                <button className="p-1 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900">
                  <PlusCircle size={20} />
                </button>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{task.task}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">{task.dueDate}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                            task.priority === 'High' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="px-6 py-4">
                  <Link href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center">
                    View all tasks
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link 
                href="#" 
                className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
              >
                <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">Start Study Session</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Track your study time</p>
                </div>
              </Link>
              
              <Link 
                href="#" 
                className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
              >
                <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">Create Flashcards</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Build your collection</p>
                </div>
              </Link>
              
              <Link 
                href="#" 
                className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
              >
                <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                  <BrainCircuit className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">AI Study Assistant</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get personalized help</p>
                </div>
              </Link>
              
              <Link 
                href="#" 
                className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
              >
                <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                  <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">Study Planner</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Organize your schedule</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 