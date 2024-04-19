"use client";

import { useEffect, useRef, useState } from "react";

import { Message } from "@components/chat/Message";
import { getMessagesByConversation } from "@actions/conversation";
import { useMessageStore } from "@store/message";
import { useUserStore } from "@store/user";

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

  useEffect(() => {
    const setMessages = async () => {
      const newMessages = await getMessagesByConversation(conversationId);

      if (newMessages) {
        updateMessages(newMessages);
      }
    };

    setMessages();
  }, [conversationId, updateMessages]);

  return (
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
  );
}
