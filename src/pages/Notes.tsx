import { type FormEvent, useState } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { Card } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { PageHeading } from '@/components/ui/PageHeading';

export function Notes() {
  const { notes, isLoading, isSaving, error, addNote } = useNotes();
  const [draft, setDraft] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const saved = await addNote(draft);
    if (saved) {
      setDraft('');
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeading
        title="Notes"
        description="Shared notes for the chapter — anyone can add one, and everyone can see them."
      />

      <Card>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Textarea
            aria-label="Note"
            placeholder="Add a note…"
            rows={4}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={isSaving}
          />
          <div>
            <Button type="submit" disabled={isSaving || draft.trim().length === 0}>
              {isSaving ? 'Adding…' : 'Add note'}
            </Button>
          </div>
        </form>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </Card>

      <div className="mt-6">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading notes…</p>
        ) : notes.length === 0 ? (
          <p className="text-sm text-slate-500">No notes yet — be the first to add one.</p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li key={note.id}>
                <Card>
                  <p className="whitespace-pre-wrap text-sm text-slate-700">{note.content}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
