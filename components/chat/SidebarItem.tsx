"use client";

import { ReactNode, MouseEvent, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Trash } from "lucide-react";

import ModalFooter from "@components/modals/modal/ModalFooter";
import { deleteConversation } from "@actions/conversation";
import { CHAT_ROUTES } from "@constants/routes";
import { useSheetStore } from "@stores/sheet";
import { useModalStore } from "@stores/modal";
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
  const { id, href, icon, label, type = "default" } = item;
  const pathname = usePathname();
  const params = useParams<{ conversationId: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const setOpen = useSheetStore((state) => state.setOpen);
  const { openModal, closeModal } = useModalStore();

  const clickItem = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    openModal({
      title: "정말 삭제 하시겠습니까?",
      description: "삭제 후 데이터는 복구하기 어려울 수 있습니다.",
      content: (
        <ModalFooter
          loading={loading}
          confirmButtonVariant="destructive"
          onCancel={closeModal}
          onConfirm={handleDelete}
        />
      ),
    });
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteConversation(id);

      toast.success("삭제 성공!");
      if (params.conversationId === id) {
        router.push(CHAT_ROUTES.NEW);
      }
    } catch (error) {
      toast.error("삭제 실패");
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  return (
    <>
      <Link href={href} scroll={false}>
        <div
          className={cn(
            "flex items-center justify-between h-[50px] text-sm group hover:text-white hover:bg-white/10 rounded-lg transition",
            pathname === href ? "text-white bg-white/10" : "text-zinc-400"
          )}
          onClick={() => setOpen(false)}
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
