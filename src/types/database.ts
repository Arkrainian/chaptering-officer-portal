export interface DemoMessage {
  id: string;
  message: string;
  created_at: string;
}

export interface DemoMessageInsert {
  message: string;
}

export interface ActionItem {
  owner: string;
  task: string;
  due: string;
}

export interface Note {
  id: string;
  content: string;
  created_at: string;
}

export interface NoteInsert {
  content: string;
}

export interface Person {
  id: string;
  name: string;
  created_at: string;
}

export interface PersonInsert {
  name: string;
}

export interface TranscriptDigest {
  title: string;
  overview: string;
  decisions: string[];
  action_items: ActionItem[];
  key_points: string[];
  open_questions: string[];
  attendees: string[];
}

export interface MeetingDigest extends TranscriptDigest {
  id: string;
  transcript: string;
  created_at: string;
  person_id: string | null;
}

export interface MeetingDigestInsert extends TranscriptDigest {
  transcript: string;
  person_id: string | null;
}
