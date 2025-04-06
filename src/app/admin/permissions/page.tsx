import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import Table, { Column } from '@/components/table'
import { PERMISSION_LIMITS } from '@/constants/pagination'
import { STORAGE } from '@/constants/storage'
import permissionService from '@/services/permission-service'
import { Login } from '@/types/auth'
import { QueryParams } from '@/types/global'
import { Permission } from '@/types/permission'
import { CaretRight, PencilSimpleLine, Plus, Stack } from '@phosphor-icons/react/dist/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

const getPermissions = async (accessToken: string, query?: QueryParams) => {
  if (accessToken) {
    try {
      const response = await permissionService.getPermissionsWithPagination(query, accessToken)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

const PERMISSION_COLUMNS: Column[] = [
  {
    id: 'url',
    title: 'Url'
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

const renderRow = (item: Permission) => {
  return (
    <tr key={item._id} className='transition-colors duration-300 hover:bg-gray-50 cursor-pointer'>
      <td className='py-3 px-6'>
        <div className='flex items-center gap-[10px]'>
          <p>{item.url}</p>
        </div>
      </td>
      <td className='py-3 px-6 hidden xs:table-cell'>{item.description && <p>{item.description}</p>}</td>
      <td className='py-3 px-6'>
        <div className='flex items-center gap-2'>
          <Button variant='warning' className='min-w-8 w-7 h-8 p-0 rounded-full'>
            <Link href={`/admin/permissions/edit/${item._id}`}>
              <PencilSimpleLine size={18} />
            </Link>
          </Button>
          {/* <ButtonDeleteRole role={item} /> */}
        </div>
      </td>
    </tr>
  )
}

interface PermissionsPageProps {
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}

const PermissionsPage = async ({ searchParams }: PermissionsPageProps) => {
  const queryParams = {
    page: Number(searchParams?.page) || 1,
    limit: Number(searchParams?.limit) || PERMISSION_LIMITS
  }
  const cookieStore = cookies()
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken
  const response = await getPermissions(accessToken, queryParams)
  const permissions = response?.data?.permissions || []
  const pagination = response?.data?.pagination
  const { currentPage, limit, total, totalPages } = pagination || {}

  return (
    <>
      <Container className='py-12'>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href='/' className='flex items-center gap-2'>
              <Stack size={20} className='flex-shrink-0' />
              <span>Dashboard</span>
              <CaretRight size={12} />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isActive>Permissions</Breadcrumb.Item>
        </Breadcrumb>
        <div className='flex items-start justify-between my-4'>
          <h1 className='text-heading1'>Permissions</h1>
          <Button variant='primary' size='small'>
            <Link href='/admin/permissions/add' className='flex items-center gap-2'>
              <Plus size={14} weight='bold' />
              <span>Add new permission</span>
            </Link>
          </Button>
        </div>
        <Table columns={PERMISSION_COLUMNS} data={permissions || []} renderRow={renderRow} />
        <Pagination
          route='/admin/permissions'
          className='mt-10 justify-center'
          currentPage={currentPage || 1}
          limit={limit}
          total={total}
          totalPages={totalPages}
        />
      </Container>
    </>
  )
}

export default PermissionsPage
