"use client";
import { Menu } from "lucide-react";
import { Sidebar } from "@components/chat/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { useSheetStore } from "@stores/sheet";
import { TConversation } from "@/types/db";

type Props = {
  conversations?: TConversation[];
};

export function MobileSidebar({ conversations }: Props) {
  const { isOpen, setOpen } = useSheetStore();
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={(open) => setOpen(open)}>
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
