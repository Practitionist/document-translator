import { NextRequest, NextResponse } from 'next/server';
// Remove the problematic static import of pdf-parse
// import pdf from 'pdf-parse'; 
import mammoth from 'mammoth';
import { Readable } from 'stream';

// Force Node.js runtime for pdf-parse compatibility
export const runtime = 'nodejs'; 

// Helper function to convert ReadStream to Buffer (if needed by parsers)
async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

// --- OpenRouter API Call ---
async function translateWithOpenRouter(
  text: string,
  sourceLanguage: string, // e.g., "Spanish", "French", "auto"
  apiKey: string,
  model: string = 'google/gemini-2.5-pro-preview-03-25' // Updated default model
): Promise<string> {
  const languageInstruction = sourceLanguage === 'auto'
    ? 'Detect the language of the following text and translate it accurately to English:'
    : `Translate the following text from ${sourceLanguage} to English:`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "You are a helpful translation assistant. Translate the user's text to English accurately. Preserve the original meaning and tone as much as possible. Only output the translated text, nothing else." },
          { role: "user", content: `${languageInstruction}\n\n${text}` }
        ]
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenRouter API Error:", response.status, errorBody);
      throw new Error(`OpenRouter API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0 || !data.choices[0].message?.content) {
       console.error("OpenRouter Invalid Response:", data);
      throw new Error('Invalid response structure from OpenRouter API');
    }

    return data.choices[0].message.content.trim();

  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    throw new Error('Failed to translate text using OpenRouter.');
  }
}


// --- API Route Handler ---
export async function POST(request: NextRequest) {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    console.error('OPENROUTER_API_KEY environment variable not set.');
    return NextResponse.json({ error: 'Server configuration error: API key missing.' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const sourceLanguage = formData.get('sourceLanguage') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }
    if (!sourceLanguage) {
      return NextResponse.json({ error: 'No source language specified.' }, { status: 400 });
    }

    // --- File Parsing ---
    let extractedText = '';
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    if (file.type === 'application/pdf') {
      try {
        // Dynamic import only when we actually need to parse a PDF
        const pdf = await import('pdf-parse').then(module => module.default);
        const data = await pdf(fileBuffer);
        extractedText = data.text;
      } catch (error) {
        console.error("Error parsing PDF:", error);
        return NextResponse.json({ error: 'Failed to parse PDF file.' }, { status: 500 });
      }
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { // DOCX
       try {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = result.value;
      } catch (error) {
        console.error("Error parsing DOCX:", error);
        return NextResponse.json({ error: 'Failed to parse DOCX file.' }, { status: 500 });
      }
    } else if (file.type === 'text/plain') { // TXT
      extractedText = fileBuffer.toString('utf-8');
    } else {
      return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
    }

    if (!extractedText.trim()) {
        return NextResponse.json({ error: 'Could not extract text from the document or the document is empty.' }, { status: 400 });
    }

    // Limit text size to avoid huge API costs/long processing times (e.g., 50k characters)
    const MAX_CHARS = 50000;
    if (extractedText.length > MAX_CHARS) {
        extractedText = extractedText.substring(0, MAX_CHARS);
        console.warn(`Input text truncated to ${MAX_CHARS} characters.`);
        // Optionally, you could inform the user about the truncation in the response
    }

    // --- Translation ---
    const translatedText = await translateWithOpenRouter(extractedText, sourceLanguage, openRouterApiKey);

    return NextResponse.json({ translatedText });

  } catch (error) {
    console.error("Translation API Error:", error);
    // Determine if it's a known error type or a generic one
    const message = error instanceof Error ? error.message : 'An unexpected error occurred during translation.';
    // Avoid leaking sensitive details in production
    const status = (error instanceof Error && error.message.includes('API request failed')) ? 502 : 500; // Bad Gateway for upstream issues

    return NextResponse.json({ error: message }, { status });
  }
} 