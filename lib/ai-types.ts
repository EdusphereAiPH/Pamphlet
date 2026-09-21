// Shared between server (lib/gemini.ts) and client components. Keep this file free of server imports.

export type DemoQuestion = {
  question: string;
  options: string[]; // exactly 4
  answer: number; // index into options
};

export type DemoResult = {
  summary: string;
  questions: DemoQuestion[]; // exactly 3
  note: string;
};

export type AiMode = "ask" | "demo" | "intro";

export const LIMITS = {
  lessonChars: 3000,
  questionChars: 300,
  schoolChars: 200,
} as const;
