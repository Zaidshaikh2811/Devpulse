import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Webhook received:", body);

        const {
            id, // Clerk user ID
            email_addresses,
            first_name,
            last_name,
            image_url,
        } = body;

        const email = email_addresses?.[0]?.email_address || "";
        const name = `${first_name || ""} ${last_name || ""}`.trim();

        await prisma.user.create({
            data: {
                clerkUserId: id,
                email,
                name,
                imageUrl: image_url || null,
            },
        });

        return NextResponse.json({ message: "User created" }, { status: 200 });
    } catch (err) {
        console.error("Webhook Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
