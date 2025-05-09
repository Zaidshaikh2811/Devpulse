'use server';

import { db } from '@/lib/db';
import { likes } from '@/lib/schema';
import { eq, and, sql } from 'drizzle-orm';
import { getUserId } from '../create-article';

export const getLikeStatusAndCount = async (articleId: string, userId: string) => {
    const userIdResult = await getUserId(userId);
    const id = typeof userIdResult === 'string' ? userIdResult : userIdResult?.success ? userIdResult.errors.general[0] : '';
    const [like] = await db
        .select()
        .from(likes)
        .where(and(eq(likes.articleId, articleId), eq(likes.userId, id)));

    const [count] = await db
        .select({ count: sql<number>`count(*)` })
        .from(likes)
        .where(and(eq(likes.articleId, articleId), eq(likes.isLiked, true)));

    return {
        liked: like?.isLiked ?? false,
        likesCount: count?.count ?? 0,
    };
};
