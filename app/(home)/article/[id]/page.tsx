import { getArticleByID } from '@/actions/get-article';
import { subtitle, title } from '@/components/primitives';
import Author from '@/components/UI/Author';
import Editor from '@/components/UI/ReactQillContent';
import { timeAgo } from '@/lib/TimeCalculate';
import Image from 'next/image';

import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const article = await getArticleByID(id)



    if (!article) {
        return (
            <div>
                <h1>Article not found</h1>
            </div>
        )
    }


    return (
        <div className='container mt-10'>
            <div>

                <h1 className={title({ color: "blue" })}>{article.title}</h1>
                <h3 className={subtitle({ class: "mt-6" })}>{article.description}</h3>
                <span>{timeAgo(article.createdAt.toISOString())}</span>

                {article.author && (
                    <Author authorName={article.author.name} authorImageUrl={article.author.imageUrl || ''} />
                )}

            </div>
            <div>

            </div>
            <Image
                alt="HeroUI Album Cover"
                className="m-5"
                src={article.featuredImage}
                height={240}
                width={240}
            />

            <div>
                <Editor content={article.content} />
            </div>
            <div>
                {/* add comment , likes  */}
            </div>
            <div>
                {/* show comments */}
            </div>
        </div>
    )
}

export default page
