import { redirect } from "next/navigation";
import { CHAT_ROUTES } from "@/constants/routes";

export default async function Home() {
  redirect(`${CHAT_ROUTES.NEW}`);
}
