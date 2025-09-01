import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

const createClient = (source) => {
    const apiKeys = {
        OpenAI: process.env.OPENAI_API_KEY,
        GoogleGenAI: process.env.GOOGLE_GENAI_API_KEY,
    };
    
    if (!apiKeys[source]) {
        throw new Error('Invalid source specified. Use "OpenAI" or "GoogleGenAI".');
    }
    
    return source === 'OpenAI' ? new OpenAI({ apiKey: apiKeys.OpenAI }) : new GoogleGenAI({ apiKey: apiKeys.GoogleGenAI });
};

const handleResponse = (response) => {
    const generatedText = response?.choices?.[0]?.message?.content || response?.text;
    if (!generatedText) throw new Error('No content generated.');
    return generatedText;
};

const generatePrompt = (context, type) => {
    if (type === 'content') {
        return `
            Generate detailed learning material on the following topic: ${context.topic}
            Context:
            - Field: ${context.field}
            - Course: ${context.course}
            - Chapter: ${context.chapter}
            - Topic: ${context.topic}
            Format: Markdown with headings, examples, and quizzes.
        `;
    } else if (type === 'answer') {
        return `
            You are a knowledgeable tutor. Please answer the question below in Markdown format.
            Question: ${context.question}
            Context: ${context.history || 'No previous context'}
            Previous Questions: ${context.prev_questions || 'None'}
            Requirements: - Use Markdown format - Include headings, examples, and a short quiz at the end.
        `;
    } else if (type === 'question') {
        return `
            Generate 30 quiz questions for the "${context.field.title}" field, which includes the following courses: ${JSON.stringify(context.courses)}. 
            Each question should have 4 answer options (A, B, C, D) and be formatted as JSON, like this:
            [
                {
                    "question": "Question text",
                    "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
                    "correct": "A"
                }
            ]
        `;
    }
};

const fetchResponse = async (client, source, prompt) => {
    return source === 'OpenAI'
        ? client.chat.completions.create({ model: 'gpt-4o', messages: [{ role: 'user', content: prompt }] })
        : client.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt }); // gemini-2.5-flash-lite
};

const generateContent = async (source, context) => {
    const client = createClient(source);
    const prompt = generatePrompt(context, 'content');
    const response = await fetchResponse(client, source, prompt);
    return handleResponse(response);
};

const generateAnswer = async (source, context) => {
    if (!context.question || typeof context.question !== 'string') {
        throw new Error('Question must be a non-empty string.');
    }

    const client = createClient(source);
    const prompt = generatePrompt(context, 'answer');
    const response = await fetchResponse(client, source, prompt);
    return handleResponse(response);
};

const generateQuestion = async (source, field, courses) => {
    const context = { field, courses };
    const client = createClient(source);
    const prompt = generatePrompt(context, 'question');
    const response = await fetchResponse(client, source, prompt);
    return handleResponse(response);
};

// Export functions for specific sources
export const generateContent_By_OpenAI = (context) => generateContent('OpenAI', context);
export const generateContent_By_GoogleGenAI = (context) => generateContent('GoogleGenAI', context);
export const generateAnswer_By_OpenAI = (context) => generateAnswer('OpenAI', context);
export const generateAnswer_By_GoogleGenAI = (context) => generateAnswer('GoogleGenAI', context);
export const generateQuestion_By_OpenAI = (field, courses) => generateQuestion('OpenAI', field, courses);
export const generateQuestion_By_GoogleGenAI = (field, courses) => generateQuestion('GoogleGenAI', field, courses);