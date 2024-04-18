"use client";
import { Menu } from "lucide-react";
import { Sidebar } from "@components/chat/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { TConversation } from "@/types/db";

type Props = {
  conversations?: TConversation[];
};

export function MobileSidebar({ conversations }: Props) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar conversations={conversations} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
