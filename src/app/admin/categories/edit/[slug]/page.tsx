import ProductCategoryForm from '@/app/admin/categories/_components/product-category-form'
import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import Container from '@/components/container'
import { STORAGE } from '@/constants/storage'
import productCategoryService from '@/services/product-category-service'
import { Login } from '@/types/auth'
import { CaretRight, Rows, Stack } from '@phosphor-icons/react/dist/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

const getProductCategoryDetails = async (slug: string, accessToken: string) => {
  try {
    const response = await productCategoryService.getProductCategoryDetailsBySlug(slug, accessToken)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}

interface EditProductCategoryPageProps {
  params: {
    [key: string]: string | string[] | undefined
  }
}

const EditProductCategoryPage = async ({ params }: EditProductCategoryPageProps) => {
  // Get token
  const cookieStore = cookies()
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken
  // Call apis
  const productCategoryDetails = await getProductCategoryDetails(params?.slug as string, accessToken)

  return (
    <Container className='py-12'>
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
        <Breadcrumb.Item isActive>{params?.slug}</Breadcrumb.Item>
      </Breadcrumb>

      <Card title='Edit product category' className='mt-4'>
        <ProductCategoryForm slug={params?.slug as string} productCategory={productCategoryDetails} />
      </Card>
    </Container>
  )
}

export default EditProductCategoryPage
