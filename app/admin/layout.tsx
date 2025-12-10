import AdminSidebar from '@/app/_components/admin/AdminSidebar';
import AdminHeader from '@/app/_components/admin/AdminHeader';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#F9F7F2] flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:pl-64 min-w-0 transition-all duration-300">
                <AdminHeader />
                <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
