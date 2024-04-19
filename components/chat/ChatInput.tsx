"use client";

import { z } from "zod";
import OpenAI from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowUp } from "lucide-react";

import AutoResizingTextarea from "@components/chat/AutoReSizingTextArea";
import { Form, FormControl, FormField, FormItem } from "@components/ui/form";
import { Button } from "@components/ui/button";

import { createConversation } from "@actions/conversation";
import { sendTestMessage } from "@actions/openAi";
import { ChatFormSchema } from "@schemas/chat";
import { useModelStore } from "@stores/model";
import useMessages from "@hooks/useMessages";

export function ChatInput() {
  const params = useParams<{ conversationId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const model = useModelStore((state) => state.model);
  const { addMessagesToFront, addMessagesToServer } = useMessages();
  const form = useForm<z.infer<typeof ChatFormSchema>>({
    resolver: zodResolver(ChatFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (values: z.infer<typeof ChatFormSchema>) => {
    setLoading(true);
    const messages: OpenAI.Chat.ChatCompletionUserMessageParam[] = [
      {
        role: "user",
        content: values.message,
      },
    ];

    addMessagesToFront(values.message, "");
    reset();

    const response = await sendTestMessage(
      messages,
      searchParams.get("model") || model
    );

    let conversationId = params.conversationId;

    if (!conversationId) {
      const conversation = await createConversation(values.message);
      addMessagesToFront(values.message, response.content);
      await addMessagesToServer(
        conversation.id,
        values.message,
        response.content
      );
      router.push(`/conversations/${conversation.id}`);
    } else {
      addMessagesToFront(values.message, response.content);
      await addMessagesToServer(
        conversationId,
        values.message,
        response.content
      );
    }

    setLoading(false);
  };

  return (
    <Form {...form}>
      <div className="sticky pb-5 bottom-0 z-10 w-[85%] bg-white">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center w-full gap-4"
        >
          <FormField
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <AutoResizingTextarea
                    disabled={loading}
                    placeholder="궁금한 것을 입력해보세요."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} size="icon">
            <ArrowUp />
          </Button>
        </form>
      </div>
    </Form>
  );
}
