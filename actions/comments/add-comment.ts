

"use server";

import { db } from "@/lib/db";
import { comments, users } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import cuid from "cuid";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addComment({ articleId, comment, userId }: { articleId: string, comment: string, userId: string }) {
    try {

        const { userId } = await auth();

        if (!userId) {
            throw new Error("Login To add Comment");
        }
        // Get the user data by userId
        const getUserId = await db.select().from(users).where(eq(users.clerkUserId, userId));

        if (!getUserId || getUserId.length === 0) {
            throw new Error("User not found");
        }

        // Insert the comment into the database
        await db.insert(comments).values({
            id: cuid(), // generate a unique ID for the comment
            articleId,
            body: comment,
            authorId: getUserId[0].id, // Use the first (and only) user found
        });

        // Revalidate the article path to reflect the new comment
        revalidatePath(`/article/${articleId}`);

        // Return only the necessary data in a plain object format
        return { success: true, message: "Comment added successfully" };
    } catch (err: any) {
        console.error('Error in adding comment:', err);
        throw new Error(err.message || "Failed to create comment");
    }
}
