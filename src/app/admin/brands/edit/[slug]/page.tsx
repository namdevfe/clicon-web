import BrandForm from '@/app/admin/brands/_components/brand-form'
import Breadcrumb from '@/components/breadcrumb'
import Card from '@/components/card'
import Container from '@/components/container'
import { STORAGE } from '@/constants/storage'
import brandService from '@/services/brand-service'
import { Login } from '@/types/auth'
import { CaretRight, Stack, Sticker } from '@phosphor-icons/react/dist/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

const getBrandDetails = async (slug: string, accessToken: string) => {
  try {
    const response = await brandService.getDetails(slug, accessToken)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}

interface EditBrandPageProps {
  params: {
    [key: string]: string | string[] | undefined
  }
}

const EditBrandPage = async ({ params }: EditBrandPageProps) => {
  // Get token
  const cookieStore = cookies()
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken
  // Call apis
  const brandDetails = await getBrandDetails(params?.slug as string, accessToken)

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
          <Link href='/admin/brands' className='flex items-center gap-2'>
            <Sticker size={20} className='flex-shrink-0' />
            <span>Brands</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{params?.slug}</Breadcrumb.Item>
      </Breadcrumb>

      <Card title='Edit brand' className='mt-4'>
        <BrandForm slug={params?.slug as string} brand={brandDetails} />
      </Card>
    </Container>
  )
}

export default EditBrandPage
