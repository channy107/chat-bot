import { ChatInput } from "@/components/chat/ChatInput";
import { ModelSelect } from "@/components/chat/ModelSelect";
import { Menu } from "@/components/chat/Menu";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 flex md:p-0">
      <Menu />
      <div className="flex flex-col flex-1 ">
        <ModelSelect />
        {children}
        <ChatInput />
      </div>
    </div>
  );
}
