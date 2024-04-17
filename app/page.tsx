import db from "@/db/drizzle";

export default async function Home() {
  const user = await db.query.user.findMany();
  console.log("user", user);
  return <main>홈페이지</main>;
}
