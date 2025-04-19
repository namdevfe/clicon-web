import { getProducts } from '@/app/admin/products/actions'
import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import Table, { Column } from '@/components/table'
import { cn } from '@/lib/cn'
import { formatCurrency } from '@/lib/formatter'
import { QueryParams } from '@/types/global'
import { Product } from '@/types/product'
import { CaretRight, PencilSimpleLine, Plus, Stack } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

const PRODUCT_COLUMNS: Column[] = [
  {
    id: 'products',
    title: 'Products'
  },
  {
    id: 'price',
    title: 'Price',
    className: 'hidden xs:table-cell'
  },
  {
    id: 'stock-status',
    title: 'Stock status',
    className: 'hidden xs:table-cell'
  },
  {
    id: 'actions',
    title: 'Actions'
  }
]

const renderRow = (item: Product) => {
  const { _id, name, imageCover, slug, stock, price, oldPrice } = item || {}

  return (
    <tr key={_id || slug} className='transition-colors duration-300 hover:bg-gray-50 cursor-pointer'>
      {/* Product */}
      <td className='py-3 px-6'>
        <figure className='flex items-center gap-[10px]'>
          <div className='flex w-[72px] h-[72px] rounded overflow-hidden'>
            <Image
              src={imageCover || ''}
              alt={slug || ''}
              width={100}
              height={100}
              className='w-full h-full object-cover'
            />
          </div>
          <div>
            <Link href='/' className='text-body-tiny-400 transition-colors duration-300 hover:text-primary-500'>
              {name}
            </Link>
          </div>
        </figure>
      </td>
      {/* Price */}
      <td className='py-3 px-6 hidden xs:table-cell'>
        <p className='flex items-center gap-1'>
          {!!oldPrice && (
            <span className='text-body-small-400 text-gray-400 line-through'>{formatCurrency(oldPrice)}</span>
          )}
          <span className='text-body-small-500 text-gray-900'>{formatCurrency(price)}</span>
        </p>
      </td>
      {/* Stock */}
      <td className='py-3 px-6 hidden xs:table-cell'>
        <div
          className={cn('text-body-small-600 font-semibold uppercase', {
            'text-success-500': Number(stock) > 0,
            'text-danger-500': Number(stock) === 0
          })}
        >
          {Number(stock) > 0 ? 'In stock' : 'Out of stock'}
        </div>
      </td>
      {/* Actions */}
      <td className='py-3 px-6'>
        <div className='flex items-center gap-2'>
          <Button variant='warning' className='min-w-8 w-7 h-8 p-0 rounded-full'>
            <Link href='/'>
              <PencilSimpleLine size={18} />
            </Link>
          </Button>
          {/* <ButtonDeleteUser user={item} /> */}
        </div>
      </td>
    </tr>
  )
}

interface ProductPageProps {
  searchParams: {
    page: string
    limit: string
    sort: string
    sortBy: string
    [key: string]: string | string[] | undefined
  }
}

const ProductsPage = async ({ searchParams }: ProductPageProps) => {
  const { page = 1, limit = 10, sort = 'asc', sortBy } = searchParams || {}

  const queryParams: QueryParams = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sort,
    sortBy
  }
  const productsRes = await getProducts(queryParams)
  const products = productsRes?.products || []
  const pagination = productsRes?.pagination

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

      <Table columns={PRODUCT_COLUMNS} data={products} renderRow={renderRow} />

      <Pagination
        route='/admin/products'
        className='mt-10 justify-center'
        currentPage={pagination?.currentPage || 1}
        limit={pagination?.limit || 10}
        total={pagination?.total || 0}
        totalPages={pagination?.totalPages || 1}
      />
    </Container>
  )
}

export default ProductsPage
