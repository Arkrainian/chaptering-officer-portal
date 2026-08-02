import { type FormEvent, useMemo, useState } from 'react';
import { useTranscriptDigest } from '@/hooks/useTranscriptDigest';
import { usePeople } from '@/hooks/usePeople';
import { Card } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PageHeading } from '@/components/ui/PageHeading';

export function Transcripts() {
  const {
    digests,
    isLoading,
    isSummarizing,
    isSaving,
    error,
    pendingDigest,
    summarize,
    save,
    discardPending,
  } = useTranscriptDigest();
  const { people, addPerson } = usePeople();
  const [transcript, setTranscript] = useState('');
  const [selectedPersonId, setSelectedPersonId] = useState('');
  const [newPersonName, setNewPersonName] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const digest of digests) {
      if (digest.person_id) {
        map.set(digest.person_id, (map.get(digest.person_id) ?? 0) + 1);
      }
    }
    return map;
  }, [digests]);

  const visibleDigests = useMemo(() => {
    if (!activeFilter) return digests;
    return digests.filter((digest) => digest.person_id === activeFilter);
  }, [digests, activeFilter]);

  const handleSummarize = async (event: FormEvent) => {
    event.preventDefault();
    await summarize(transcript);
  };

  const handleAddPerson = async (event: FormEvent) => {
    event.preventDefault();
    const person = await addPerson(newPersonName);
    if (person) {
      setNewPersonName('');
      setSelectedPersonId(person.id);
    }
  };

  const handleSave = async () => {
    const saved = await save(transcript, selectedPersonId || null);
    if (saved) {
      setTranscript('');
      setSelectedPersonId('');
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeading
        title="Meeting Transcript Summarizer"
        description="Paste a meeting transcript, get a concise digest, then save it for the chapter's records."
      />

      <Card>
        <h2 className="text-sm font-semibold text-slate-900">Transcript</h2>
        <form className="mt-4 flex flex-col gap-3" onSubmit={handleSummarize}>
          <Textarea
            aria-label="Meeting transcript"
            placeholder="Paste the raw meeting transcript here…"
            rows={10}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            disabled={isSummarizing}
          />
          <div>
            <Button type="submit" disabled={isSummarizing || transcript.trim().length === 0}>
              {isSummarizing ? 'Summarizing…' : 'Summarize'}
            </Button>
          </div>
        </form>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </Card>

      {pendingDigest && (
        <Card className="mt-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-sm font-semibold text-slate-900">{pendingDigest.title || 'Digest'}</h2>
            <div className="flex shrink-0 gap-2">
              <Button variant="secondary" onClick={discardPending} disabled={isSaving}>
                Discard
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving…' : 'Save to database'}
              </Button>
            </div>
          </div>

          <p className="mt-3 text-sm text-slate-700">{pendingDigest.overview}</p>

          <DigestSection title="Decisions" items={pendingDigest.decisions} />

          {pendingDigest.action_items.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action items
              </h3>
              <ul className="mt-2 space-y-1">
                {pendingDigest.action_items.map((item, i) => (
                  <li key={i} className="text-sm text-slate-700">
                    <span className="font-medium">{item.owner}:</span> {item.task}
                    {item.due && <span className="text-slate-500"> (due {item.due})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <DigestSection title="Key points" items={pendingDigest.key_points} />
          <DigestSection title="Open questions" items={pendingDigest.open_questions} />

          {pendingDigest.attendees.length > 0 && (
            <p className="mt-4 text-xs text-slate-500">
              Attendees: {pendingDigest.attendees.join(', ')}
            </p>
          )}

          <div className="mt-4 border-t border-slate-200 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              File under
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <select
                aria-label="Person"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                value={selectedPersonId}
                onChange={(e) => setSelectedPersonId(e.target.value)}
                disabled={isSaving}
              >
                <option value="">No person</option>
                {people.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
              <form className="flex gap-2" onSubmit={handleAddPerson}>
                <Input
                  aria-label="New person name"
                  placeholder="Add a new person…"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  className="w-40"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={newPersonName.trim().length === 0}
                >
                  Add
                </Button>
              </form>
            </div>
          </div>
        </Card>
      )}

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-slate-900">Saved digests</h2>

        {people.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                activeFilter === null
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All ({digests.length})
            </button>
            {people.map((person) => (
              <button
                key={person.id}
                type="button"
                onClick={() => setActiveFilter(person.id)}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  activeFilter === person.id
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {person.name} ({counts.get(person.id) ?? 0})
              </button>
            ))}
          </div>
        )}

        <div className="mt-3">
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading digests…</p>
          ) : visibleDigests.length === 0 ? (
            <p className="text-sm text-slate-500">
              {activeFilter ? 'No digests filed under this person yet.' : 'No digests saved yet.'}
            </p>
          ) : (
            <ul className="space-y-3">
              {visibleDigests.map((digest) => {
                const person = people.find((p) => p.id === digest.person_id);
                return (
                  <li key={digest.id}>
                    <Card>
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {digest.title || 'Untitled meeting'}
                        </h3>
                        <span className="shrink-0 text-xs text-slate-400">
                          {new Date(digest.created_at).toLocaleString()}
                        </span>
                      </div>
                      {person && (
                        <p className="mt-1 text-xs font-medium text-slate-500">{person.name}</p>
                      )}
                      <p className="mt-2 text-sm text-slate-700">{digest.overview}</p>
                    </Card>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function DigestSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
