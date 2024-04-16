import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle as drizzleProd } from "drizzle-orm/neon-http";

import { drizzle as drizzleDev } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const setDb = () => {
  if (process.env.NODE_ENV === "development") {
    const client = new Client({
      connectionString: process.env.DATABASE_URL!,
    });

    client.connect();
    return drizzleDev(client, { schema });
  } else {
    const sql: NeonQueryFunction<boolean, boolean> = neon(
      process.env.DATABASE_URL!
    );
    return drizzleProd(sql, { schema });
  }
};

const db = setDb();

export default db;
