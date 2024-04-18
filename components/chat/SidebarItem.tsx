"use client";

import { ReactNode, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Trash } from "lucide-react";
import { cn } from "@lib/utils";

type Props = {
  item: {
    id: string;
    href: string;
    icon: ReactNode;
    label: string;
    type?: string;
  };
};

export function SidebarItem({ item }: Props) {
  const { href, icon, label, type = "default" } = item;
  const pathname = usePathname();

  const clickItem = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Link href={href}>
        <div
          className={cn(
            "flex items-center justify-between h-[50px] text-sm group hover:text-white hover:bg-white/10 rounded-lg transition",
            pathname === href ? "text-white bg-white/10" : "text-zinc-400"
          )}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="w-[180px] truncate">{label}</div>
          </div>
          {type !== "new" && (
            <div
              onClick={clickItem}
              className="aspect-square p-2 md:hidden group-hover:block hover:bg-white/20 rounded-full"
            >
              <Trash size={18} />
            </div>
          )}
        </div>
      </Link>
    </>
  );
}
