import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import cuid from "cuid";

export async function POST(req: NextRequest) {
    try {
        const { data } = await req.json();


        if (!data) {
            return NextResponse.json({ error: "No body" }, { status: 400 });
        }

        const {
            id, // Clerk user ID
            email_addresses,
            first_name,
            last_name,
            image_url,
        } = data;

        const email = email_addresses?.[0]?.email_address || "";
        const name = `${first_name || ""} ${last_name || ""}`.trim();

        await db.insert(users).values({
            id: cuid(),
            clerkUserId: id, // Assuming the Clerk user ID is the same as `id`
            email,
            name,
            imageUrl: image_url,
        });

        return NextResponse.json({ message: "User created" }, { status: 200 });
    } catch (err) {
        console.error("Webhook Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
