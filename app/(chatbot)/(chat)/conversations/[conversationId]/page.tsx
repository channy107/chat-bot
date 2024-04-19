"use client";

import { useEffect, useRef } from "react";
import { Message } from "@components/chat/Message";
import { getMessagesByConversation } from "@actions/conversation";
import { useMessageStore } from "@stores/message";
import { useUserStore } from "@stores/user";

type Props = {
  params: {
    conversationId: string;
  };
};

export default function ConversationPage({
  params: { conversationId },
}: Props) {
  const user = useUserStore((state) => state.user);
  const messages = useMessageStore((state) => state.messages);
  const updateMessages = useMessageStore((state) => state.updateMessages);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setMessages = async () => {
      const newMessages = await getMessagesByConversation(conversationId);

      if (newMessages) {
        updateMessages(newMessages);
      }
    };

    setMessages();
  }, [conversationId, updateMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="flex flex-col h-full w-[80%]">
        {messages?.map((message, index) => (
          <Message
            key={index}
            email={user.email}
            content={message.content}
            senderType={message.senderType}
          />
        ))}
      </div>
      <div ref={scrollRef} />
    </>
  );
}
