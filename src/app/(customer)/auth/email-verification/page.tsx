import { EmailVerificationForm } from '@/components/auth'
import Breadcrumb from '@/components/breadcrumb'
import Container from '@/components/container'
import { CaretRight, House } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

const EmailVerificationPage = () => {
  return (
    <main>
      <div className='h-[72px] bg-gray-50 top-0 left-0 w-full'>
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
                <span>Sign up</span>
                <CaretRight size={12} />
              </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item isActive>Email verification</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>

      <div className='flex items-center justify-center py-[100px]'>
        <EmailVerificationForm />
      </div>
    </main>
  )
}

export default EmailVerificationPage
