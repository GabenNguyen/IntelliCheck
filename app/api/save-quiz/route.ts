import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

interface SaveQuizRequest {
    title: string;
    subject: string;
    description?: string;
    questions: {
        question: string;
        correctAnswer: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
    }[];
}

export async function POST(req: NextRequest) {
    try {
        // check if the user is authenticated
        const { userId } = await auth();

        if(!userId) {
            return NextResponse.json(
                { error: "Unauthorised access" },
                { status: 401} // 401: unauthorised
            );
        }

        // parse the request body from the helper function
        const body: SaveQuizRequest = await req.json();

        if(!body.title || !body.subject || !body.questions || body.questions.length === 0) {
            return NextResponse.json(
                { error: "Missing required fields!"},
                { status: 400} // 400: bad request
            )

        }

        const quizData = await prisma.quiz.create({
            data: {
                title: body.title,
                subject: body.subject,
                description: body.description || "",
                questionCount: body.questions.length,
                timeSaved: body.questions.length * 5, // 5 minutes saved per question
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
        
        console.log("Quiz saved successfully! ID: ", quizData.id);

        // return the result
        return NextResponse.json({
            success: true,
            quiz: {
                id: quizData.id,
                title: quizData.title,
                subject: quizData.subject,
                questionCount: quizData.questionCount,
                createdAt: quizData.createdAt,
            }
        },  { status: 201 })

    } catch (error) {
        console.error("Error: ", error)
        return NextResponse.json(
            { error: "Internal Server Error "},
            { status: 500}
        )
    }
}