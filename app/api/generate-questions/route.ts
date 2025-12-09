import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import DifficultyRules from "@/utils/difficulty_rules";

const GEMINI_AI_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
    try {
        // wait for the user input
        const { topic, difficulty, numOfQuestions} = await req.json();
        const difficultyRules = DifficultyRules(difficulty)
        
        const ai = new GoogleGenAI({apiKey: GEMINI_AI_KEY});
        
        const prompt = `
            You are a professional exam generator AI.

            Generate exactly ${numOfQuestions} multiple-choice questions about **${topic}**.
            Difficulty level: **${difficultyRules}**.

            Your mission:
            ⚡ Create highly diverse and non-repetitive question types.

            You MUST include a balanced mix of these MCQ *question styles*:
            1. Definition-based
            2. Scenario-based (realistic situations)
            3. Cause–effect or “why does this happen?”
            4. Fill-in-the-blank
            5. Misconception correction (identify the incorrect belief)
            6. Data- or chart-interpretation (describe data verbally)
            7. Analogy-based (A is to B as X is to ___)
            8. Error analysis (what mistake happened?)
            9. “What would happen if…” hypothetical reasoning
            10. Compare-and-contrast
            11. Principle/application (applying a rule to a new situation)
            12. Classification/grouping logic

            Rules for variety:
            - No two questions may share the same structure or question opening.
            - No duplicate concepts.
            - Ensure option diversity — not too similar.
            - Only one correct answer per question.

            STRICT JSON FORMAT ONLY:
            [
            {
                "question": "Fully written question text.",
                "options": [
                "A) option text",
                "B) option text",
                "C) option text",
                "D) option text"
                ],
                "correctAnswer": "A",
                "explanation": "..."
            }
            ]

            JSON rules:
            - Options MUST start with “A)”, “B)”, “C)”, “D)” exactly.
            - No markdown, no commentary, no extra text.
            - Output valid JSON only.
            `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        
        const text = response.text ?? "";

        // Remove code fences if present
        const cleanText = text.replace(/```json|```/g, "").trim();

        // Parse JSON
        const outputQuestion = JSON.parse(cleanText);


       return NextResponse.json({ outputQuestion }, {status: 200})

    } catch (error) {
        console.error(`AI error: ${error}`)
        
        return NextResponse.json( { error: "AI Generation Failed!" }, { status: 500 } )
    }
}