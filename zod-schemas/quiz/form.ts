import { z } from "zod";
import validateTopicLogic from "@/utils/validate_input";


// Form input validation schema
// Validates: topic, difficulty, numOfQuestions before API call
export const quizFormSchema = z.object({
    topic: z
        .string()
        .trim()
        .min(1, "Topic is required")
        .max(100, "Topic must be less than 100 characters")
        .regex(/^[a-zA-Z0-9\s\-_,:;.'()]+$/, "Invalid characters")
        .refine(validateTopicLogic, {
            message: "Topic failed validation rules"
        }),

    difficulty: z.enum(
        ["easy", "normal", "hard", "asian"],
    ),

    numOfQuestions: z
        .number()
        .min(1, "Required at least 1 question")
        .max(50)
});

