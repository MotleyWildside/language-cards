export type LanguageCode = 'en' | 'ru' | 'pl' | 'es' | 'de' | 'fr' | string;

// Enum for difficulty levels
export type DifficultyLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// Enum for learning status
export type LearningStatus = 'learned' | 'neutral' | 'to_review';

// Main card interface
export interface LanguageCard {
  /** Unique identifier (UUID) */
  id: string;

  /** Word or phrase in the primary language */
  term: string;

  /** Translation to the secondary language */
  translation: string;

  /** Primary language (ISO code) */
  lang_primary: LanguageCode;

  /** Secondary language (ISO code) */
  lang_secondary: LanguageCode;

  /** Card categories (can be multiple) */
  category: string[];

  /** Difficulty level (A1–C2) */
  difficulty: DifficultyLevel;

  /** Learning status */
  status: LearningStatus;

  /** ISO date of creation */
  created_at: string;
}
