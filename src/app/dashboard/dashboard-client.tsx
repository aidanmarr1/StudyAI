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
  ListChecks, Sparkles, ChevronRight, PlusCircle, FileText,
  AlertTriangle, Loader2
} from 'lucide-react';
import { supabase } from '../../utils/supabase';

// Color palette for charts
const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

// Default data for when DB tables don't exist or fetch fails
const DEFAULT_STUDY_TIME_DATA = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1.8 },
  { day: 'Wed', hours: 3.2 },
  { day: 'Thu', hours: 2.0 },
  { day: 'Fri', hours: 1.5 },
  { day: 'Sat', hours: 0.5 },
  { day: 'Sun', hours: 1.0 },
];

const DEFAULT_SUBJECT_DISTRIBUTION = [
  { name: 'Math', value: 35 },
  { name: 'Science', value: 25 },
  { name: 'English', value: 20 },
  { name: 'History', value: 15 },
  { name: 'Art', value: 5 },
];

const DEFAULT_RECENT_ACTIVITIES = [
  {
    id: 1,
    activity: 'Completed Biology Flashcard Set',
    timestamp: '1 hour ago',
    icon: <ListChecks size={18} className="text-indigo-500" />,
    performance: 'Good'
  },
  {
    id: 2,
    activity: 'Created notes for Chemistry',
    timestamp: '3 hours ago',
    icon: <FileText size={18} className="text-blue-500" />,
    performance: null
  },
  {
    id: 3,
    activity: 'Study session: Advanced Calculus',
    timestamp: 'Yesterday',
    icon: <BookOpen size={18} className="text-green-500" />,
    performance: 'Excellent'
  },
  {
    id: 4,
    activity: 'AI Tutor Session: English Literature',
    timestamp: '2 days ago',
    icon: <BrainCircuit size={18} className="text-purple-500" />,
    performance: null
  }
];

const DEFAULT_UPCOMING_TASKS = [
  {
    id: 1,
    task: 'Complete Physics Problem Set',
    dueDate: 'Today',
    priority: 'high'
  },
  {
    id: 2,
    task: 'Review History Flashcards',
    dueDate: 'Tomorrow',
    priority: 'medium'
  },
  {
    id: 3,
    task: 'Prepare for Literature Quiz',
    dueDate: 'In 2 days',
    priority: 'high'
  }
];

export default function DashboardClient() {
  // We'll wrap the component in ProtectedRoute later
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, userProfile, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // State for data
  const [studyTimeData, setStudyTimeData] = useState<any[]>(DEFAULT_STUDY_TIME_DATA);
  const [subjectDistribution, setSubjectDistribution] = useState<any[]>(DEFAULT_SUBJECT_DISTRIBUTION);
  const [recentActivities, setRecentActivities] = useState<any[]>(DEFAULT_RECENT_ACTIVITIES);
  const [upcomingTasks, setUpcomingTasks] = useState<any[]>(DEFAULT_UPCOMING_TASKS);
  const [stats, setStats] = useState({
    totalStudyHours: 12.5,
    totalFlashcards: 324,
    streakDays: 7,
    upcomingTaskCount: 3,
  });
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Helper functions for formatting
  const formatTimeAgo = (date: Date) => {
    // In a real app, implement proper time ago formatting
    return '2 hours ago';
  };
  
  const formatTaskDueDate = (date: Date) => {
    // In a real app, implement proper date formatting
    return 'Tomorrow';
  };
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
          <p className="mt-2 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (loadError) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <div className="max-w-md text-center">
          <AlertTriangle className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{loadError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <button className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-md text-sm flex items-center">
              <PlusCircle className="h-4 w-4 mr-1" />
              New Study Session
            </button>
            
            <Link href="/profile" className="flex items-center">
              <div className="relative h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                {userProfile?.display_name?.[0] || user?.email?.[0] || 'U'}
              </div>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 mr-4">
              <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Study Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStudyHours} hours</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
              <ListChecks className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Flashcards Created</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalFlashcards}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.streakDays} days</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900 mr-4">
              <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.upcomingTaskCount}</p>
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Study Time (Past Week)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={studyTimeData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject Distribution</h2>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Activities and Tasks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
              <Link href="/activities" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="px-6 py-4 flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.activity}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.timestamp}
                    </p>
                  </div>
                  {activity.performance && (
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${activity.performance === 'Excellent' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}
                    `}>
                      {activity.performance}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Tasks</h2>
              <Link href="/tasks" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="px-6 py-4 flex items-center">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {task.task}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Due: {task.dueDate}
                    </p>
                  </div>
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${task.priority === 'high' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' 
                      : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}
                  `}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 