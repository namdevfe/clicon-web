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
      <div className='w-[calc(100%-var(--w-sidebar))] bg-secondary-500 ml-auto'>
        <header>Header</header>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
