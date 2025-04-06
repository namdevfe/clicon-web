import PermissionForm from '@/app/admin/permissions/_components/permission-form'
import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import Container from '@/components/container'
import { CaretRight, Key, Stack } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

const AddPermissionPage = async () => {
  return (
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
            <Key size={20} className='flex-shrink-0' />
            <span>Permission</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Add</Breadcrumb.Item>
      </Breadcrumb>
      <div className='flex justify-center mt-4'>
        <Card title='Add permission' className='max-w-[500px] w-full'>
          <PermissionForm />
        </Card>
      </div>
    </Container>
  )
}

export default AddPermissionPage
