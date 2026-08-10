import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Home } from '@/pages/Home';
import { Dashboard } from '@/pages/Dashboard';
import { Officers } from '@/pages/Officers';
import { Transcripts } from '@/pages/Transcripts';
import { Login } from '@/pages/Login';
import { NotFound } from '@/pages/NotFound';

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="officers" element={<Officers />} />
          <Route path="transcripts" element={<Transcripts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
