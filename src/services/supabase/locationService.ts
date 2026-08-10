import { isSupabaseConfigured, supabase } from './client';
import type { ChapterLocation } from '@/types/database';

const TABLE = 'chapter_locations';

export class ServiceError extends Error {}

function logError(context: string, error: unknown): void {
  console.error(`[locationService] ${context}:`, error);
}

export async function fetchLocations(): Promise<ChapterLocation[]> {
  if (!isSupabaseConfigured) {
    throw new ServiceError('Database is not configured yet. Set up your .env file to continue.');
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select('id, name, created_at')
    .order('name', { ascending: true });

  if (error) {
    logError('fetchLocations', error);
    throw new ServiceError('Could not load chapter locations. Please try again.');
  }

  return data ?? [];
}

export async function createLocation(name: string): Promise<ChapterLocation> {
  if (!isSupabaseConfigured) {
    throw new ServiceError('Database is not configured yet. Set up your .env file to continue.');
  }

  const trimmed = name.trim();
  if (!trimmed) {
    throw new ServiceError('Name cannot be empty.');
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({ name: trimmed })
    .select('id, name, created_at')
    .single();

  if (error) {
    logError('createLocation', error);
    throw new ServiceError('Could not add that chapter location. Please try again.');
  }

  return data;
}
