import { useCallback, useEffect, useState } from 'react';
import {
  fetchDigests,
  saveDigest,
  ServiceError,
  summarizeTranscript,
} from '@/services/supabase/transcriptService';
import type { MeetingDigest, TranscriptDigest } from '@/types/database';

interface UseTranscriptDigestResult {
  digests: MeetingDigest[];
  isLoading: boolean;
  isSummarizing: boolean;
  isSaving: boolean;
  error: string | null;
  pendingDigest: TranscriptDigest | null;
  summarize: (transcript: string) => Promise<void>;
  save: (transcript: string, personId: string | null) => Promise<boolean>;
  discardPending: () => void;
}

export function useTranscriptDigest(): UseTranscriptDigestResult {
  const [digests, setDigests] = useState<MeetingDigest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingDigest, setPendingDigest] = useState<TranscriptDigest | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDigests();
      setDigests(data);
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

  const summarize = useCallback(async (transcript: string) => {
    setIsSummarizing(true);
    setError(null);
    setPendingDigest(null);
    try {
      const digest = await summarizeTranscript(transcript);
      setPendingDigest(digest);
    } catch (err) {
      setError(err instanceof ServiceError ? err.message : 'Something went wrong.');
    } finally {
      setIsSummarizing(false);
    }
  }, []);

  const save = useCallback(
    async (transcript: string, personId: string | null) => {
      if (!pendingDigest) return false;
      setIsSaving(true);
      setError(null);
      try {
        await saveDigest({ ...pendingDigest, transcript: transcript.trim(), person_id: personId });
        setPendingDigest(null);
        await refresh();
        return true;
      } catch (err) {
        setError(err instanceof ServiceError ? err.message : 'Something went wrong.');
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [pendingDigest, refresh],
  );

  const discardPending = useCallback(() => setPendingDigest(null), []);

  return {
    digests,
    isLoading,
    isSummarizing,
    isSaving,
    error,
    pendingDigest,
    summarize,
    save,
    discardPending,
  };
}
