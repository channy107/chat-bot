import { eq } from "drizzle-orm";
import { verifySession } from "@actions/sessions";
import { user } from "@db/schema";
import db from "@db/drizzle";

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
