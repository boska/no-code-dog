// app/api/route.ts
import { NextResponse, NextRequest } from 'next/server';
import OpenAI from "openai";
import { resumeData } from '@/config/resume';

// Helper to get relevant resume sections based on the query
function getRelevantContext(query: string): string {
    const query_lower = query.toLowerCase();
    const sections = {
        experience: /work|job|company|experience|sap|strv|viscovery|eztable/i,
        skills: /skill|tech|swift|ios|mobile|programming|development/i,
        education: /education|study|university|school|degree/i,
        languages: /language|english|chinese|czech/i,
        contact: /contact|email|phone|reference/i
    };

    let relevantSections = resumeData.systemMessage;
    
    // If the query matches specific sections, only include those
    for (const [section, pattern] of Object.entries(sections)) {
        if (pattern.test(query_lower)) {
            // Extract relevant section from the full resume
            const sectionMatch = resumeData.systemMessage.match(new RegExp(`${section.toUpperCase()}.*?(?=\\n\\n|$)`, 's'));
            if (sectionMatch) {
                return `You are Yang's AI assistant. Here's the relevant information about Yang:\n\n${sectionMatch[0]}`;
            }
        }
    }

    // If no specific section matches, return a condensed version
    return `You are Yang's AI assistant. Here's a brief overview of Yang:
    Senior iOS Developer with 10+ years of experience, specialized in Swift, SwiftUI, and UIKit.
    Currently working at SAP Concur, previously at STRV, Viscovery, and EZTABLE.
    Expert in mobile architecture, performance optimization, and team leadership.`;
}

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
            messages: [
                { 
                    role: "system", 
                    content: getRelevantContext(prompt)
                },
                { 
                    role: "user", 
                    content: prompt 
                }
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const message = completion.choices[0].message.content;
        return NextResponse.json({ message });
    } catch (error) {
        return NextResponse.json({ error: 'Error communicating with OpenAI' }, { status: 500 });
    }
}