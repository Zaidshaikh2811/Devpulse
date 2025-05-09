import { getArticleByID } from '@/actions/get-article'
import EditArticlePage from '@/components/UI/EditArticlePage'
import React from 'react'
import { Metadata } from "next";


export const metadata: Metadata = {

    title: "Edit Article",
    description: "Edit your article",
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const article = await getArticleByID(id)

    if (!article) {
        return <div>Article not found</div>
    }

    const { title, category, content, featuredImage, description } = article


    return (
        <div>
            <EditArticlePage id={id} title={title} category={category} content={content} image={featuredImage} description={description} />

        </div>
    )
}

export default page
