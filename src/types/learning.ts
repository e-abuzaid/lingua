/**
 * Learning Content System Types
 * 
 * Defines core models for supported languages, units, lessons, activities,
 * vocabulary, phrases, lesson goals, and AI teacher prompts for Vision Agent lessons.
 */

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  learnersCount: string;
  isPopular?: boolean;
  greeting: string;
  level?: string;
  description?: string;
}

export type ActivityType =
  | "multiple_choice"
  | "translate"
  | "listen_and_repeat"
  | "conversation"
  | "fill_in_the_blank";

export interface LessonActivity {
  id: string;
  type: ActivityType;
  prompt: string;
  question?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  hint?: string;
  audioPrompt?: string;
}

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "phrase"
  | "pronoun"
  | "preposition"
  | "other";

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  phonetic?: string;
  partOfSpeech?: PartOfSpeech;
  exampleSentence?: string;
  exampleTranslation?: string;
  audioPrompt?: string;
}

export interface PhraseItem {
  id: string;
  phrase: string;
  translation: string;
  context?: string;
  phonetic?: string;
}

export interface DialogueTurn {
  speaker: "teacher" | "student";
  text: string;
  translation?: string;
}

export interface AITeacherPrompt {
  systemPrompt: string;
  welcomeMessage: string;
  scenario: string;
  targetLanguage: string;
  keyPhrasesToElicit: string[];
  feedbackCriteria: string[];
  sampleDialogues?: DialogueTurn[];
}

export type LessonStatus = "locked" | "available" | "in_progress" | "completed";

export interface Lesson {
  id: string;
  unitId: string;
  languageId: string;
  lessonNumber: number;
  title: string;
  description: string;
  status: LessonStatus;
  xpReward: number;
  estimatedMinutes: number;
  icon?: string;
  goals: string[];
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: LessonActivity[];
  aiTeacherPrompt: AITeacherPrompt;
}

export interface Unit {
  id: string;
  languageId: string;
  unitNumber: number;
  title: string;
  description: string;
  level: string;
  order: number;
  lessonIds: string[];
}

export type TodayPlanType = "lesson" | "ai_conversation" | "vocabulary" | "video_call";

export interface TodayPlanItem {
  id: string;
  title: string;
  subtitle: string;
  type: TodayPlanType;
  completed: boolean;
  lessonId?: string;
  xpReward?: number;
}

