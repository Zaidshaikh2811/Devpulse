// db/schema.ts
import { relations } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, primaryKey, unique } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
    id: varchar("id").primaryKey(),
    clerkUserId: varchar("clerk_user_id", { length: 255 }).unique().notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    name: text("name").notNull(),
    imageUrl: text("image_url"),
    role: varchar("role", { length: 255 }),
});

// Articles table
export const articles = pgTable("articles", {
    id: varchar("id", { length: 255 }).primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    category: text("category").notNull(),
    featuredImage: text("featured_image").notNull(),
    authorId: varchar("author_id", { length: 255 }).notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Comments table
export const comments = pgTable("comments", {
    id: varchar("id", { length: 255 }).primaryKey(),
    body: text("body").notNull(),
    articleId: varchar("article_id", { length: 255 }).notNull().references(() => articles.id),
    authorId: varchar("author_id", { length: 255 }).notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Likes table
export const likes = pgTable("likes", {
    id: varchar("id", { length: 255 }).primaryKey(),
    isLiked: boolean("is_liked").default(false).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
    articleId: varchar("article_id", { length: 255 }).notNull().references(() => articles.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (likes) => ({
    userArticleUnique: unique().on(likes.userId, likes.articleId),
}));


export const userRelations = relations(users, ({ many }) => ({
    articles: many(articles),
    comments: many(comments),
    likes: many(likes),
}));

export const articleRelations = relations(articles, ({ one, many }) => ({
    author: one(users, {
        fields: [articles.authorId],
        references: [users.id],
    }),
    comments: many(comments),
    likes: many(likes),
}));

export const commentRelations = relations(comments, ({ one }) => ({
    author: one(users, {
        fields: [comments.authorId],
        references: [users.id],
    }),
    article: one(articles, {
        fields: [comments.articleId],
        references: [articles.id],
    }),
}));

export const likeRelations = relations(likes, ({ one }) => ({
    user: one(users, {
        fields: [likes.userId],
        references: [users.id],
    }),
    article: one(articles, {
        fields: [likes.articleId],
        references: [articles.id],
    }),
}));
