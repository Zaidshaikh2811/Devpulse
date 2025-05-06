import React from 'react'
import ArticleTable from './ArticleTable'
import { getArticlesByUserWithStats } from '@/actions/create-article';

const RecentArticles = async () => {
    const result = await getArticlesByUserWithStats();



    return (
        <div>
            <ArticleTable result={result} />
        </div>
    )
}

export default RecentArticles
