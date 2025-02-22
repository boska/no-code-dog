// app/api/route.ts
import { NextResponse, NextRequest } from 'next/server';
import OpenAI from "openai";

export async function GET() {
    return NextResponse.json({ message: 'API is healthy' }, { status: 200 });
}

export async function POST(request: NextRequest) {
    const { prompt } = await request.json();
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const openai = new OpenAI({
            apiKey: apiKey,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        const message = completion.choices[0].message.content;
        return NextResponse.json({ message });
    } catch (error) {
        return NextResponse.json({ error: 'Error communicating with OpenAI' }, { status: 500 });
    }
}