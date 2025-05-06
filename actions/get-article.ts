import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const getArticleByID = async (id: string) => {
    try {
        const [article] = await db
            .select({
                title: articles.title,
                content: articles.content,
                category: articles.category,
                featuredImage: articles.featuredImage,
                createdAt: articles.createdAt,
                description: articles.description,
            })
            .from(articles)
            .where(eq(articles.id, id));

        return article || null;
        return article || null;
    } catch (err: any) {
        throw new Error(err.message || "Failed to get article");
    }
};
