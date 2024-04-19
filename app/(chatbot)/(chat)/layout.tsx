import { ChatInput } from "@/components/chat/ChatInput";
import { ModelSelect } from "@/components/chat/ModelSelect";
import { Menu } from "@/components/chat/Menu";
import UserProvider from "@/components/providers/UserProvider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="flex md:p-0 h-full">
        <Menu />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <ModelSelect />
          <div className="flex flex-col items-start md:items-center w-full h-full">
            <div className="flex-1 w-full md:w-[80%]">{children}</div>
            <ChatInput />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
