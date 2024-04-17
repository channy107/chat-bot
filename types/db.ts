import { InferSelectModel } from "drizzle-orm";
import { conversation, message, user } from "@/db/schema";

export type TUser = InferSelectModel<typeof user>;
export type TConversation = InferSelectModel<typeof conversation>;
export type TMessage = InferSelectModel<typeof message>;
