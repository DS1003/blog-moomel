'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/app/_components/admin/AdminSidebar';
import AdminHeader from '@/app/_components/admin/AdminHeader';

export default function AdminLayoutShell({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F9F7F2] flex">
            {/* Sidebar - Passed state for mobile handling */}
            <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:pl-64 min-w-0 transition-all duration-300">
                <AdminHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
