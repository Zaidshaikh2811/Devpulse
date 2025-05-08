import { db } from "@/lib/db";
import { articles, users } from "@/lib/schema";
import { desc, eq, like, sql } from "drizzle-orm";

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




export async function getAllArticles({
    page = 1,
    limit = 10,
    search = ''
}: {
    page?: number;
    limit?: number;
    search?: string;
}) {
    try {
        const offset = (page - 1) * limit;

        const whereClause = search
            ? like(articles.title, `%${search}%`)
            : undefined;

        const query = db
            .select({
                articleId: articles.id,
                title: articles.title,
                description: articles.description,
                category: articles.category,
                featuredImage: articles.featuredImage,
                createdAt: articles.createdAt,
                author: {
                    name: users.name,
                    email: users.email,
                    imageUrl: users.imageUrl,
                    role: users.role,
                },
            })
            .from(articles)
            .leftJoin(users, eq(articles.authorId, users.id))
            .orderBy(desc(articles.createdAt))
            .limit(limit)
            .offset(offset);

        if (whereClause) {
            query.where(whereClause);
        }

        const articlesList = await query;

        // Optionally get total count
        const [{ count }] = await db
            .select({ count: sql<number>`count(*)` })
            .from(articles)
            .where(whereClause || sql`true`);

        return {
            articles: articlesList,
            totalCount: count,
        };
    } catch (err: any) {
        throw new Error(err.message || "Failed to get articles");
    }
}



export const getFeaturedArticles = async () => {
    try {
        const articlesList = await db
            .select({

                articleId: articles.id,
                title: articles.title,
                description: articles.description,
                category: articles.category,
                featuredImage: articles.featuredImage,
                createdAt: articles.createdAt,
                author: {

                    name: users.name,
                    email: users.email,
                    imageUrl: users.imageUrl,
                    role: users.role,
                },
            })
            .from(articles)
            .leftJoin(users, eq(articles.authorId, users.id))
            .orderBy(desc(articles.createdAt))
            .limit(3);
        return articlesList || null;
    } catch (err: any) {
        throw new Error(err.message || "Failed to get article");
    }
}