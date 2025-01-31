"use server";

import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai";

const apiKey = process.env.API_KEY;
const project = process.env.PROJ_ID;
const organization = process.env.ORG_ID;

const openai = createOpenAI({
  apiKey,
  project,
  organization,
});

export const translate = async (input: string, targetLanguage: string) => {

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `Translate the following text to ${targetLanguage}: ${input}`,
    maxTokens: 200,
    system: "You are a helpful assistant that translates texts. I'll give you a text and you should only respond with the translation. The text may be in another language instead od Spanish or English, make sure to detect the language first.",
  })

  return text;
}