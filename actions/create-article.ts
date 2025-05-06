"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

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
                const stream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
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

    try {
        console.log(crypto.randomUUID());

        console.log(imageUrl);

        // await db.insert(articles).values({
        //     id: crypto.randomUUID(),
        //     title: String(title),
        //     description: String(description),
        //     category: String(category),
        //     content: String(content),
        //     featuredImage: imageUrl ?? undefined,
        //     authorId: userId,
        //     createdAt: new Date(),
        // });

        return { errors: {}, success: true };
    } catch (error) {
        console.error("DB insert error:", error);
        return {
            errors: { general: ["Failed to create article. Please try again."] },
            success: false,
        };
    }
};
