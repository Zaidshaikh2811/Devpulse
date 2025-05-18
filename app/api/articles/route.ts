// app/api/articles/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { type NextRequest } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Check if body is an array
        if (!Array.isArray(body)) {
            return NextResponse.json({ error: "Expected an array of articles." }, { status: 400 });
        }

        const articlesWithId = body.map((article: any) => ({
            ...article,
            id: randomUUID()
        }));

        await db.insert(articles).values(articlesWithId);

        return NextResponse.json({ message: `${body.length} articles inserted successfully.` });
    } catch (error) {
        console.error("Insert error:", error);
        return NextResponse.json({ error: "Failed to insert articles." }, { status: 500 });
    }
}
