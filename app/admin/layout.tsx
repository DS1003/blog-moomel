import AdminLayoutShell from '@/app/_components/admin/AdminLayoutShell';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminLayoutShell>
            {children}
        </AdminLayoutShell>
    );
}
