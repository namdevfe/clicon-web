import BrandForm from '@/app/admin/products/brands/_components/brand-form'
import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import Container from '@/components/container'
import { CaretRight, Package, Rows, Stack } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

const AddBrandPage = () => {
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
          <Link href='/admin/products' className='flex items-center gap-2'>
            <Package size={20} className='flex-shrink-0' />
            <span>Products</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href='/admin/products/brands' className='flex items-center gap-2'>
            <Rows size={20} className='flex-shrink-0' />
            <span>Brands</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Add</Breadcrumb.Item>
      </Breadcrumb>
      <Card title='Add brand' className='mt-4'>
        <BrandForm />
      </Card>
    </Container>
  )
}

export default AddBrandPage
