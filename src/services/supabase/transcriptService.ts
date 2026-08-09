import { isSupabaseConfigured, supabase } from './client';
import type { MeetingDigest, MeetingDigestInsert, TranscriptDigest } from '@/types/database';

export type MeetingDigestUpdate = Partial<Omit<MeetingDigest, 'id' | 'created_at'>>;

const TABLE = 'meeting_digests';

export class ServiceError extends Error {}

function logError(context: string, error: unknown): void {
  console.error(`[transcriptService] ${context}:`, error);
}

export async function summarizeTranscript(transcript: string): Promise<TranscriptDigest> {
  if (!isSupabaseConfigured) {
    throw new ServiceError('Database is not configured yet. Set up your .env file to continue.');
  }

  const trimmed = transcript.trim();
  if (!trimmed) {
    throw new ServiceError('Paste a transcript before summarizing.');
  }

  const { data, error } = await supabase.functions.invoke<TranscriptDigest>('summarize-transcript', {
    body: { transcript: trimmed },
  });

  if (error || !data) {
    logError('summarizeTranscript', error);
    throw new ServiceError('Could not summarize the transcript. Please try again.');
  }

  return data;
}

export async function fetchDigests(): Promise<MeetingDigest[]> {
  if (!isSupabaseConfigured) {
    throw new ServiceError('Database is not configured yet. Set up your .env file to continue.');
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select(
      'id, title, transcript, overview, decisions, action_items, key_points, open_questions, attendees, created_at, person_id',
    )
    .order('created_at', { ascending: false });

  if (error) {
    logError('fetchDigests', error);
    throw new ServiceError('Could not load saved digests. Please try again.');
  }

  return data ?? [];
}

export async function saveDigest(digest: MeetingDigestInsert): Promise<MeetingDigest> {
  if (!isSupabaseConfigured) {
    throw new ServiceError('Database is not configured yet. Set up your .env file to continue.');
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert(digest)
    .select(
      'id, title, transcript, overview, decisions, action_items, key_points, open_questions, attendees, created_at, person_id',
    )
    .single();

  if (error) {
    logError('saveDigest', error);
    throw new ServiceError('Could not save the digest. Please try again.');
  }

  return data;
}

export async function updateDigest(
  id: string,
  patch: MeetingDigestUpdate,
): Promise<MeetingDigest> {
  if (!isSupabaseConfigured) {
    throw new ServiceError('Database is not configured yet. Set up your .env file to continue.');
  }

  const { data, error } = await supabase
    .from(TABLE)
    .update(patch)
    .eq('id', id)
    .select(
      'id, title, transcript, overview, decisions, action_items, key_points, open_questions, attendees, created_at, person_id',
    )
    .single();

  if (error) {
    logError('updateDigest', error);
    throw new ServiceError('Could not update the digest. Please try again.');
  }

  return data;
}

export async function deleteDigest(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new ServiceError('Database is not configured yet. Set up your .env file to continue.');
  }

  const { error } = await supabase.from(TABLE).delete().eq('id', id);

  if (error) {
    logError('deleteDigest', error);
    throw new ServiceError('Could not delete the digest. Please try again.');
  }
}
