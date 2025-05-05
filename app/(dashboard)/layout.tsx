

import ResponsiveSidebar from '@/components/UI/Drawer';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar is fixed, so we don't wrap it in the flex container directly */}
            <ResponsiveSidebar />

            {/* Main content takes remaining width */}
            <main className="flex-1 p-6 ml-0 md:ml-64 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
