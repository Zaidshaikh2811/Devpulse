import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import * as dotenv from "dotenv";





if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    throw new Error('DrizzleConfigTs NEXT_PUBLIC_API_BASE_URL is not defined ' + process.env.NEON_DATABASE_URL);
}

export default defineConfig({
    out: './drizzle',
    schema: './lib/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_API_BASE_URL!,
    },
});
