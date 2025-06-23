// lib/groq.ts
import { createGroq } from "@ai-sdk/groq";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("GROQ_API_KEY is not set in environment variables");
  throw new Error("GROQ_API_KEY environment variable is required");
}

export const groq = createGroq({
  apiKey: apiKey,
});

export const primaryModel = groq("llama-3.3-70b-versatile");
export const fallbackModel = groq("llama-3.1-8b-instant");

export const primaryImageSupportModel = groq(
  "meta-llama/llama-4-maverick-17b-128e-instruct"
); // max 20mb support any file pdf/docs/txt
export const fallbackImageSupportModel = groq(
  "meta-llama/llama-4-scout-17b-16e-instruct"
);

// Vision models that actually exist in Groq
// export const primaryImageSupportModel = groq("llama-3.2-90b-vision-preview");
// export const fallbackImageSupportModel = groq("llama-3.2-11b-vision-preview");
