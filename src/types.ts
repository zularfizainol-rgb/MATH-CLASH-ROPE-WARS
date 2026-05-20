export type GameMode = 1 | 2;
export type GameState = 'menu' | 'playing' | 'result';
export type Tahap = 1 | 2;

export interface QuestionData {
  questionText: string;
  answer: number;
}
