import { Button } from '@heroui/button'
import React from 'react'
import { title } from '@/components/primitives'
import DashboardStatsCard from '@/components/UI/DashboardStatsCard'
import { IoDocumentSharp } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { Metadata } from "next";
import RecentArticles from '@/components/UI/RecentArticles';
import Head from 'next/head';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { getDashboardStats } from '@/actions/dashboard/getDashboardStats';

import { auth } from '@clerk/nextjs/server';



export const metadata: Metadata = {
    title: {
        default: "DevPulse Dashboard",
        template: "%s | DevPulse"
    },
    description: "Manage your blog with ease. View and track articles, comments, and likes.",
    icons: {
        icon: "/favicon.ico", // Change to your actual favicon path
    },
};





const page = async () => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error('User ID is required');
    }
    const { articleCount, commentCount, likeCount } = await getDashboardStats(userId);

    return (
        <>
            <Head>
                <title>Blog Dashboard</title>
                <meta name="description" content="Manage your blog with ease. View and track articles, comments, and likes." />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Blog Dashboard" />
                <meta property="og:description" content="Manage your blog with ease. View and track articles, comments, and likes." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://example.com/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Blog Dashboard" />
                <meta name="twitter:description" content="Manage your blog with ease. View and track articles, comments, and likes." />
                <meta name="twitter:image" content="https://example.com/og-image.jpg" />
            </Head>
            <div className='container'>
                <div className='flex justify-between py-2'>
                    <h3 className={title({ color: "blue" })}>Blog Dashboard</h3>

                    <Button color="primary" variant="bordered"> <Link href="/dashboard/create-article">Create Article</Link></Button>
                </div>
                <div className='grid grid-cols-3 gap-4 my-12'>

                    <DashboardStatsCard
                        title='Total Articles'
                        value={articleCount.toString()}
                        description="The total number of articles you have created and published."
                        icon={<IoDocumentSharp />}
                    />
                    <DashboardStatsCard
                        title='Total Comments'
                        value={commentCount.toString()}
                        description="The total number of comments you have made on articles."
                        icon={<FaRegComment />}
                    />
                    <DashboardStatsCard
                        title='Total Likes'
                        value={likeCount.toString()}
                        description="The total number of likes you have received on your articles from readers."
                        icon={<Heart />}
                    />
                </div>
                <RecentArticles />
            </div>
        </>
    )
}

export default page
