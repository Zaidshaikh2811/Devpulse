import { Button } from '@heroui/button'
import React from 'react'
import CardComponent from './Card'
import { getFeaturedArticles } from '@/actions/get-article'

const FeatureArticles = async () => {

    const articles = await getFeaturedArticles()


    return (
        <div className='container my-14  '>
            <div className='flex justify-between text-center align-middle items-center mb-10'>

                <h1 className='text-2xl'>Feature Articles</h1>
                <Button color="primary" variant="ghost">
                    Read All Articles
                </Button>


            </div>
            {
                articles.map((article: any) => {
                    return (
                        <CardComponent
                            id={article.articleId}
                            authorName={article.author.name}
                            authorImageUrl={article.author.imageUrl}
                            key={article.createdAt}
                            title={article.title}

                            category={article.category}
                            featuredImage={article.featuredImage}
                            createdAt={article.createdAt}

                        />
                    )
                })

            }
        </div>
    )
}

export default FeatureArticles
