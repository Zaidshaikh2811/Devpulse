import { db } from '@/lib/db'; // Adjust with your actual db connection setup
import { articles, comments, likes, users } from '@/lib/schema'; // Adjust based on your schema path
import { eq, count } from 'drizzle-orm';
// Function to get dashboard stats
export async function getDashboardStats(userId: string) {
    try {

        const getUserId = await db.select().from(users).where(eq(users.clerkUserId, userId));

        if (!getUserId || getUserId.length === 0) {
            throw new Error('User not found');
        }
        const [articleCount, commentCount, likeCount] = await Promise.all([
            db
                .select({ count: count(articles.id) })
                .from(articles)
                .where(eq(articles.authorId, getUserId[0].id)),
            db
                .select({ count: count(comments.id) })
                .from(comments)
                .where(eq(comments.authorId, getUserId[0].id)),
            db
                .select({ count: count(likes.id) })
                .from(likes)
                .where(eq(likes.userId, getUserId[0].id)),
        ]);



        return {
            articleCount: articleCount[0].count,
            commentCount: commentCount[0].count,
            likeCount: likeCount[0].count,
        };


    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw new Error('Unable to fetch dashboard statistics');
    }
}
