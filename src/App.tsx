import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Home } from '@/pages/Home';
import { Dashboard } from '@/pages/Dashboard';
import { Cases } from '@/pages/Cases';
import { Officers } from '@/pages/Officers';
import { Settings } from '@/pages/Settings';
import { Login } from '@/pages/Login';
import { DatabaseDemo } from '@/pages/DatabaseDemo';
import { NotFound } from '@/pages/NotFound';

// NOTE: nav pages are left open (not wrapped in <ProtectedRoute>) for this
// prototype so navigation can be demoed without signing in first.
// TODO(auth): once Supabase Auth is wired up, wrap Dashboard/Cases/Officers/
// Settings in <ProtectedRoute> (see src/components/auth/ProtectedRoute.tsx).
export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="database-demo" element={<DatabaseDemo />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cases" element={<Cases />} />
          <Route path="officers" element={<Officers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
