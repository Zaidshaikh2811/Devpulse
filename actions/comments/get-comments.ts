// get-comments.ts
import { db } from "@/lib/db";
import { comments, users } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";

export const getArticleCommentById = async (
    articleId: string,
    limit = 5,
    offset = 0
) => {
    try {

        await new Promise((resolve) => setTimeout(resolve, 3000));
        const commentsData = await db
            .select({
                id: comments.id,
                body: comments.body,
                createdAt: comments.createdAt,
                articleId: comments.articleId,
                author: {
                    id: users.id,
                    name: users.name,
                    imageUrl: users.imageUrl,
                },
            })
            .from(comments)
            .leftJoin(users, eq(comments.authorId, users.id))
            .where(eq(comments.articleId, articleId))
            .orderBy(desc(comments.createdAt))
            .limit(limit)
            .offset(offset);

        return commentsData;
    } catch (err: any) {
        throw new Error(err.message || "Failed to get article comments");
    }
};
