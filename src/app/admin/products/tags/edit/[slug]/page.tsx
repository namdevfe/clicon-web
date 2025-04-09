import ProductTagForm from '@/app/admin/products/tags/_components/product-tag-form'
import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import Container from '@/components/container'
import { STORAGE } from '@/constants/storage'
import productTagService from '@/services/product-tag-service'
import { Login } from '@/types/auth'
import { CaretRight, Package, Rows, Stack } from '@phosphor-icons/react/dist/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

const getProductTagDetails = async (slug: string, accessToken: string) => {
  try {
    const response = await productTagService.getDetails(slug, accessToken)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}

interface EditProductTagPageProps {
  params: {
    [key: string]: string | string[] | undefined
  }
}

const EditProductTagPage = async ({ params }: EditProductTagPageProps) => {
  // Get token
  const cookieStore = cookies()
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken
  // Call apis
  const productTagDetails = await getProductTagDetails(params?.slug as string, accessToken)

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
        <Breadcrumb.Item>
          <Link href='/admin/products' className='flex items-center gap-2'>
            <Package size={20} className='flex-shrink-0' />
            <span>Products</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href='/admin/products/tags' className='flex items-center gap-2'>
            <Rows size={20} className='flex-shrink-0' />
            <span>Tags</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{params?.slug}</Breadcrumb.Item>
      </Breadcrumb>

      <Card title='Edit tag' className='mt-4'>
        <ProductTagForm slug={params?.slug as string} productTag={productTagDetails} />
      </Card>
    </Container>
  )
}

export default EditProductTagPage
