
import { getAllArticles } from '@/actions/get-article';
import AllArticle from '@/components/UI/AllArticle'
import React from 'react'

const Page = async ({ searchParams }: { searchParams: { page?: string; search?: string } }) => {
    const page = Number(searchParams.page || 1);
    const search = searchParams.search || '';
    const { articles, totalCount } = await getAllArticles({ page, search });


    return (
        <div className='container'>
            <AllArticle articles={articles} totalCount={totalCount} currentPage={page} searchQuery={search} />
        </div>
    );
}

export default Page;
