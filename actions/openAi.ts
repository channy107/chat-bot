"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});

export const sendTestMessage = async (
  messages: OpenAI.Chat.ChatCompletionUserMessageParam[],
  model: string
) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    content:
      "난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗",
  };
};
