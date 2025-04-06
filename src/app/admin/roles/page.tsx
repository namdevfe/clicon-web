import Breadcrumb from '@/components/breadcrumb'
import Button from '@/components/button'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import Table, { Column } from '@/components/table'
import { ROLE_LIMITS } from '@/constants/pagination'
import { STORAGE } from '@/constants/storage'
import roleService from '@/services/role-service'
import { Login } from '@/types/auth'
import { QueryParams } from '@/types/global'
import { Role } from '@/types/role'
import { CaretRight, PencilSimpleLine, Plus, Stack } from '@phosphor-icons/react/dist/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

const getRoles = async (accessToken: string, query?: QueryParams) => {
  if (accessToken) {
    try {
      const response = await roleService.getRolesWithPagination(query, accessToken)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

const ROLE_COLUMNS: Column[] = [
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

const renderRow = (item: Role) => {
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
            <Link href={`/admin/roles/edit/${item._id}`}>
              <PencilSimpleLine size={18} />
            </Link>
          </Button>
        </div>
      </td>
    </tr>
  )
}

interface RolesPageProps {
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}

const RolesPage = async ({ searchParams }: RolesPageProps) => {
  const queryParams = {
    page: Number(searchParams?.page) || 1,
    limit: Number(searchParams?.limit) || +ROLE_LIMITS
  }
  const cookieStore = cookies()
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value || '') as Login
  const accessToken = token.accessToken
  const response = await getRoles(accessToken, queryParams)
  const roles = response?.data?.roles || []
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
          <Breadcrumb.Item isActive>Roles</Breadcrumb.Item>
        </Breadcrumb>
        <div className='flex items-start justify-between my-4'>
          <h1 className='text-heading1'>Roles</h1>
          <Button variant='primary' size='small'>
            <Link href='/admin/roles/add' className='flex items-center gap-2'>
              <Plus size={14} weight='bold' />
              <span>Add new role</span>
            </Link>
          </Button>
        </div>
        <Table columns={ROLE_COLUMNS} data={roles || []} renderRow={renderRow} />
        <Pagination
          route='/admin/roles'
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

export default RolesPage
