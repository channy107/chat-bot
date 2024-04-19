"use client";
import { useEffect, useRef } from "react";
import { Empty } from "@components/chat/Empty";
import { Message } from "@components/chat/Message";
import { useMessageStore } from "@store/message";
import { useUserStore } from "@store/user";

export default function NewPage() {
  const user = useUserStore((state) => state.user);
  const messages = useMessageStore((state) => state.messages);
  const updateMessages = useMessageStore((state) => state.updateMessages);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateMessages([]);
  }, [updateMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex justify-start w-[80%] h-full">
        {messages.length === 0 ? (
          <Empty />
        ) : (
          <div className="flex flex-col">
            {messages?.map((message, index) => (
              <Message
                key={index}
                email={user.email}
                message={message.message}
                senderType={message.senderType}
              />
            ))}
          </div>
        )}
      </div>
      <div ref={messageEndRef} />
    </>
  );
}
