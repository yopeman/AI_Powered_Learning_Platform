import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

const createClient = (source) => {
    if (source === 'OpenAI') {
        return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    } else if (source === 'GoogleGenAI') {
        return new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
    }
    throw new Error('Invalid source specified. Use "OpenAI" or "GoogleGenAI".');
};

const handleResponse = (response) => {
    const generatedText = response?.choices?.[0]?.message?.content || response?.text || null;
    
    if (!generatedText) {
        throw new Error('No content generated.');
    }
    
    return generatedText;
};

const generateContent = async (source, context) => {
    const prompt = `
        Generate comprehensive learning material about: ${context.topic}
        Context:
        - Field: ${context.field}
        - Course: ${context.course}
        - Chapter: ${context.chapter}
        - Topic: ${context.topic}
        Format: Markdown with headings, examples, and quizzes
    `;

    try {
        const client = createClient(source);
        const response = source === 'OpenAI'
            ? await client.chat.completions.create({
                model: 'gpt-4o',
                messages: [{ role: 'user', content: prompt }],
            })
            : await client.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

        return handleResponse(response);
    } catch (error) {
        throw error;
    }
};

const generateAnswer = async (source, context) => {
    if (!context.question || typeof context.question !== 'string') {
        throw new Error('Question must be a non-empty string.');
    }

    const prompt = `
        You are a smart tutor. Answer the following question in Markdown format.

        Question:
        ${context.question}

        Context:
        ${context.history || 'None'}

        Requirements:
        - Use Markdown format
        - Include headings, examples, and a short quiz at the end
    `;

    try {
        const client = createClient(source);
        const response = source === 'OpenAI'
            ? await client.chat.completions.create({
                model: 'gpt-4o',
                messages: [{ role: 'user', content: prompt }],
            })
            : await client.getGenerativeModel({ model: 'gemini-2.5-flash' }).generateContent([prompt]);

        return handleResponse(response);
    } catch (error) {
        throw error;
    }
};

const generateQuestion = async (source, field, courses) => {
    const count = 30;
    if (typeof courses !== 'string') {
        courses = JSON.stringify(courses);
    }

    const prompt = `
        Generate ${count} quiz questions for "${field.title}" field. The field includes the following courses: ${courses}. 
        Each question should have 4 options (A, B, C, D) and must be formatted as JSON like:
        [
            {
                "question": "Question text",
                "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
                "correct": "A"
            }
        ]
    `;

    try {
        const client = createClient(source);
        const response = source === 'OpenAI'
            ? await client.chat.completions.create({
                model: 'gpt-4o',
                messages: [{ role: 'user', content: prompt }],
            })
            : await client.getGenerativeModel({ model: 'gemini-2.5-flash' }).generateContent([prompt]);

        return handleResponse(response);
    } catch (error) {
        throw error;
    }
};

// Export functions for specific sources
export const generateContent_By_OpenAI = (context) => generateContent('OpenAI', context);
export const generateContent_By_GoogleGenAI = (context) => generateContent('GoogleGenAI', context);
export const generateAnswer_By_OpenAI = (context) => generateAnswer('OpenAI', context);
export const generateAnswer_By_GoogleGenAI = (context) => generateAnswer('GoogleGenAI', context);
export const generateQuestion_By_OpenAI = (field, courses) => generateQuestion('OpenAI', field, courses);
export const generateQuestion_By_GoogleGenAI = (field, courses) => generateQuestion('GoogleGenAI', field, courses);