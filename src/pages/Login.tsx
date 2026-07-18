import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PageHeading } from '@/components/ui/PageHeading';

// TODO(auth): this is a placeholder screen. Replace the manual form submit
// with supabase.auth.signInWithPassword (or magic link / OAuth) once
// Supabase Auth is introduced.
export function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-sm">
      <PageHeading title="Sign in" description="Officer login (placeholder)." />
      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="officer@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <p className="text-xs text-slate-500">
            This form does not authenticate against Supabase yet &mdash; it only sets a placeholder
            session so protected routes can be demonstrated.
          </p>
        </form>
      </Card>
    </div>
  );
}
