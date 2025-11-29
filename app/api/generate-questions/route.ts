import { GoogleGenAI } from "@google/genai";

const GEMINI_AI_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
    try {
        // wait for the user input
        const { topic, difficulty, numOfQuestions} = await req.json();
        
        const ai = new GoogleGenAI({apiKey: GEMINI_AI_KEY});
        
        const prompt = `
            Generate ${numOfQuestions} questions about ${topic}
            Difficulty: ${difficulty}
            Strictly format the response in JSON like this:

            [
                {
                    "question": "...",
                      "options": [
                        "A) option text 1",
                        "B) option text 2",
                        "C) option text 3",
                        "D) option text 4"
                        ],
                    "correctAnswer": "A",
                    "explanation": "..."
                
                }
            
            ]
            
            Rules:
            - Always include full-text options.
            - Options must begin with "A)", "B)", "C)", "D)" exactly.
            - "correctAnswer" must be only one letter (A–D).
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


        return new Response(
            JSON.stringify({ outputQuestion }), { status: 200}
        );

    } catch (error) {
        console.error(`AI error: ${error}`)
        
        return new Response(
            JSON.stringify({ error: "AI Generation Failed"}), { status: 500 }
        )
    }
}