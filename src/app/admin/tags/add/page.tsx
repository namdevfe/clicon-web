import ProductTagForm from '@/app/admin/tags/_components/product-tag-form'
import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import Container from '@/components/container'
import { CaretRight, Stack, Tag } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

const AddProductTagPage = () => {
  return (
    <Container className='py-14'>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href='/admin/dashboard' className='flex items-center gap-2'>
            <Stack size={20} className='flex-shrink-0' />
            <span>Dashboard</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href='/admin/tags' className='flex items-center gap-2'>
            <Tag size={20} className='flex-shrink-0' />
            <span>Tags</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Add</Breadcrumb.Item>
      </Breadcrumb>
      <Card title='Add tag' className='mt-4'>
        <ProductTagForm />
      </Card>
    </Container>
  )
}

export default AddProductTagPage
