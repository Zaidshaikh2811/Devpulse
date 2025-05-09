'use server';

import { db } from '@/lib/db';
import { comments, likes } from '@/lib/schema';
import { eq, and, sql } from 'drizzle-orm';

export const getArticleStats = async (articleId: string) => {
    const [commentCountResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(comments)
        .where(eq(comments.articleId, articleId));


    return {
        comments: commentCountResult?.count ?? 0,

    };
};
