"use server";

import { db } from "@/lib/db";
import { articles, comments, likes, users } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";


import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});
type CountResult = { articleId: string; count: number };


// Zod schema validation
const createArticleSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(3, "Description must be at least 3 characters"),
    category: z.string().min(1, "Please select a category"),
    content: z.string().min(10, "Content must be at least 10 characters"),
});

type FormState = {
    errors: {
        title?: string[];
        category?: string[];
        description?: string[];
        content?: string[];
        general?: string[];
        image?: string[];
    };
    success?: boolean;
};

// Main server action


export const getUserId = async (userId: string) => {
    try {
        const existingUser = await db.select().from(users).where(eq(users.clerkUserId, userId));


        if (!existingUser) {
            return {
                errors: { general: ["User not found"] },
                success: false,
            };
        }
        return existingUser[0].id;
    }
    catch (error) {
        return {
            errors: { general: ["User not found"] },
            success: false,
        }
    }
}


export const createArticle = async (formData: FormData): Promise<FormState> => {
    const { userId } = await auth();


    if (!userId) {
        return {
            errors: { general: ["Unauthorized"] },
            success: false,
        };
    }

    // Extract text fields
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const content = formData.get("content");



    // Validate presence of fields
    if (!title || !description || !category || !content) {
        return {
            errors: { general: ["All fields are required"] },
            success: false,
        };
    }

    // Prepare validation data
    const validationResult = createArticleSchema.safeParse({
        title,
        description,
        category,
        content,
    });

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
            success: false,
        };
    }

    let imageUrl: string | undefined = undefined;

    const imageFile = formData.get("image") as File | null;

    // Optional: Handle image upload if present
    if (imageFile && imageFile.size > 0) {
        try {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult = await new Promise<any>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ resource_type: "auto", folder: "blog", }, (error, result) => {
                    if (error || !result) {
                        reject(error || new Error("No result from Cloudinary"));
                    } else {
                        resolve(result);
                    }
                });
                stream.end(buffer);
            });

            imageUrl = uploadResult?.secure_url;
        } catch (err) {
            console.error("Image upload failed:", err);
            return {
                errors: { image: ["Failed to upload image"] },
                success: false,
            };
        }
    }

    const existingUser = await db.select().from(users).where(eq(users.clerkUserId, userId));


    if (!existingUser) {
        return {
            errors: { general: ["User not found"] },
            success: false,
        };
    }
    try {

        await db.insert(articles).values({
            id: crypto.randomUUID(),
            title: String(title),
            category: String(category),
            content: String(content),
            description: String(description),
            featuredImage: imageUrl ?? "",
            authorId: existingUser[0]?.id,
            createdAt: new Date(),
        });
        revalidatePath("/dashboard");

        return { errors: {}, success: true };
    } catch (error) {
        console.error("DB insert error:", error);
        return {
            errors: { general: ["Failed to create article. Please try again."] },
            success: false,
        };
    }
};


export async function getArticlesByUserWithStats(page = 1, limit = 10) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return { message: "Unauthorized", success: false };
        }

        const offset = (page - 1) * limit;

        // Get paginated articles
        const idResult = await getUserId(userId);

        if (typeof idResult !== "string") {
            return { message: "User not found", success: false };
        }

        const articlesList = await db
            .select()
            .from(articles)
            .where(eq(articles.authorId, idResult))
            .limit(limit)
            .offset(offset);




        // Optionally get total count for pagination info
        const [{ count }] = await db
            .select({ count: sql<number>`count(*)` })
            .from(articles)
            .where(eq(articles.authorId, userId));

        return {
            data: articlesList,
            pagination: {
                page,
                limit,
                total: Number(count),
                totalPages: Math.ceil(count / limit),
            },
            success: true,
        };

    } catch (error) {
        console.error("Error fetching articles:", error);
        return {
            message: "Failed to fetch articles. Please try again.",
            success: false,
        };
    }
}