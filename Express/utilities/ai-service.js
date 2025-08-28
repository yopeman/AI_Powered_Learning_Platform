import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

const generateContent = async (source, topicTitle, context) => {
    const prompt = `
        Generate comprehensive learning material about: ${topicTitle}
        Context: 
        - Field: ${context.field}
        - Course: ${context.course}
        Format: Markdown with headings, examples, and quizzes
    `;

    try {
        if (source === 'OpenAI') {
            const client = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
            });
            const response = await client.chat.completions.create({
                model: 'gpt-4o',
                messages: [{ role: 'user', content: prompt }],
            });
            return response.choices[0]?.message?.content || 'No content generated.';
        } else if (source === 'GoogleGenAI') {
            const ai = new GoogleGenAI({
                apiKey: process.env.GOOGLE_GENAI_API_KEY,
            });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            return response.text || 'No content generated.';
        } else {
            throw new Error('Invalid source specified.');
        }
    } catch (error) {
        console.error('Error generating content:', error);
        throw new Error('Failed to generate content. Please try again later.');
    }
};


const generateAnswer = async (source, question, history) => {
    if (!question || typeof question !== 'string') {
        throw new Error('Question must be a non-empty string.');
    }

    const prompt = `
        You are a smart tutor. Answer the following question in Markdown format.

        Question:
        ${question}

        Context / History:
        ${history || 'None'}

        Requirements:
        - Use Markdown format
        - Include headings, examples, and a short quiz at the end
    `;

    try {
        if (source === 'OpenAI') {
            const client = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
            });

            const response = await client.chat.completions.create({
                model: 'gpt-4o',
                messages: [{ role: 'user', content: prompt }],
            });

            return response.choices?.[0]?.message?.content || 'No content generated.';
        }

        if (source === 'GoogleGenAI') {
            const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            const result = await model.generateContent([prompt]);
            const response = await result.response;

            return response.text() || 'No content generated.';
        }

        throw new Error('Invalid source specified.');
    } catch (error) {
        console.error(`Error generating content from ${source}:`, error);
        throw new Error(`Failed to generate content using ${source}.`);
    }
};

const generateQuestion = async (field, courses, source) => {
    const count = 50;
    if (typeof courses !== 'string') {
        courses = JSON.stringify(courses);
    }

    const prompt = `
        Generate ${count} quiz questions about "${field.title}". The field includes the following courses: ${courses}. 
        Each question should have 4 options (A, B, C, D) and be formatted as JSON:
        [
            {
                "question": "Question text",
                "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
                "correct": "A"
            }
        ]
    `;

    try {
        let responseContent;

        if (source === 'OpenAI') {
            const client = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
            });

            const response = await client.chat.completions.create({
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
            });

            responseContent = response.choices?.[0]?.message?.content;
        } else if (source === 'GoogleGenAI') {
            const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            const result = await model.generateContent([prompt]);
            responseContent = await result.response.text();
        } else {
            throw new Error('Invalid source specified. Use "OpenAI" or "GoogleGenAI".');
        }

        return responseContent || 'No content generated.';
    } catch (error) {
        console.error(`Error generating content from ${source}:`, error);
        throw new Error(`Failed to generate content using ${source}.`);
    }
};

const generateContent_By_OpenAI = async (topicTitle, context) => await generateContent('OpenAI', topicTitle, context);
const generateContent_By_GoogleGenAI = async (topicTitle, context) => await generateContent('GoogleGenAI', topicTitle, context);
// ---
const generateAnswer_By_OpenAI = async (question, history) => await generateAnswer('OpenAI', question, history);
const generateAnswer_By_GoogleGenAI = async (question, history) => await generateAnswer('GoogleGenAI', question, history);
// ---
const generateQuestion_By_OpenAI = async (question, history) => await generateQuestion('OpenAI', question, history);
const generateQuestion_By_GoogleGenAI = async (question, history) => await generateQuestion('GoogleGenAI', question, history);

export {
    generateContent_By_OpenAI,
    generateContent_By_GoogleGenAI,
    generateAnswer_By_OpenAI,
    generateAnswer_By_GoogleGenAI,
    generateQuestion_By_OpenAI,
    generateQuestion_By_GoogleGenAI
};