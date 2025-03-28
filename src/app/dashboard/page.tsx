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
  { day: 'Mon', hours: 0 },
  { day: 'Tue', hours: 0 },
  { day: 'Wed', hours: 0 },
  { day: 'Thu', hours: 0 },
  { day: 'Fri', hours: 0 },
  { day: 'Sat', hours: 0 },
  { day: 'Sun', hours: 0 },
];

const DEFAULT_SUBJECT_DISTRIBUTION = [
  { name: 'Math', value: 1 },
  { name: 'Science', value: 1 },
  { name: 'English', value: 1 },
];

export default function DashboardPage() {
  const { user, userProfile, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // State for real data
  const [studyTimeData, setStudyTimeData] = useState<any[]>(DEFAULT_STUDY_TIME_DATA);
  const [subjectDistribution, setSubjectDistribution] = useState<any[]>(DEFAULT_SUBJECT_DISTRIBUTION);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalStudyHours: 0,
    totalFlashcards: 0,
    streakDays: 0,
    upcomingTaskCount: 0,
  });
  
  // Functions to fetch real data
  const fetchStudyTimeData = async () => {
    try {
      // Fetch real study time data from the database
      const { data, error } = await supabase
        .from('study_sessions')
        .select('created_at, duration')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(7);
      
      if (error) {
        console.error('Error fetching study time data:', error);
        if (error.code === '42P01') {
          // Table doesn't exist, use default data
          console.log('study_sessions table does not exist, using default data');
          return;
        }
        throw error;
      }
      
      if (data && data.length > 0) {
        // Process data to get daily study hours for the past week
        const last7Days = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d;
        }).reverse();
        
        const formattedData = last7Days.map(date => {
          const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayData = data.filter(session => {
            const sessionDate = new Date(session.created_at);
            return sessionDate.toDateString() === date.toDateString();
          });
          
          const hours = dayData.reduce((sum, session) => sum + (session.duration / 60), 0);
          
          return {
            day: dayStr,
            hours: parseFloat(hours.toFixed(1))
          };
        });
        
        setStudyTimeData(formattedData);
      }
    } catch (error) {
      console.error('Error in fetchStudyTimeData:', error);
      // Default data is already set in state initialization
    }
  };
  
  const fetchSubjectDistribution = async () => {
    try {
      // Fetch real subject distribution from the database
      const { data, error } = await supabase
        .from('flashcard_decks')
        .select('subject, count')
        .eq('user_id', user?.id)
        .order('count', { ascending: false });
      
      if (error) {
        console.error('Error fetching subject distribution:', error);
        if (error.code === '42P01') {
          // Table doesn't exist, use default data
          console.log('flashcard_decks table does not exist, using default data');
          return;
        }
        throw error;
      }
      
      if (data && data.length > 0) {
        // Group by subject and count
        const subjectMap = new Map();
        
        data.forEach(deck => {
          const currentCount = subjectMap.get(deck.subject) || 0;
          subjectMap.set(deck.subject, currentCount + (deck.count || 1));
        });
        
        const formattedData = Array.from(subjectMap.entries()).map(([subject, value]) => ({
          name: subject,
          value: value
        }));
        
        setSubjectDistribution(formattedData);
      }
    } catch (error) {
      console.error('Error in fetchSubjectDistribution:', error);
      // Default data is already set in state initialization
    }
  };
  
  const fetchRecentActivities = async () => {
    try {
      // Fetch real activities from the database
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (error) {
        console.error('Error fetching recent activities:', error);
        if (error.code === '42P01') {
          // Table doesn't exist, use default data
          console.log('user_activities table does not exist, using default data');
          return;
        }
        throw error;
      }
      
      if (data && data.length > 0) {
        const processedActivities = data.map(activity => {
          // Format the activity data
          const timestamp = formatTimeAgo(new Date(activity.created_at));
          
          // Determine icon based on activity type
          let icon;
          switch (activity.type) {
            case 'flashcard_review':
              icon = <ListChecks size={18} className="text-indigo-500" />;
              break;
            case 'study_session':
              icon = <BookOpen size={18} className="text-green-500" />;
              break;
            case 'note_creation':
              icon = <FileText size={18} className="text-blue-500" />;
              break;
            case 'ai_session':
              icon = <BrainCircuit size={18} className="text-purple-500" />;
              break;
            default:
              icon = <FileText size={18} className="text-blue-500" />;
          }
          
          return {
            id: activity.id,
            activity: activity.description,
            timestamp,
            icon,
            performance: activity.performance || null
          };
        });
        
        setRecentActivities(processedActivities);
      }
    } catch (error) {
      console.error('Error in fetchRecentActivities:', error);
      // Empty array is fine for no activities
    }
  };
  
  const fetchUpcomingTasks = async () => {
    try {
      // Fetch real tasks from the database
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_completed', false)
        .gte('due_date', new Date().toISOString())
        .order('due_date', { ascending: true })
        .limit(3);
      
      if (error) {
        console.error('Error fetching upcoming tasks:', error);
        if (error.code === '42P01') {
          // Table doesn't exist, use default data
          console.log('tasks table does not exist, using default data');
          return;
        }
        throw error;
      }
      
      if (data && data.length > 0) {
        const processedTasks = data.map(task => {
          // Format the due date
          const dueDate = formatTaskDueDate(new Date(task.due_date));
          
          return {
            id: task.id,
            task: task.title,
            dueDate,
            priority: task.priority || 'Medium'
          };
        });
        
        setUpcomingTasks(processedTasks);
        setStats(prev => ({ ...prev, upcomingTaskCount: data.length }));
      }
    } catch (error) {
      console.error('Error in fetchUpcomingTasks:', error);
      // Empty array is fine for no tasks
    }
  };
  
  const fetchStats = async () => {
    try {
      // We'll set some default values
      let totalHours = 0;
      let totalFlashcards = 0;
      let streakDays = 0;
      
      try {
        // Fetch total study hours
        const { data: studyData, error: studyError } = await supabase
          .from('study_sessions')
          .select('duration')
          .eq('user_id', user?.id);
        
        if (!studyError && studyData) {
          totalHours = studyData.reduce((sum, session) => sum + (session.duration / 60), 0);
        }
      } catch (error) {
        console.error('Error fetching study hours:', error);
      }
      
      try {
        // Fetch total flashcards
        const { data: flashcardData, error: flashcardError } = await supabase
          .from('flashcards')
          .select('count(*)', { count: 'exact' })
          .eq('user_id', user?.id);
        
        if (!flashcardError && flashcardData) {
          totalFlashcards = flashcardData.length || 0;
        }
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
      
      try {
        // Fetch streak data
        const { data: streakData, error: streakError } = await supabase
          .from('user_streaks')
          .select('current_streak')
          .eq('user_id', user?.id)
          .single();
        
        if (!streakError && streakData) {
          streakDays = streakData.current_streak;
        }
      } catch (error) {
        console.error('Error fetching streak data:', error);
      }
      
      setStats({
        totalStudyHours: parseFloat(totalHours.toFixed(1)),
        totalFlashcards,
        streakDays,
        upcomingTaskCount: upcomingTasks.length,
      });
    } catch (error) {
      console.error('Error in fetchStats:', error);
      // Keep default stats
    }
  };
  
  useEffect(() => {
    // Load user profile and data
    const loadData = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        
        // Set a loading timeout to prevent infinite loading - max 2 seconds
        const timeoutId = setTimeout(() => {
          console.log('Loading timed out after 2 seconds');
          setIsLoading(false);
        }, 2000);
        
        if (user) {
          try {
            await refreshProfile();
          } catch (profileError) {
            console.error("Error refreshing profile:", profileError);
            // Continue even if profile refresh fails
          }
          
          // Fetch all data in parallel and catch errors for each
          Promise.allSettled([
            fetchStudyTimeData().catch(e => console.error("Study time data error:", e)),
            fetchSubjectDistribution().catch(e => console.error("Subject distribution error:", e)),
            fetchRecentActivities().catch(e => console.error("Recent activities error:", e)),
            fetchUpcomingTasks().catch(e => console.error("Upcoming tasks error:", e)),
          ]).finally(() => {
            // Ensure loading is set to false when all promises settle
            clearTimeout(timeoutId);
            setIsLoading(false);
          });
          
          // Fetch stats - don't await this to prevent loading delays
          fetchStats().catch(e => console.error("Stats error:", e));
        } else {
          // No user, clear timeout and stop loading
          clearTimeout(timeoutId);
          setIsLoading(false);
        }
      } catch (error: any) {
        console.error("Error loading data:", error);
        
        if (error?.message?.includes('relation') || error?.code === '42P01') {
          setLoadError(`Some database tables may be missing. The dashboard will still work with default data.`);
        } else {
          setLoadError("Failed to load all dashboard data. Some sections may show default values.");
        }
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, refreshProfile]);

  // Helper function to format relative time
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`;
    if (diffInSeconds < 172800) return 'Yesterday';
    
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };
  
  // Helper function to format task due dates
  const formatTaskDueDate = (date: Date) => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === now.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 3600 * 24));
    if (diffInDays < 7) return `In ${diffInDays} days`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="text-center mb-4">
            <AlertTriangle size={40} className="text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
            <h2 className="text-lg font-medium text-yellow-600 dark:text-yellow-400 mb-2">Dashboard Notice</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{loadError}</p>
          </div>
          <div className="text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              You can continue using the dashboard with sample data while we set up your personal data.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back{userProfile?.display_name ? `, ${userProfile.display_name.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Here's an overview of your learning progress and upcoming tasks.
        </p>
      </div>
      
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
                      {stats.totalStudyHours} hrs
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/study-sessions" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
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
                    Flashcards
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {stats.totalFlashcards}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/flashcards" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
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
                      {stats.streakDays} days
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/achievements" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
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
                      {stats.upcomingTaskCount}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/tasks" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
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
          {studyTimeData.length > 0 ? (
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
          ) : (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400">No study activity data available</p>
                <Link 
                  href="/dashboard/study-sessions/new" 
                  className="inline-flex items-center mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Start your first session <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* Subject Distribution */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Study Subjects</h2>
          {subjectDistribution.length > 0 && subjectDistribution[0].name !== 'No data' ? (
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
          ) : (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400">No subject data available</p>
                <Link 
                  href="/dashboard/flashcards/new" 
                  className="inline-flex items-center mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Create your first flashcard deck <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Activity Feed and Tasks */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg lg:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
            <Link 
              href="/dashboard/activities" 
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
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
              ))
            ) : (
              <div className="py-8 px-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">No activity recorded yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Activities will appear here as you use StudyAI
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Tasks</h2>
            <Link 
              href="/dashboard/tasks/new" 
              className="p-1 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900"
            >
              <PlusCircle size={20} />
            </Link>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
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
              ))
            ) : (
              <div className="py-8 px-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">No tasks scheduled</p>
                <Link 
                  href="/dashboard/tasks/new" 
                  className="inline-flex items-center mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Create your first task <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            )}
            {upcomingTasks.length > 0 && (
              <div className="px-6 py-4">
                <Link 
                  href="/dashboard/tasks" 
                  className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center"
                >
                  View all tasks
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link 
            href="/dashboard/study-sessions/new" 
            className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
          >
            <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full">
              <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white">Start Study Session</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track your study time</p>
            </div>
          </Link>
          
          <Link 
            href="/dashboard/flashcards/new" 
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
            href="/dashboard/ai-assistant" 
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
            href="/dashboard/tasks" 
            className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
          >
            <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
              <ListChecks className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white">Manage Tasks</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Organize your schedule</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 