import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

// Initialize the OpenAI client with your API key
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    // Parse the incoming request to extract messages
    const { messages } = await req.json();

    // Validate the messages structure
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format." }),
        { status: 400 }
      );
    }

    // Set up the model with the desired parameters
    const model = openai.chat("gpt-3.5-turbo");

    // Stream the generated text response
    const result = streamText({
      model,
      messages,
    });

    // Return the streaming response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error." }), {
      status: 500,
    });
  }
}
