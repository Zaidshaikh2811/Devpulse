import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import * as dotenv from "dotenv";





console.log(" process.env.NEXT_PUBLIC_API_BASE_URL  " + process.env.NEXT_PUBLIC_API_BASE_URL);

if (!process.env.NEON_DATABASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export default defineConfig({
    out: './drizzle',
    schema: './lib/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_API_BASE_URL!,
    },
});
