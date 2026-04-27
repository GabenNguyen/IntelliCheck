import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(req: Request) {
    try {

        const { question, userSelectedAnswer, correctAnswer } = await req.json();

        const openrouter = createOpenRouter({
            apiKey: OPENROUTER_API_KEY,
        })

        const prompt = `
            Act as a friendly tutor. In 2-3 short sentences, explain why "${correctAnswer}" is the right answer to: "${question}". 
            Briefly clarify why "${userSelectedAnswer}" is a common mistake by showing the logical difference between the two. 
            Use simple language a 12-year-old would understand and avoid technical jargon.
        `;


        const response = streamText({
            model: openrouter("openai/gpt-oss-20b:free"),
            prompt: prompt,
        })

        const outputExplanation = await response?.text ?? "";

        return NextResponse.json({ outputExplanation }, { status: 200 })

    } catch (error) {
        console.error(error)

        return NextResponse.json({ error: "Failed to generate explanations! " }, { status: 500 })
    }
}