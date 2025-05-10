import { getArticleByID } from '@/actions/get-article';
import { subtitle, title } from '@/components/primitives';
import Author from '@/components/UI/Author';
import Editor from '@/components/UI/ReactQillContent';
import { timeAgo } from '@/lib/TimeCalculate';
import Image from 'next/image';
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import CommentForm from '@/components/UI/CommentForm';
import LikeButton from '@/components/UI/LikeButton';
import CommentCount from '@/components/UI/CommentCount';
import CommentShow from '@/components/UI/CommentShow';


import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Article",
    description: "View article",
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { userId } = await auth();
    const { id } = await params;
    const article = await getArticleByID(id);

    if (!article) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-2xl font-semibold text-red-500">Article not found</h1>
            </div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            {/* Article Header */}
            <section className="space-y-4 border-b pb-6">
                <h1 className={title({ color: 'blue' })}>{article.title}</h1>
                <h3 className={`${subtitle({ class: 'mt-1' })} text-muted-foreground max-w-2xl`}>
                    {article.description}
                </h3>
                <div className="text-sm text-gray-500">{timeAgo(article.createdAt)}</div>

                {article.author && (
                    <div className="pt-3">
                        <Author
                            authorName={article.author.name || 'Unknown Author'}
                            authorImageUrl={article.author.imageUrl || ''}
                        />
                    </div>
                )}
            </section>

            {/* Featured Image */}
            <section>
                <Image
                    alt="Article Cover"
                    className="rounded-xl shadow-sm object-cover w-full max-h-[500px] aspect-video"
                    src={article.featuredImage}
                    width={800}
                    height={500}
                    priority
                />
            </section>

            {/* Rich Content */}
            <section className="prose lg:prose-lg max-w-none mx-auto prose-blue">
                <Editor content={article.content} />
            </section>

            {/* Interactions */}
            <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t pt-6 gap-4">
                <LikeButton articleId={article.id} userId={userId} />
                <CommentCount articleId={article.id} />
            </section>

            {/* Comment Form */}
            <section className="pt-10">
                <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
                {userId ? (
                    <CommentForm articleId={article.id} userId={userId} />
                ) : (
                    <p className="text-gray-600 text-sm">Please <strong>log in</strong> to comment.</p>
                )}
            </section>

            {/* Comment List */}
            <section className="space-y-6">
                <h3 className="text-xl font-semibold">Comments</h3>
                <CommentShow articleId={article.id} />
            </section>
        </main>
    );
};

export default Page;
