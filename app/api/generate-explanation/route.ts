import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(req: Request) {
    try {

        const { question, userSelectedAnswer, correctAnswer } = await req.json();

        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        const prompt = `
            Explain why ${userSelectedAnswer} is wrong and why ${correctAnswer} is correct for the 
            following question: 

            Question: ${question}

            The explanation should be clear, concise and simple so that even a middle-school student
            can understand.

            Ideal explanation length should be 2-3 sentences.
        `;

        const response = await ai.models.generateContent( {
            model: "gemini-2.5-flash",
            contents: prompt,
        })

        const outputExplanation = response.text ?? "";


       return NextResponse.json({ outputExplanation }, {status: 200})
    
    } catch (error) {
        console.error(error)

        return NextResponse.json({ error: "Failed to generate explanations! "}, { status: 500 })
    }
}