import { getArticleByID } from '@/actions/get-article'
import EditArticlePage from '@/components/UI/EditArticlePage'
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    const article = await getArticleByID(id)

    const { title, category, content, featuredImage, description } = article


    return (
        <div>
            <EditArticlePage id={id} title={title} category={category} content={content} image={featuredImage} description={description} />

        </div>
    )
}

export default page
