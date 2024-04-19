"use server";

import OpenAI from "openai";
import fs from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { TFineTuneStatus } from "@/types/openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});

export const sendMessage = async (
  messages: OpenAI.Chat.ChatCompletionUserMessageParam[],
  model: string
) => {
  if (!messages) {
    return new NextResponse("Messages are required", { status: 400 });
  }

  const response = await openai.chat.completions.create({
    model,
    messages,
    stream: true,
  });

  for await (const chunk of response) {
    console.log(chunk.choices[0].delta.content);
  }

  console.log("response", response);

  // return response.choices[0].message;
};

export const uploadFile = async (formData: FormData) => {
  const file = formData.get("file") as File;

  if (!file || !(file instanceof File)) {
    return new NextResponse("File are required", { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(`./uploads/${file.name}`, buffer);

  const fileStream = fs.createReadStream(`./uploads/${file.name}`);

  const uploadFileResponse = await openai.files.create({
    file: fileStream,
    purpose: "fine-tune",
  });

  return uploadFileResponse;
};

export const tuning = async (id: string) => {
  await openai.fineTuning.jobs.create({
    model: "gpt-3.5-turbo-0125",
    training_file: id,
  });
};

export const getFineTuningList = async ({
  limit,
  after,
  filter,
}: {
  limit: number;
  after?: string;
  filter?: TFineTuneStatus;
}) => {
  //@ts-ignore
  const fineTuningList = await openai.fineTuning.jobs.list({
    limit,
    after,
    status: filter === "" ? undefined : filter,
  });

  return fineTuningList.data;
};

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
