import { createContext, useContext } from 'react';

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  // TODO: replace with supabase.auth.signInWithPassword (or OAuth/magic link)
  signIn: (email: string, password: string) => Promise<void>;
  // TODO: replace with supabase.auth.signOut
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
