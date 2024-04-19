"use server";

import { revalidatePath } from "next/cache";

import { CHAT_ROUTES } from "@constants/routes";
import db from "@/db/drizzle";
import { message } from "@/db/schema";

export const addMessage = async (
  conversationId: string,
  userMessage: string,
  assistantMessage: string | null
) => {
  await db.insert(message).values({
    conversationId,
    content: userMessage,
    senderType: "user",
  });

  await db.insert(message).values({
    conversationId,
    content: assistantMessage,
    senderType: "assistant",
  });

  revalidatePath(CHAT_ROUTES.CONVERSATION);
};
