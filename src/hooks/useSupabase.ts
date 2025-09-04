// src/hooks/useSupabase.ts
import { useState, useEffect } from 'react'
import { supabase, type Profile } from '../lib/supabase'
import { environment } from '../config/environment';

// Authentication hook
export function useUser() {
  const [user, setUser] = useState<unknown>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Get initial session
    const loadSession = async () => {
      setLoading(true)
      setError(null)
      try {
        // Check if Supabase is properly configured
        if (!environment.isConfigured) {
          console.warn('Supabase is not configured. Running in demo mode.');
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          setError(sessionError)
          setLoading(false)
          return
        }
        
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setLoading(false)
        }
      } catch (err) {
        console.error('Error loading session:', err)
        setError(err)
        setLoading(false)
      }
    }
    
    loadSession()

    // Listen for auth changes
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setLoading(true)
          setUser(session?.user ?? null)
          
          if (session?.user) {
            await fetchProfile(session.user.id)
          } else {
            setProfile(null)
            setLoading(false)
          }
        }
      )

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    } catch (err) {
      console.error('Error setting up auth state change listener:', err)
      setError(err)
      setLoading(false)
      return () => {};
    }

  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (status === 401) {
        console.error('Unauthorized: Invalid API key or session');
        setError(new Error('Authentication error: Please check your Supabase credentials.'));
        setLoading(false);
        return;
      }
      
      if (error) {
        console.error('Error fetching profile:', error);
        setError(error)
      } else if (data) {
        setProfile(data)
        setLoading(false)
      } else {
        console.warn('No profile data found for user');
        setLoading(false)
      }
    } catch (err) {
      console.error('Error in fetchProfile:', err)
      setError(err)
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signUp = async (email: string, password: string, userData: Record<string, unknown>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name,
          role: userData.role,
          organization_id: userData.organization || null
        }
      }
    });
    
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user logged in' }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (data) setProfile(data)
    return { data, error }
  }

  return {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile
  }
}