import { type FormEvent, useState } from 'react';
import { useMessages } from '@/hooks/useMessages';
import { PageHeading } from '@/components/ui/PageHeading';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function DatabaseDemo() {
  const { messages, isLoading, isSaving, error, saveMessage } = useMessages();
  const [draft, setDraft] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const saved = await saveMessage(draft);
    if (saved) {
      setDraft('');
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeading
        title="Database Demo"
        description="Proves the frontend can read from and write to the connected Supabase database."
      />

      <Card>
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
          <Input
            aria-label="Message"
            placeholder="Type a message to save…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={isSaving}
          />
          <Button type="submit" disabled={isSaving || draft.trim().length === 0}>
            {isSaving ? 'Saving…' : 'Save to Database'}
          </Button>
        </form>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </Card>

      <Card className="mt-6">
        <h2 className="text-sm font-semibold text-slate-900">Saved records</h2>
        {isLoading ? (
          <p className="mt-3 text-sm text-slate-500">Loading records…</p>
        ) : messages.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">No messages saved yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {messages.map((item) => (
              <li key={item.id} className="py-2 text-sm">
                <p className="text-slate-900">{item.message}</p>
                <p className="text-xs text-slate-400">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
