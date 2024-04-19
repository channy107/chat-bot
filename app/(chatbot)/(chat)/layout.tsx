import { ChatInput } from "@components/chat/ChatInput";
import { ModelSelect } from "@components/chat/ModelSelect";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ModelSelect />
      <div className="flex flex-col items-start md:items-center w-full h-full">
        <div className="flex-1 w-full md:w-[80%]">{children}</div>
        <ChatInput />
      </div>
    </>
  );
}
