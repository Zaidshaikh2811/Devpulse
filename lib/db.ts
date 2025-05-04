import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import 'dotenv/config';
import * as schemas from './schema';




if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    console.log(" process.env.NEXT_PUBLIC_API_BASE_URL  " + process.env.NEXT_PUBLIC_API_BASE_URL);

    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

const sql = neon(process.env.NEXT_PUBLIC_API_BASE_URL!);
export const db = drizzle({ client: sql, schema: schemas });
export { sql };
