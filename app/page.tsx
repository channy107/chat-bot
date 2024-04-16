import db from "@/db";

export default async function Home() {
  const user = await db.query.user.findMany();
  console.log("user", user);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      홈
    </main>
  );
}
