import React, { useState, useEffect } from 'react';
import { API_BASE, LOCAL_STORAGE_KEY, TOKEN_STORAGE_KEY } from '@/lib/config';
import { AuthContext, User, UserRole } from '@/context/auth-context';

// This file now only exports a component (AuthProvider), keeping Fast Refresh happy

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (username: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      // Treat the provided username as email for backend compatibility
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });
      if (!res.ok) {
        let msg = 'Login failed';
        try { const j = await res.json(); msg = j.error || msg; } catch (_e) { /* ignore parse error */ }
        return { ok: false, error: msg };
      }
      const data = await res.json();
      const role: UserRole = 'user';
      const loggedInUser: User = {
        username: data.user.name || data.user.email,
        email: data.user.email,
        role,
      };
      setUser(loggedInUser);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loggedInUser));
      if (data.token) localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Network error' };
    }
  };

  const register = async (username: string, email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, password }),
      });
      if (!res.ok) {
        let msg = 'Registration failed';
        try { const j = await res.json(); msg = j.error || msg; } catch (_e) { /* ignore parse error */ }
        return { ok: false, error: msg };
      }
      const data = await res.json();
      const role: UserRole = 'user';
      const registeredUser: User = {
        username: data.user.name || username,
        email: data.user.email,
        role,
      };
      setUser(registeredUser);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(registeredUser));
      if (data.token) localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Network error' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser } as User;
      setUser(newUser);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
