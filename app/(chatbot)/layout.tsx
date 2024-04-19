import UserProvider from "@components/providers/UserProvider";
import { Menu } from "@components/chat/Menu";

export default function ChatBotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="flex md:p-0 h-full">
        <Menu />
        <div className="flex flex-col flex-1 overflow-y-auto">{children}</div>
      </div>
    </UserProvider>
  );
}
