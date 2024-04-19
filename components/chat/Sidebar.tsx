"use client";

import { LayoutList, MessageSquare, Plus } from "lucide-react";

import { Logo } from "@components/chat/Logo";
import { SidebarItem } from "@components/chat/SidebarItem";
import { Button } from "@components/ui/button";
import { CHAT_ROUTES } from "@constants/routes";
import { logout } from "@actions/logout";
import { TConversation } from "@/types/db";

type Props = {
  conversations?: TConversation[];
};

const SIDEBAR_MENUS = [
  {
    id: "tuning",
    href: CHAT_ROUTES.TUNING_LIST,
    icon: <LayoutList />,
    label: "데이터 튜닝",
    type: "new",
  },
  {
    id: "new",
    href: CHAT_ROUTES.NEW,
    icon: <Plus />,
    label: "새로운 대화",
    type: "new",
  },
];

export function Sidebar({ conversations }: Props) {
  const formattedConversations = conversations?.map((conversation) => ({
    id: conversation.id,
    label: conversation.name || "",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATION}/${conversation.id}`,
  }));

  const handleLogout = async () => {
    logout();
  };

  return (
    <div className="h-full w-full p-3 bg-black flex flex-col text-white">
      <div className="flex-1">
        <Logo />
        <div className="flex flex-col gap-2 mt-10">
          {SIDEBAR_MENUS.map((menu) => (
            <SidebarItem key={menu.id} item={menu} />
          ))}

          {formattedConversations?.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="w-[80%]" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
}
