import { getArticleByID } from '@/actions/get-article';
import { subtitle, title } from '@/components/primitives';
import Author from '@/components/UI/Author';
import Editor from '@/components/UI/ReactQillContent';
import { timeAgo } from '@/lib/TimeCalculate';
import Image from 'next/image';
import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Button } from '@heroui/button';
import CommentShow from '@/components/UI/CommentShow';
import { auth } from '@clerk/nextjs/server';
import CommentForm from '@/components/UI/CommentForm'; // ✅ your client component
import LikeButton from '@/components/UI/LikeButton';
import CommentCount from '@/components/UI/CommentCount';


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
        <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                    <h1 className={title({ color: 'blue' })}>{article.title}</h1>
                    <h3 className={`${subtitle({ class: 'mt-2' })} text-gray-600 max-w-2xl`}>
                        {article.description}
                    </h3>
                    <div className="text-sm text-gray-500">{timeAgo(article.createdAt)}</div>
                </div>

                {article.author && (
                    <div className="flex items-center gap-3 pt-2">
                        <Author
                            authorName={article.author.name || 'Unknown Author'}
                            authorImageUrl={article.author.imageUrl || ''}
                        />
                    </div>
                )}
            </div>

            {/* Image */}
            <div className="flex justify-center">
                <Image
                    alt="Article Cover"
                    className="rounded-lg shadow-md object-cover w-full h-auto max-h-[500px]"
                    src={article.featuredImage}
                    width={800}
                    height={500}
                />
            </div>

            {/* Content */}
            <div className="prose lg:prose-lg max-w-none mx-auto">
                <Editor content={article.content} />
            </div>

            {/* Interactions */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-6 gap-4">

                <LikeButton articleId={article.id} userId={userId} />
                <CommentCount articleId={article.id} />
            </div>

            <h3 className="text-lg font-semibold mb-3">Leave a comment</h3>
            {
                userId ?
                    <>
                        <CommentForm articleId={article.id} userId={userId} />
                    </>
                    :
                    <h1>Login to comment</h1>
            }

            {/* Comments */}
            <div className="space-y-6">
                <h3 className="text-xl font-semibold">Comments</h3>
                <CommentShow articleId={article.id} />
            </div>
        </div>
    );
};

export default Page;
