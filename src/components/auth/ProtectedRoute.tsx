import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

/**
 * Wrap any route element that should require a signed-in user.
 *
 * TODO(auth): once Supabase Auth is wired up, also consider role-based
 * checks here (e.g. redirect non-officers away from officer-only pages).
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
