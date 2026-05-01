import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { saveQuizRequestSchema, saveQuizResponseSchema } from "@/app/quiz/schema";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        // check if the user is authenticated
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorised access" },
                { status: 401 } // 401: unauthorised
            );
        }

        // parse the request body from the helper function
        const json = await req.json();

        const parsed = saveQuizRequestSchema.safeParse(json);

        // Converts Zod error issues into a flat object where each field path 
        // (e.g. "title" or "questions.0.correctAnswer")
        // maps to its corresponding error message, making it easier to display validation errors in forms.
        const errors = parsed.error?.issues.reduce((acc, issue) => {
            const path = issue.path.join(".");
            acc[path] = issue.message;
            return acc;
        }, {} as Record<string, string>)

        if (!parsed.success) {
            return NextResponse.json(
                { error: errors },
                { status: 400 }
            );
        }

        const body = parsed.data;

        const quizData = await prisma.quiz.create({
            data: {
                title: body.title,
                subject: body.subject,
                description: body.description || "",
                questionCount: body.questions.length,
                timeSaved: Math.round(body.questions.length * 5 * (0.8 + Math.random() * 0.4)), // estimated time saved for auto-generated questions
                questions: {
                    create: body.questions.map((question) => ({
                        question: question.question,
                        correctAnswer: question.correctAnswer,
                        optionA: question.optionA,
                        optionB: question.optionB,
                        optionC: question.optionC,
                        optionD: question.optionD,
                    }))
                },
                userId: userId
            },
            include: {
                questions: true
            }
        });

        // return the result
        const responsePayload = {
            success: true,
            quiz: {
                id: quizData.id,
                title: quizData.title,
                subject: quizData.subject,
                questionCount: quizData.questionCount,
                createdAt: quizData.createdAt.toISOString(),
            }
        }

        const validatedResponse = saveQuizResponseSchema.safeParse(responsePayload);

        if (!validatedResponse.success) {
            return NextResponse.json(
                { error: validatedResponse.error.issues },
                { status: 500 }
            );
        }

        return NextResponse.json(validatedResponse.data, { status: 201 });

    } catch (error) {
        console.error("Error: ", error)
        return NextResponse.json(
            { error: "Internal Server Error " },
            { status: 500 }
        )
    }
}