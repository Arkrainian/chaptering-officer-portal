import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function Home() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Chaptering Officer Portal
      </h1>
      <p className="mt-4 text-base text-slate-600">
        This portal will eventually allow officers to manage chaptering requests and related
        workflows. This early version demonstrates the application&apos;s architecture and its
        connection to a live database.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/database-demo">
          <Button>Try the database demo</Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="secondary">View dashboard</Button>
        </Link>
      </div>

      <Card className="mt-12 text-left">
        <h2 className="text-sm font-semibold text-slate-900">About this prototype</h2>
        <p className="mt-2 text-sm text-slate-600">
          This build proves out the core architecture &mdash; a React/Vite frontend backed by a
          Supabase database &mdash; that the full Chaptering Officer Portal will be built on.
          Navigation, authentication scaffolding, and a database service layer are already in place
          so future features (case management, officer records, reporting, and more) can be added
          without reworking the foundation.
        </p>
      </Card>
    </div>
  );
}
