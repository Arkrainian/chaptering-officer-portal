import { isSupabaseConfigured, supabase } from './client';
import type { DemoMessage } from '@/types/database';

const TABLE = 'demo_messages';

export class ServiceError extends Error {}

function logError(context: string, error: unknown): void {
  console.error(`[messageService] ${context}:`, error);
}

export async function fetchMessages(): Promise<DemoMessage[]> {
  if (!isSupabaseConfigured) {
    throw new ServiceError('Database is not configured yet. Set up your .env file to continue.');
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select('id, message, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    logError('fetchMessages', error);
    throw new ServiceError('Could not load saved messages. Please try again.');
  }

  return data ?? [];
}

export async function createMessage(message: string): Promise<DemoMessage> {
  if (!isSupabaseConfigured) {
    throw new ServiceError('Database is not configured yet. Set up your .env file to continue.');
  }

  const trimmed = message.trim();
  if (!trimmed) {
    throw new ServiceError('Message cannot be empty.');
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({ message: trimmed })
    .select('id, message, created_at')
    .single();

  if (error) {
    logError('createMessage', error);
    throw new ServiceError('Could not save your message. Please try again.');
  }

  return data;
}
