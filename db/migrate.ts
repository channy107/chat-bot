import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import "dotenv/config";

const connectString = process.env.DATABASE_URL!;

const main = async () => {
  const sql = postgres(connectString, { max: 1 });

  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "./drizzle" });

  await sql.end();
};

main();
