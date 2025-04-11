import ProductCategoryForm from '@/app/admin/categories/_components/product-category-form'
import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import Container from '@/components/container'
import { CaretRight, Rows, Stack } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

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
