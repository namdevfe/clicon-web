import ProductForm from '@/app/admin/products/_components/product-form'
import Breadcrumb from '@/components/breadcrumb'
import Container from '@/components/container'
import { CaretRight, Package, Stack } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

const AddProductPage = () => {
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
          <Link href='/admin/products' className='flex items-center gap-2'>
            <Package size={20} className='flex-shrink-0' />
            <span>Products</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Add</Breadcrumb.Item>
      </Breadcrumb>

      <ProductForm />
    </Container>
  )
}

export default AddProductPage
