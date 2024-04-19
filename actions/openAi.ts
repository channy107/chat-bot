"use server";

import OpenAI from "openai";
import { TFormState, TMessageFormError } from "@/types/form";
import { ChatFormSchema } from "@/schemas/chat";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});

export const sendTestMessage = async (
  state: { content: string } | undefined,
  formData: FormData
) => {
  const message = formData.get("message");

  await new Promise((resolve) => setTimeout(resolve, 0));
  return {
    content:
      "난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗난 chat gpt 챗챗챗",
  };
};
