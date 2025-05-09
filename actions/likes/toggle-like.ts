'use server';

import { db } from '@/lib/db';
import { likes } from '@/lib/schema';
import { and, eq, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { getUserId } from '../create-article';

export const toggleArticleLike = async (articleId: string, userId: string) => {
    const userIdResult = await getUserId(userId);

    if (typeof userIdResult !== 'string') {
        throw new Error('Invalid user ID');
    }

    const existing = await db.query.likes.findFirst({
        where: and(eq(likes.articleId, articleId), eq(likes.userId, userIdResult)),
    });

    const id = typeof userIdResult === 'string' ? userIdResult : null;

    let liked: boolean;

    if (existing) {
        liked = !existing.isLiked;

        await db
            .update(likes)
            .set({ isLiked: liked })
            .where(eq(likes.id, existing.id));
    }
    else {
        if (id) {
            await db.insert(likes).values({
                id: uuidv4(),
                articleId,
                userId: id,
                isLiked: true,
            });
        } else {
            throw new Error('Invalid user ID');
        }
    }

    const [count] = await db
        .select({ count: sql<number>`count(*)` })
        .from(likes)
        .where(and(eq(likes.articleId, articleId), eq(likes.isLiked, true)));

    return count;

}

