import { z } from "zod";

export type QuestionSchema = z.infer<typeof generateQuestionResponseSchema>['outputQuestion'][number]

export const generateQuestionResponseSchema = z.object({
    outputQuestion: z.array(
        z.object({
            question: z.string().min(1, "Question text is required!"),
            options: z.array(
                z.string().regex(/^[A-D]\)\s.+$/, "Invalid option format")
            )
                .length(4, "Must have exactly 4 options"),
            correctAnswer: z.string().length(1, "Must have exactly 1 answer")
                .uppercase(),
            explanation: z.string().min(1, "Explanation required")
        })
            // Ensure correct answer matches one of the options
            .refine(
                (obj) => obj.options.some((opt) =>
                    opt.trim().toUpperCase().startsWith(`${obj.correctAnswer})`))
                , "Correct answer must match one of the provided options"
            ))
})

// Validates AI-generated questions
export const aiGeneratedQuestionsSchema = z.array(
    z.object({
        question: z.string().min(1),
        options: z.array(
            z.string().regex(/^[A-D]\)\s.+$/)
        )
            .length(4),
        correctAnswer: z.string().length(1).transform((letter: string) => letter.toUpperCase()),
        explanation: z.string().min(1)
    })
)
