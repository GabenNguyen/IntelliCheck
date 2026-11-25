import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

const explanationRequestSchema = z.object({
  question: z.string().trim().min(1).max(2000),
  userSelectedAnswer: z.string().trim().min(1).max(500),
  correctAnswer: z.string().trim().min(1).max(500),
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const parsed = explanationRequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { question, userSelectedAnswer, correctAnswer } = parsed.data;

    const prompt = `
            Act as a friendly tutor. In 2-3 short sentences, explain why "${correctAnswer}" is the right answer to: "${question}".
            Briefly clarify why "${userSelectedAnswer}" is a common mistake by showing the logical difference between the two.
            Use simple language a 12-year-old would understand and avoid technical jargon.
        `;

    const response = await generateText({
      model: openrouter("recursive/flint-v1.0:free"),
      prompt,
      timeout: 30000,
    });

    return NextResponse.json(
      { outputExplanation: response.text ?? "" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 },
    );
  }
}
