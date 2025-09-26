import { createContext, useContext } from 'react';

export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  email: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
