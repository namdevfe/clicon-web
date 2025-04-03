import AdminHeader from '@/app/admin/_components/admin-header'
import AdminSidebar from '@/app/admin/_components/admin-sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      <AdminSidebar />
      <div className='w-[calc(100%-var(--w-sidebar))] ml-auto'>
        <AdminHeader />
        <main className='pt-[var(--h-admin-header)]'>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
