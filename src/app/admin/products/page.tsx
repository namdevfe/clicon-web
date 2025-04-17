import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Container from '@/components/container'
import { CaretRight, Plus, Stack } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

const ProductsPage = () => {
  return (
    <Container className='py-12'>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href='/admin/dashboard' className='flex items-center gap-2'>
            <Stack size={20} className='flex-shrink-0' />
            <span>Dashboard</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Products</Breadcrumb.Item>
      </Breadcrumb>
      <div className='flex items-start justify-between my-4'>
        <h1 className='text-heading1'>Products</h1>
        <Button variant='primary' size='small'>
          <Link href='/admin/products/add' className='flex items-center gap-2'>
            <Plus size={14} weight='bold' />
            <span>Add new product</span>
          </Link>
        </Button>
      </div>
    </Container>
  )
}

export default ProductsPage
