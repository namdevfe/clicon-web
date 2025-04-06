import UserForm from '@/app/admin/users/_components/user-form'
import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import Container from '@/components/container'
import { CaretRight, Stack, Users } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

const AddUserPage = () => {
  return (
    <>
      <Container className='py-14'>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href='/' className='flex items-center gap-2'>
              <Stack size={20} className='flex-shrink-0' />
              <span>Dashboard</span>
              <CaretRight size={12} />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href='/' className='flex items-center gap-2'>
              <Users size={20} className='flex-shrink-0' />
              <span>Users</span>
              <CaretRight size={12} />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isActive>Add</Breadcrumb.Item>
        </Breadcrumb>
        <div className='flex justify-center mt-4'>
          <Card title='Add user' className='max-w-[500px] flex-1 '>
            <UserForm />
          </Card>
        </div>
      </Container>
    </>
  )
}

export default AddUserPage
