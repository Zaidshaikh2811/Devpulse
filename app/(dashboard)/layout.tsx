"use client";
import ResponsiveSidebar from '@/components/UI/Drawer'
import { Modal } from '@heroui/react'
import React from 'react'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex'>

            <div className=' '>

                <ResponsiveSidebar />
            </div>

            <main className="flex-1   p-6">
                {children}
            </main>
        </div>
    )
}