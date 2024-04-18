import { verifySession } from "@/actions/sessions";

export default async function NewPage() {
  const user = await verifySession();

  console.log("user", user);
  return <>새로운 대화 페이지</>;
}
