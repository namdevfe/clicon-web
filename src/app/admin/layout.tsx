import AdminHeader from '@/app/admin/_components/admin-header'
import AdminSidebar from '@/app/admin/_components/admin-sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      <div className='fixed left-0 top-0 h-screen w-[var(--w-sidebar)] shadow-md'>
        <AdminSidebar />
      </div>
      <div className='w-[calc(100%-var(--w-sidebar))] ml-auto'>
        <AdminHeader />
        <main className='pt-[var(--h-admin-header)]'>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
