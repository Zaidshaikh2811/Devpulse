"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});
export const editArticle = async (
    formData: FormData,
) => {
    try {

        const id = formData.get("id") as string | null;
        const title = formData.get("title") as string | null;
        const description = formData.get("description") as string | null;
        const content = formData.get("content") as string | null;
        const newImage = formData.get("image") as File | null;

        console.log(id, title, description, content, newImage);

        const article = await db.query.articles.findFirst({
            where: eq(articles.id, id || ""),
        });

        if (!article) {
            throw new Error("Article not found");
        }


        let imageUrl = article.featuredImage;
        // If a new image is uploaded
        if (newImage) {
            // 1. Delete old image from Cloudinary
            if (imageUrl) {
                const urlParts = new URL(imageUrl).pathname.split('/');
                const folder = urlParts[urlParts.length - 2]; // e.g. 'blog'
                const filename = urlParts[urlParts.length - 1].split('.')[0]; // 'xyz123abc'
                const publicId = `${folder}/${filename}`;


                await cloudinary.uploader.destroy(publicId, function (error: any, result: any) {
                    if (error) {
                        console.error('Error deleting image:', error);
                    } else {
                        console.log('Image deleted successfully:', result);
                    }
                });
            }


            // 2. Upload new image
            const buffer = await newImage.arrayBuffer();
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "blog",
                    },
                    (error: any, result: any) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                stream.end(Buffer.from(buffer));
            });

            const uploadResult = result as any;

            imageUrl = uploadResult.secure_url;
        }

        // 3. Update DB
        const updated = await db
            .update(articles)
            .set({
                title: title || undefined,
                description: description || undefined,
                content: content || undefined,
                featuredImage: imageUrl,
            })
            .where(eq(articles.id, id || ""));

        return { success: true, message: "Article updated successfully" };
    } catch (error: any) {
        console.error("editArticle error", error);
        return {
            success: false,
            errors: error.message || "Failed to update article",
        }
    }
};
