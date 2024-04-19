"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ArrowUp } from "lucide-react";

import AutoResizingTextarea from "@components/chat/AutoReSizingTextArea";
import { Submit } from "@components/Submit";
import { sendTestMessage } from "@actions/openAi";
import { useModelStore } from "@store/model";
import { useMessageStore } from "@store/message";

export function ChatInput() {
  const [state, action] = useFormState(sendTestMessage, undefined);
  const { messages, updateMessages } = useMessageStore();

  const [value, setValue] = useState("");
  const model = useModelStore((state) => state.model);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = (formData: FormData) => {
    formData.append("model", model);
    const userMessage = formData.get("message");
    const newMessages = [
      ...messages,
      { message: `${userMessage}`, senderType: "user" },
      { message: "", senderType: "assistant" },
    ];

    action(formData);
    updateMessages(newMessages);
  };

  useEffect(() => {
    setValue("");
  }, [messages]);

  return (
    <div className="fixed pb-5 bottom-0 z-10 w-[70%] md:w-[60%] bg-white">
      <form action={onSubmit} className="flex items-center gap-4">
        <AutoResizingTextarea
          id="message"
          name="message"
          className="w-full"
          placeholder="궁금한 것을 입력해보세요."
          value={value}
          onChange={handleChange}
        />
        <Submit size="icon">
          <ArrowUp />
        </Submit>
      </form>
    </div>
  );
}
