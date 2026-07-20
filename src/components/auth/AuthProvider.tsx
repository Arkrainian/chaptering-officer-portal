import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AuthContext, type AuthUser } from '@/hooks/useAuth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading] = useState(false);

  const signIn = useCallback(async (email: string, _password: string) => {
    setUser({ id: 'placeholder-user', email });
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, signIn, signOut }),
    [user, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
