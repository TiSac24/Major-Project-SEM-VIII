import { createContext, useContext, useEffect, useState } from 'react';
import { loginApi, setAuthToken } from '../lib/api.js';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('auth_profile') : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
      }
    } catch {
      // ignore parse errors and start with empty profile
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = async (email, password) => {
    const data = await loginApi(email, password);

    // Map backend user shape to existing profile expectations
    const mappedProfile = {
      id: data.user.id,
      email: data.user.email,
      full_name: data.user.name,
      role: data.user.role,
    };

    setAuthToken(data.token);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('auth_profile', JSON.stringify(mappedProfile));
    }

    setProfile(mappedProfile);
  };

  const signUp = async (email, password, fullName) => {
    throw new Error('Sign up is disabled in this demo');
  };

  const signOut = async () => {
    setAuthToken(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth_profile');
    }
    setProfile(null);
  };

  const user = profile ? { id: profile.id } : null;

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // Remove the signUp function to prevent registration
  const { signUp, ...rest } = context;
  return rest;
}
