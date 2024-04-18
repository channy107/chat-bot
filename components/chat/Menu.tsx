import { getConversationsByUser } from "@actions/conversation";
import { MobileSidebar } from "@components/chat/MobileSidebar";
import { Sidebar } from "@components/chat/Sidebar";

export async function Menu() {
  const conversations = await getConversationsByUser();
  return (
    <nav className="flex">
      <MobileSidebar conversations={conversations} />
      <div className="hidden md:block h-screen w-[300px]">
        <Sidebar conversations={conversations} />
      </div>
    </nav>
  );
}
