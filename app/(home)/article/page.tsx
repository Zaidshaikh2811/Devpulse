
import { getAllArticles } from '@/actions/get-article';
import AllArticle from '@/components/UI/AllArticle'
import React from 'react'
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "All Articles",
    description: "View all articles",
}


const Page = async ({ searchParams }: { searchParams: Promise<{ page: string; search: string }> }) => {
    const params = await searchParams;
    const page = Number(params?.page || 1);
    const search = params?.search || '';


    const { articles, totalCount } = await getAllArticles({ page, search });


    return (
        <div className="container">
            <AllArticle
                articles={articles}
                totalCount={totalCount}
                currentPage={page}
                searchQuery={search}
            />
        </div>
    );
};

export default Page;
