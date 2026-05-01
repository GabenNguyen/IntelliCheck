/*
This is a helper function to save the generated quiz to the db via API route.
*/
import type { QuestionUI } from "@/app/quiz/types";
import { saveQuizRequestSchema, saveQuizResponseSchema } from "@/app/quiz/schema";

export default async function saveQuizToDB(
    topic: string,
    difficulty: string,
    questions: QuestionUI[]
): Promise<{ success: boolean; quizId?: string; error?: string }> {
    try {
        // format the quiz data to match the SaveQuizRequest interface
        const quizData = {
            title: `${topic} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`,
            subject: topic,
            description: `A ${difficulty} quiz on ${topic}`,
            questions: questions.map(question => {
                const correctLetter = question.correctAnswer.charAt(0).toUpperCase(); // Take the first character from the answwer

                return {
                    question: question.question,
                    correctAnswer: correctLetter,
                    optionA: question.options[0],
                    optionB: question.options[1],
                    optionC: question.options[2],
                    optionD: question.options[3],
                }
            })
        }

        // validate REQUEST before sending
        const parsedRequest = saveQuizRequestSchema.safeParse(quizData);

        if (!parsedRequest.success) {
            return {
                success: false,
                error: "Invalid quiz data before sending to server",
            };
        }

        // send the quizData to the save-quiz API route
        const response = await fetch('/api/save-quiz', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parsedRequest.data)
        })

        const responseData = await response.json();

        const validatedData = saveQuizResponseSchema.safeParse(responseData);

        if (!validatedData.success) {
            return {
                success: false,
                error: "Invalid response from server"
            }
        }

        const result = validatedData.data;

        return {
            success: true,
            quizId: result.quiz.id
        }

    } catch (error) {
        console.error("Error saving quiz to DB:", error);
        return { success: false, error: "Failed to save quiz to database." };
    }
}