"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

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
    };
    success?: boolean;
};

export const createArticle = async (formData: FormData): Promise<FormState> => {
    const { userId } = await auth();
    if (!userId) {
        return {
            errors: { general: ["Unauthorized"] },
            success: false
        };
    }

    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        content: formData.get("content"),
    };


    // Validate all fields exist
    if (!rawData.title || !rawData.description || !rawData.category || !rawData.content) {
        return {
            errors: {
                general: ["All fields are required"],
            },
            success: false,
        };
    }

    const result = createArticleSchema.safeParse(rawData);

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            success: false
        };
    }

    try {
        // await db.insert(articles).values({
        //     ...result.data,
        //     userId,
        // });
        console.log("success");


        return { errors: {}, success: true };
    } catch (error) {
        console.error("Failed to create article:", error);
        return {
            errors: { general: ["Failed to create article. Please try again."] },
            success: false
        };
    }
};