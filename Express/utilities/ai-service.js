// utils/ai.js
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai'; // official package name

// ---------- Config ----------
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';  // 'gemini-2.0-flash'; // update to your available model
const DEFAULT_TIMEOUT_MS = 60000;
const MAX_RETRIES = 2;

// ---------- Helpers ----------
const withTimeout = (promise, ms = DEFAULT_TIMEOUT_MS) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms)),
  ]);
};

const retry = async (fn, retries = MAX_RETRIES) => {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      // network/server/transient errors worth retrying
      if (i === retries) break;
      if (!isRetryable(err)) break;
      await wait((i + 1) * 300);
    }
  }
  throw lastErr;
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const isRetryable = (err) => {
  const msg = String(err?.message || '').toLowerCase();
  const status = err?.status || err?.response?.status;
  return (
    msg.includes('timeout') ||
    msg.includes('rate') ||
    msg.includes('overloaded') ||
    [408, 429, 500, 502, 503, 504].includes(status)
  );
};

// ---------- Clients ----------
const createClient = (source) => {
  if (source === 'OpenAI') {
    if (!process.env.OPENAI_API_KEY) throw new Error('Missing OPENAI_API_KEY');
    return {
      source,
      client: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }),
      model: OPENAI_MODEL,
    };
  }
  if (source === 'GoogleGenAI') {
    if (!process.env.GOOGLE_GENAI_API_KEY) throw new Error('Missing GOOGLE_GENAI_API_KEY');
    return {
      source,
      client: new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY),
      model: GEMINI_MODEL,
    };
  }
  throw new Error('Invalid source specified. Use "OpenAI" or "GoogleGenAI".');
};

// ---------- Prompt Builders ----------
const buildLearningPrompt = (context) => {
  validateRequired(context, ['field', 'course', 'chapter', 'topic']);
  return [
    {
      role: 'user',
      content: `Generate comprehensive learning material about: ${context.topic}

Context:
- Field: ${context.field}
- Course: ${context.course}
- Chapter: ${context.chapter}
- Topic: ${context.topic}

Format: Markdown with headings, examples, and quizzes`,
    },
  ];
};

const buildAnswerPrompt = (context) => {
  if (!context?.question || typeof context.question !== 'string' || !context.question.trim()) {
    throw new Error('Question must be a non-empty string.');
  }
  const history = typeof context.history === 'string' ? context.history : JSON.stringify(context.history ?? 'None');
  const prev = typeof context.prev_questions === 'string'
    ? context.prev_questions
    : JSON.stringify(context.prev_questions ?? 'None');

  return [
    {
      role: 'user',
      content: `You are a smart tutor. Answer the following question in Markdown.

Question:
${context.question}

Context:
${history}

Previous Question:
${prev}

Requirements:
- Use Markdown
- Include headings, examples, and a short quiz at the end`,
    },
  ];
};

const buildQuestionPrompt = (field, courses, count = 30) => {
  if (!field?.title) throw new Error('field.title is required.');
  const coursesStr = typeof courses === 'string' ? courses : JSON.stringify(courses ?? []);
  return [
    {
      role: 'user',
      content: `Generate ${count} quiz questions for the "${field.title}" field.
The field includes the following courses: ${coursesStr}.

Output strict JSON array with this schema:
[
  {
    "question": "Question text",
    "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
    "correct": "A"
  }
]

Rules:
- Exactly ${count} items
- No commentary, only JSON
- Ensure valid JSON (double quotes, no trailing commas)`,
    },
  ];
};

// ---------- Response Normalizers ----------
const extractOpenAIText = (resp) =>
  resp?.choices?.[0]?.message?.content?.trim() || null;

// Gemini SDK returns a GenerateContentResponse where
// response.text() gives the aggregated text
const extractGeminiText = async (resp) => {
  try {
    if (!resp) return null;
    if (typeof resp.text === 'function') {
      const t = await resp.text();
      return t?.trim() || null;
    }
    // Some SDK variants return { candidates: [{ content: { parts: [{ text }]}}]}
    const text =
      resp.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ||
      resp.output_text ||
      null;
    return (text || '').trim() || null;
  } catch {
    return null;
  }
};

const handleResponse = async (source, response) => {
  const text =
    source === 'OpenAI' ? extractOpenAIText(response) : await extractGeminiText(response);

  if (!text) throw new Error('No content generated.');
  return text;
};

// ---------- Core call ----------
const callModel = async ({ source, model, client }, messages) => {
  if (source === 'OpenAI') {
    return withTimeout(
      retry(() =>
        client.chat.completions.create({
          model,
          messages,
          temperature: 0.7,
        })
      )
    );
  } else {
    const genModel = client.getGenerativeModel({ model });
    // Gemini accepts an array of parts; we pass a single user prompt string
    // We collapse messages into a single text for simplicity
    const prompt = messages.map((m) => m.content).join('\n\n');
    return withTimeout(
      retry(() => genModel.generateContent(prompt))
    );
  }
};

// ---------- Validation ----------
function validateRequired(obj, fields) {
  for (const f of fields) {
    if (obj?.[f] === undefined || obj?.[f] === null || String(obj[f]).trim() === '') {
      throw new Error(`Missing required field: ${f}`);
    }
  }
}

// ---------- Public API ----------
export const generateContent = async (source, context) => {
  const meta = createClient(source);
  const messages = buildLearningPrompt(context);
  const resp = await callModel(meta, messages);
  return handleResponse(source, resp);
};

export const generateAnswer = async (source, context) => {
  const meta = createClient(source);
  const messages = buildAnswerPrompt(context);
  const resp = await callModel(meta, messages);
  return handleResponse(source, resp);
};

export const generateQuestion = async (source, field, courses, count = 30) => {
  const meta = createClient(source);
  const messages = buildQuestionPrompt(field, courses, count);
  const resp = await callModel(meta, messages);
  const text = await handleResponse(source, resp);

  // Ensure valid JSON and shape
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    // Try to extract JSON block if model added prose
    const match = text.match(/```json\s*([\s\S]*?)\s*```/i) || text.match(/\[\s*{[\s\S]*}\s*]/);
    if (!match) throw new Error('Model did not return valid JSON.');
    data = JSON.parse(match[1] || match[0]);
  }

  if (!Array.isArray(data)) throw new Error('Expected an array of questions.');
  // Basic schema check
  for (const [i, q] of data.entries()) {
    if (
      typeof q?.question !== 'string' ||
      !Array.isArray(q?.options) ||
      q.options.length !== 4 ||
      !['A', 'B', 'C', 'D'].includes(q?.correct)
    ) {
      throw new Error(`Invalid question format at index ${i}.`);
    }
  }
  return data;
};

// Convenience exports for specific sources
export const generateContent_By_OpenAI = (context) => generateContent('OpenAI', context);
export const generateContent_By_GoogleGenAI = (context) => generateContent('GoogleGenAI', context);
export const generateAnswer_By_OpenAI = (context) => generateAnswer('OpenAI', context);
export const generateAnswer_By_GoogleGenAI = (context) => generateAnswer('GoogleGenAI', context);
export const generateQuestion_By_OpenAI = (field, courses, count) => generateQuestion('OpenAI', field, courses, count);
export const generateQuestion_By_GoogleGenAI = (field, courses, count) => generateQuestion('GoogleGenAI', field, courses, count);