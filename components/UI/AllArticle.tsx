"use client"

import React, { useState, useEffect } from 'react'
import { title } from '../primitives'
import ArticleSearch from './ArticleSearch'
import { Pagination } from '@heroui/react'
import { useRouter } from 'next/navigation'
import CardComponent from './Card'

const AllArticle = ({ articles, totalCount, currentPage, searchQuery }: {
    articles: any[],
    totalCount: number,
    currentPage: number,
    searchQuery: string
}) => {
    const router = useRouter();
    const [search, setSearch] = useState(searchQuery);
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);


    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            router.push(`?page=1&search=${encodeURIComponent(search)}`);
        }, 500); // debounce

        return () => clearTimeout(timer);
    }, [search]);

    const handlePageChange = (page: number) => {
        router.push(`?page=${page}&search=${encodeURIComponent(debouncedSearch)}`);
    };

    return (
        <div>
            <div className='flex flex-col md:flex-row items-center justify-between gap-2 '>
                <h3 className={title({ color: "blue" })}>All Articles</h3>
                <ArticleSearch value={search} onChange={setSearch} />
            </div>

            <div className='grid gap-4 mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' >
                {articles.map((article, index) => (
                    <CardComponent
                        id={article.articleId}
                        authorName={article.author.name}
                        authorImageUrl={article.author.imageUrl}
                        key={`${article.createdAt}-${index}`}
                        title={article.title}

                        category={article.category}
                        featuredImage={article.featuredImage}
                        createdAt={article.createdAt}

                    />
                ))}
            </div>

            <div className='mt-6 flex justify-end'>
                <Pagination
                    total={Math.ceil(totalCount / 10)}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default AllArticle;
