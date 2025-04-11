import ButtonDeleteBrand from '@/app/admin/brands/_components/button-delete-brand'
import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import Table, { Column } from '@/components/table'
import { BRAND_LIMITS } from '@/constants/pagination'
import brandService from '@/services/brand-service'
import { Brand } from '@/types/brand'
import { QueryParams } from '@/types/global'
import { CaretRight, PencilSimpleLine, Plus, Stack } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

// Call apis
const getBrands = async (query: QueryParams) => {
  try {
    const response = await brandService.getList(query)
    return response
  } catch (error) {
    console.log(error)
  }
}

const BRAND_COLUMNS: Column[] = [
  {
    id: 'name',
    title: 'Name'
  },
  {
    id: 'description',
    title: 'Description',
    className: 'hidden xs:table-cell'
  },
  {
    id: 'actions',
    title: 'Actions'
  }
]

const renderRow = (item: Brand) => {
  return (
    <tr key={item._id} className='transition-colors duration-300 hover:bg-gray-50 cursor-pointer'>
      <td className='py-3 px-6'>
        <div className='flex items-center gap-[10px]'>
          <p>{item.name}</p>
        </div>
      </td>
      <td className='py-3 px-6 hidden xs:table-cell'>{item.description && <p>{item.description}</p>}</td>
      <td className='py-3 px-6'>
        <div className='flex items-center gap-2'>
          <Button variant='warning' className='min-w-8 w-7 h-8 p-0 rounded-full'>
            <Link href={`/admin/brands/edit/${item?.slug}`}>
              <PencilSimpleLine size={18} />
            </Link>
          </Button>
          <ButtonDeleteBrand brand={item} />
        </div>
      </td>
    </tr>
  )
}

interface BrandsPageProps {
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}

const BrandsPage = async ({ searchParams }: BrandsPageProps) => {
  const query: QueryParams = {
    page: Number(searchParams?.page) || 1,
    limit: Number(searchParams?.limit) || BRAND_LIMITS
  }

  const brandsData = await getBrands(query)
  const pagination = brandsData?.data?.pagination

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
        <Breadcrumb.Item isActive>Brands</Breadcrumb.Item>
      </Breadcrumb>
      <div className='flex items-start justify-between my-4'>
        <h1 className='text-heading1'>Brands</h1>
        <Button variant='primary' size='small'>
          <Link href='/admin/brands/add' className='flex items-center gap-2'>
            <Plus size={14} weight='bold' />
            <span>Add new brand</span>
          </Link>
        </Button>
      </div>
      <Table columns={BRAND_COLUMNS} data={brandsData?.data?.brands || []} renderRow={renderRow} />
      <Pagination
        route='/admin/brands'
        className='mt-10 justify-center'
        currentPage={pagination?.currentPage || 1}
        limit={pagination?.limit || BRAND_LIMITS}
        total={pagination?.total || 0}
        totalPages={pagination?.totalPages || 1}
      />
    </Container>
  )
}

export default BrandsPage
