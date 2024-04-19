import { z } from "zod";

export const ChatFormSchema = z.object({
  message: z.string(),
});
