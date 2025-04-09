import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import { CaretRight, Package, Rows, Stack } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import Container from '@/components/container'
import ProductCategoryForm from '@/app/admin/products/categories/_components/product-category-form'

const AddProductCategoryPage = () => {
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
            <Package size={20} className='flex-shrink-0' />
            <span>Products</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href='/' className='flex items-center gap-2'>
            <Rows size={20} className='flex-shrink-0' />
            <span>Categories</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Add</Breadcrumb.Item>
      </Breadcrumb>
      <Card title='Add product category' className='mt-4'>
        <ProductCategoryForm />
      </Card>
    </Container>
  )
}

export default AddProductCategoryPage
