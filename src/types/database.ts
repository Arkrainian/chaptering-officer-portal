/**
 * Row types for Supabase tables.
 * TODO: once the schema grows (officers, cases, etc.), consider generating
 * these with `supabase gen types typescript` instead of hand-writing them.
 */
export interface DemoMessage {
  id: string;
  message: string;
  created_at: string;
}

export interface DemoMessageInsert {
  message: string;
}
