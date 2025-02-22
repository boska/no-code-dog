// app/api/route.ts
import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function GET() {
    return NextResponse.json({ message: 'API is healthy' }, { status: 200 });
}

export async function POST(request: NextRequest) {
    const { prompt } = await request.json(); // Assume the client sends a prompt
    const apiKey = process.env.OPENAI_API_KEY; // Make sure to set your OpenAI API key in environment variables

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', // or your desired model
            messages: [{ role: 'user', content: prompt }],
            tools: [{ type: "file_search" }],
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        const message = response.data.choices[0].message.content;
        return NextResponse.json({ message });
    } catch (error) {
        return NextResponse.json({ error: 'Error communicating with OpenAI' }, { status: 500 });
    }
}