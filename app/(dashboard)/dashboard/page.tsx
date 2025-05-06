import { Button } from '@heroui/button'
import React from 'react'
import { title } from '@/components/primitives'
import DashboardStatsCard from '@/components/UI/DashboardStatsCard'
import { IoDocumentSharp } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import RecentArticles from '@/components/UI/RecentArticles';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const page = () => {
    return (
        <div className='container'>
            <div className='flex justify-between py-2'>
                <h3 className={title({ color: "blue" })}>Blog Dashboard</h3>

                <Button color="primary" variant="bordered"> <Link href="/dashboard/create-article">Create Article</Link></Button>
            </div>
            <div className='grid grid-cols-3 gap-4 my-12'>

                <DashboardStatsCard
                    title='Total Articles'
                    value='10'
                    description=" description "
                    icon={<IoDocumentSharp />}

                />
                <DashboardStatsCard
                    title='Total Articles'
                    value='10'
                    description=" description "
                    icon={<FaRegComment />}

                />
                <DashboardStatsCard
                    title='Total Articles'
                    value='10'
                    description=" description "
                    icon={<MdOutlineAccessTime />}

                />
            </div>
            <RecentArticles />
        </div>
    )
}

export default page
