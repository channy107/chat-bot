import { ReactNode } from "react";

import { getConversationsByUser } from "@actions/conversation";

import UserProvider from "@components/providers/UserProvider";
import { Menu } from "@components/chat/Menu";

const TuningLayout = async ({ children }: { children: ReactNode }) => {
  const conversations = await getConversationsByUser();
  return (
    <UserProvider>
      <div className="flex md:p-0 h-full">
        <Menu />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="p-4 text-2xl font-bold">Fine Tune 모델 목록</div>
          {children}
        </div>
      </div>
    </UserProvider>
  );
};

export default TuningLayout;
