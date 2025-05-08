"use server"
import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { v2 as cloudinary } from "cloudinary";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});


export const deleteArticleById = async (id: string) => {
    try {

        const article = await db.query.articles.findFirst({
            where: eq(articles.id, id || ""),
        });

        if (!article) {
            throw new Error("Article not found");
        }


        const imageUrl = article.featuredImage;
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


        await db.delete(articles).where(eq(articles.id, id));
        revalidatePath("/");

        return { message: "Article deleted successfully", success: true };

    }
    catch (err: any) {
        throw new Error(err.message || "Failed to delete article");
    }
}