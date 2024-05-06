import {neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://magicSearch_owner:a5dYpPijAhG1@ep-holy-poetry-a1b06c65.ap-southeast-1.aws.neon.tech/top-ideas?sslmode=require"
);
export const db = drizzle(sql, {schema});
