import ButtonDeleteProductTag from '@/app/admin/tags/_components/button-delete-product-tag'
import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import Table, { Column } from '@/components/table'
import { PRODUCT_TAG_LIMITS } from '@/constants/pagination'
import productTagService from '@/services/product-tag-service'
import { QueryParams } from '@/types/global'
import { ProductTag } from '@/types/product-tag'
import { CaretRight, PencilSimpleLine, Plus, Stack } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

// Call apis
const getProductTags = async (query: QueryParams) => {
  try {
    const response = await productTagService.getList(query)
    return response
  } catch (error) {
    console.log(error)
  }
}

const PRODUCT_TAG_COLUMNS: Column[] = [
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

const renderRow = (item: ProductTag) => {
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
            <Link href={`/admin/tags/edit/${item?.slug}`}>
              <PencilSimpleLine size={18} />
            </Link>
          </Button>
          <ButtonDeleteProductTag productTag={item} />
        </div>
      </td>
    </tr>
  )
}

interface ProductTagsPageProps {
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}

const ProductTagsPage = async ({ searchParams }: ProductTagsPageProps) => {
  const query: QueryParams = {
    page: Number(searchParams?.page) || 1,
    limit: Number(searchParams?.limit) || PRODUCT_TAG_LIMITS
  }

  const productTagsData = await getProductTags(query)
  const pagination = productTagsData?.data?.pagination

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
        <Breadcrumb.Item isActive>Tags</Breadcrumb.Item>
      </Breadcrumb>
      <div className='flex items-start justify-between my-4'>
        <h1 className='text-heading1'>Tags</h1>
        <Button variant='primary' size='small'>
          <Link href='/admin/tags/add' className='flex items-center gap-2'>
            <Plus size={14} weight='bold' />
            <span>Add new tag</span>
          </Link>
        </Button>
      </div>
      <Table columns={PRODUCT_TAG_COLUMNS} data={productTagsData?.data?.productTags || []} renderRow={renderRow} />
      <Pagination
        route='/admin/tags'
        className='mt-10 justify-center'
        currentPage={pagination?.currentPage || 1}
        limit={pagination?.limit || PRODUCT_TAG_LIMITS}
        total={pagination?.total || 0}
        totalPages={pagination?.totalPages || 1}
      />
    </Container>
  )
}

export default ProductTagsPage
