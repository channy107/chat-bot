"use server";
import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";
import { verifySession } from "@actions/sessions";
import { conversation, user } from "@db/schema";
import db from "@db/drizzle";

export const getMessagesByConversation = async (id: string) => {
  const conversationData = await db.query.conversation.findFirst({
    where: eq(conversation.id, id),
    with: {
      messages: true,
    },
  });

  return conversationData?.messages;
};

export const getConversationsByUser = async () => {
  const session = await verifySession();

  const userInfo = await db.query.user.findFirst({
    where: eq(user.id, session.id),
    with: {
      conversations: {
        orderBy: (conversation, { desc }) => [desc(conversation.createdAt)],
      },
    },
  });

  return userInfo?.conversations;
};

export const createConversation = async (name: string) => {
  const session = await verifySession();
  const result = await db
    .insert(conversation)
    .values({
      name,
      ownerId: session.id,
    })
    .returning();

  revalidatePath("/");
  return result[0];
};
