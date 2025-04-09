import ButtonDeleteProductCategory from '@/app/admin/products/categories/_components/button-delete-product-category'
import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import Table, { Column } from '@/components/table'
import { PRODUCT_CATEGORY_LIMITS } from '@/constants/pagination'
import { STORAGE } from '@/constants/storage'
import productCategoryService from '@/services/product-category-service'
import { Login } from '@/types/auth'
import { QueryParams } from '@/types/global'
import { ProductCategory } from '@/types/product-category'
import { CaretRight, Package, PencilSimpleLine, Plus, Stack } from '@phosphor-icons/react/dist/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

// Call apis
const getProductCategories = async (query: QueryParams, accessToken: string) => {
  if (!!accessToken) {
    try {
      const response = await productCategoryService.getProductCategories(query, accessToken)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

const PRODUCT_CATEGORY_COLUMNS: Column[] = [
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

const renderRow = (item: ProductCategory) => {
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
            <Link href={`/admin/products/categories/edit/${item?.slug}`}>
              <PencilSimpleLine size={18} />
            </Link>
          </Button>
          <ButtonDeleteProductCategory productCategory={item} />
        </div>
      </td>
    </tr>
  )
}

interface ProductCategoriesPageProps {
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}

const ProductCategoriesPage = async ({ searchParams }: ProductCategoriesPageProps) => {
  const cookieStore = cookies()
  const token = cookieStore.get(STORAGE.AUTH) ? (JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login) : null
  const query: QueryParams = {
    page: Number(searchParams?.page) || 1,
    limit: Number(searchParams?.limit) || PRODUCT_CATEGORY_LIMITS
  }

  const productCategoriesData = await getProductCategories(query, token?.accessToken || '')
  const pagination = productCategoriesData?.data?.pagination

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
            <Package size={20} className='flex-shrink-0' />
            <span>Products</span>
            <CaretRight size={12} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Categories</Breadcrumb.Item>
      </Breadcrumb>
      <div className='flex items-start justify-between my-4'>
        <h1 className='text-heading1'>Categories</h1>
        <Button variant='primary' size='small'>
          <Link href='/admin/products/categories/add' className='flex items-center gap-2'>
            <Plus size={14} weight='bold' />
            <span>Add new category</span>
          </Link>
        </Button>
      </div>
      <Table
        columns={PRODUCT_CATEGORY_COLUMNS}
        data={productCategoriesData?.data?.productCategories || []}
        renderRow={renderRow}
      />
      <Pagination
        route='/admin/products/categories'
        className='mt-10 justify-center'
        currentPage={pagination?.currentPage || 1}
        limit={pagination?.limit || PRODUCT_CATEGORY_LIMITS}
        total={pagination?.total || 0}
        totalPages={pagination?.totalPages || 1}
      />
    </Container>
  )
}

export default ProductCategoriesPage
