import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AuthContext, type AuthUser } from '@/hooks/useAuth';

/**
 * Placeholder auth provider. It only tracks user state in memory so the
 * rest of the app (ProtectedRoute, nav, etc.) has something to react to.
 *
 * TODO(auth): wire this up to Supabase Auth:
 *   - on mount, call supabase.auth.getSession() to restore an existing session
 *   - subscribe with supabase.auth.onAuthStateChange to keep `user` in sync
 *   - implement signIn with supabase.auth.signInWithPassword
 *   - implement signOut with supabase.auth.signOut
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading] = useState(false);

  const signIn = useCallback(async (email: string, _password: string) => {
    // TODO(auth): replace with supabase.auth.signInWithPassword({ email, password })
    setUser({ id: 'placeholder-user', email });
  }, []);

  const signOut = useCallback(async () => {
    // TODO(auth): replace with supabase.auth.signOut()
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, signIn, signOut }),
    [user, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
