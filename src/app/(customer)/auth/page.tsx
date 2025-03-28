import TabsAuth from './_components/tabs-auth'
import Breadcrumb from '@/shared/components/breadcrumb'
import Container from '@/shared/components/container'
import { CaretRight, House } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

const AuthPage = () => {
  return (
    <main>
      {/* Breadcrumb */}
      <div className='h-[72px] bg-gray-50'>
        <Container className='h-full flex items-center'>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href='/' className='flex items-center gap-2'>
                <House size={20} className='flex-shrink-0' />
                <span>Home</span>
                <CaretRight size={12} />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href='/' className='flex items-center gap-2'>
                <span>Shop</span>
                <CaretRight size={12} />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href='/' className='flex items-center gap-2'>
                <span>Shop Grid</span>
                <CaretRight size={12} />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item isActive>Behicle & Accessories</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>

      {/* Form */}
      <div className='flex items-center justify-center py-[100px]'>
        <TabsAuth />
      </div>
    </main>
  )
}

export default AuthPage
