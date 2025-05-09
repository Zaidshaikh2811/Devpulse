'use server';

import { db } from '@/lib/db';
import { likes } from '@/lib/schema';
import { eq, and, sql } from 'drizzle-orm';
import { getUserId } from '../create-article';

export const getLikeStatusAndCount = async (articleId: string, userId: string | null) => {
    let liked = false;

    // Get total likes
    const [count] = await db
        .select({ count: sql<number>`count(*)` })
        .from(likes)
        .where(and(eq(likes.articleId, articleId), eq(likes.isLiked, true)));

    // Check if this user has liked the article
    if (userId) {
        const resolvedUserId = await getUserId(userId);
        const id = typeof resolvedUserId === 'string'
            ? resolvedUserId
            : resolvedUserId?.success
                ? resolvedUserId.errors.general[0]
                : '';

        const [like] = await db
            .select()
            .from(likes)
            .where(and(eq(likes.articleId, articleId), eq(likes.userId, id)));

        liked = like?.isLiked ?? false;
    }

    return {
        liked,
        likesCount: count?.count ?? 0,
    };
};
