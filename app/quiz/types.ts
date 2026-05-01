import type { z } from "zod";
import { generateQuestionResponseSchema } from "./schema";

export type QuestionUI = z.infer<typeof generateQuestionResponseSchema>["outputQuestion"][number]

export interface FormState {
    topic: string;
    difficulty: string;
    numOfQuestions: number;
    isLoading: boolean;
}

export interface QuizState {
    quizStarted: boolean;
    questions: QuestionUI[];
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

