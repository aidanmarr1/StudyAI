'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

// Add UserProfile type
export type UserProfile = {
  id: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  userProfile: UserProfile | null;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error: Error | null }>;
  uploadAvatar: (file: File) => Promise<{ success: boolean; error: Error | null; url?: string }>;
  signUp: (email: string, password: string) => Promise<{
    error: Error | null;
    data: any | null;
  }>;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: any | null;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      // Mock implementation - in a real app, this would fetch from Supabase
      setUserProfile({
        id: user.id,
        display_name: "Demo User",
        username: "demouser",
        email: user.email
      });
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { success: false, error: new Error('User not logged in') };
    
    try {
      // Mock implementation - in a real app, this would update Supabase
      setUserProfile(prev => prev ? { ...prev, ...updates } : null);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error as Error };
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return { success: false, error: new Error('User not logged in') };
    
    try {
      // Mock implementation - in a real app, this would upload to storage
      const mockUrl = `https://via.placeholder.com/150?text=${file.name.substring(0, 5)}`;
      await updateProfile({ avatar_url: mockUrl });
      return { success: true, error: null, url: mockUrl };
    } catch (error) {
      console.error('Error uploading avatar:', error);
      return { success: false, error: error as Error };
    }
  };

  useEffect(() => {
    // Get session from Supabase
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (session?.user) {
        await refreshProfile();
      }
    };

    getSession();

    // Set up auth subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        if (session?.user) {
          await refreshProfile();
        } else {
          setUserProfile(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { data, error };
  };

  const signOut = async () => {
    setUserProfile(null);
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    isLoading,
    userProfile,
    refreshProfile,
    updateProfile,
    uploadAvatar,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 