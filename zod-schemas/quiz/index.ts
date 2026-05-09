/*
 * Central quiz state module for the application.
 * This file defines and re-exports all quiz-related types, schemas, and utilities,
 * including form state, runtime quiz session state, user interaction tracking,
 * and UI state management. It acts as the shared contract between quiz creation,
 * gameplay logic, and UI components.
*/
export * from "./form";
export * from "./question";
export * from "./save-quiz";

export type { QuestionSchema } from './question'

export interface FormState {
    topic: string;
    difficulty: string;
    numOfQuestions: number;
    isLoading: boolean;
}

export interface QuizState {
    quizStarted: boolean;
    questions: Array<{
        question: string,
        options: string[],
        correctAnswer: string,
        explanation: string
    }>;
    currentQuestionIndex: number;
    quizFinished: boolean
}

export interface InteractionState {
    userAnswer: (string | null)[];
}

export interface UiState {
    dialogs: {
        showAsianAlert: boolean
        showResultDialog: boolean
        showTimeUpDialog: boolean
    };

    savedQuizId: string | null;
}

