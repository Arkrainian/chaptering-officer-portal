import { isSupabaseConfigured, supabase } from './client';
import type { Note } from '@/types/database';

const TABLE = 'notes';

export class ServiceError extends Error {}

function logError(context: string, error: unknown): void {
  console.error(`[noteService] ${context}:`, error);
}

export async function fetchNotes(): Promise<Note[]> {
  if (!isSupabaseConfigured) {
    throw new ServiceError('Database is not configured yet. Set up your .env file to continue.');
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select('id, content, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    logError('fetchNotes', error);
    throw new ServiceError('Could not load notes. Please try again.');
  }

  return data ?? [];
}

export async function createNote(content: string): Promise<Note> {
  if (!isSupabaseConfigured) {
    throw new ServiceError('Database is not configured yet. Set up your .env file to continue.');
  }

  const trimmed = content.trim();
  if (!trimmed) {
    throw new ServiceError('Note cannot be empty.');
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({ content: trimmed })
    .select('id, content, created_at')
    .single();

  if (error) {
    logError('createNote', error);
    throw new ServiceError('Could not save your note. Please try again.');
  }

  return data;
}
