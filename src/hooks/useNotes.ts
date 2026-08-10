import { useCallback, useEffect, useState } from 'react';
import { createNote, fetchNotes, ServiceError } from '@/services/supabase/noteService';
import type { Note } from '@/types/database';

interface UseNotesResult {
  notes: Note[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  addNote: (content: string) => Promise<boolean>;
}

export function useNotes(): UseNotesResult {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (err) {
      setError(err instanceof ServiceError ? err.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    void refresh();
  }, [refresh]);

  const addNote = useCallback(
    async (content: string) => {
      setIsSaving(true);
      setError(null);
      try {
        await createNote(content);
        await refresh();
        return true;
      } catch (err) {
        setError(err instanceof ServiceError ? err.message : 'Something went wrong.');
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [refresh],
  );

  return { notes, isLoading, isSaving, error, addNote };
}
