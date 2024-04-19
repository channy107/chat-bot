"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { ClipLoader } from "react-spinners";

type Props = {
  email?: string;
  content?: string | null;
  senderType?: string;
};

export function Message({ email = "", content = "", senderType }: Props) {
  const isAssistant = senderType === "assistant";
  const name = isAssistant ? "Chat GPT" : email;

  return (
    <div className="flex items-start gap-2 my-3">
      <Avatar>
        <AvatarImage src={isAssistant ? "/logo.png" : ""} alt="avatar" />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="mt-2">
        <h2 className="font-bold">{name}</h2>
        <div className="mt-2 text-balance break-all w-full">
          {content === "" ? <ClipLoader size={20} /> : content}
        </div>
      </div>
    </div>
  );
}
