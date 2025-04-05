import ButtonDeleteUser from '@/app/admin/users/_components/button-delete-user'
import RoleBadge from '@/app/admin/users/_components/role-badge'
import UsersPageBreadcrumb from '@/app/admin/users/_components/users-page-breadcrumb'
import Avatar from '@/components/avatar'
import Button from '@/components/button'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import Table, { Column } from '@/components/table'
import { USER_LIMITS } from '@/constants/pagination'
import { STORAGE } from '@/constants/storage'
import { cn } from '@/lib/cn'
import userService from '@/services/user-service'
import { Login } from '@/types/auth'
import { QueryParams } from '@/types/global'
import { User } from '@/types/user'
import { PencilSimpleLine, Plus } from '@phosphor-icons/react/dist/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

const getUsers = async (accessToken: string, query?: QueryParams) => {
  if (accessToken) {
    try {
      const response = await userService.getUsersWithPagination(query, accessToken)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

const USER_COLUMNS: Column[] = [
  {
    id: 'name',
    title: 'Name'
  },
  {
    id: 'role',
    title: 'Role',
    className: 'hidden xs:table-cell'
  },
  {
    id: 'status',
    title: 'Status',
    className: 'hidden xs:table-cell'
  },
  {
    id: 'actions',
    title: 'Actions'
  }
]

const renderRow = (item: User) => {
  return (
    <tr key={item._id} className='transition-colors duration-300 hover:bg-gray-50 cursor-pointer'>
      <td className='py-3 px-6'>
        <div className='flex items-center gap-[10px]'>
          <Avatar
            className={cn('flex-shrink-0 text-white p-2 border border-gray-600', {
              'bg-gray-200': !item.avatar
            })}
            size={28}
            imageURL={item?.avatar}
            alt='Avatar'
            width={28}
            height={28}
          />
          <div>
            <p className='text-body-small-600'>{`${item.firstName} ${item.lastName}`}</p>
            <Link href={`mailto:${item.email}`} className='text-body-tiny-400 text-secondary-500'>
              {item.email}
            </Link>
          </div>
        </div>
      </td>
      <td className='py-3 px-6 hidden xs:table-cell'>
        <RoleBadge id={item.role as string} />
      </td>
      <td className='py-3 px-6 hidden xs:table-cell'>
        <div
          className={cn('text-body-small-600', {
            'text-success-500': item.isActive,
            'text-danger-500': !item.isActive
          })}
        >
          {item.isActive ? 'Active' : 'Inactive'}
        </div>
      </td>
      <td className='py-3 px-6'>
        <div className='flex items-center gap-2'>
          <Button variant='warning' className='min-w-8 w-7 h-8 p-0 rounded-full'>
            <Link href={`/admin/users/edit/${item._id}`}>
              <PencilSimpleLine size={18} />
            </Link>
          </Button>
          <ButtonDeleteUser user={item} />
        </div>
      </td>
    </tr>
  )
}

interface UsersPageProps {
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const queryParams = {
    page: Number(searchParams?.page) || 1,
    limit: Number(searchParams?.limit) || +USER_LIMITS
  }
  const cookieStore = cookies()
  const token = JSON.parse(cookieStore.get(STORAGE.AUTH)?.value as string) as Login
  const response = await getUsers(token?.accessToken, queryParams)
  const users = response?.data?.users || []
  const pagination = response?.data?.pagination
  const { currentPage, limit, total, totalPages } = pagination || {}

  return (
    <>
      <Container className='py-12'>
        <UsersPageBreadcrumb />
        <div className='flex items-start justify-between my-4'>
          <h1 className='text-heading1'>Users</h1>
          <Button variant='primary' size='small'>
            <Link href='/admin/users/add' className='flex items-center gap-2'>
              <Plus size={14} weight='bold' />
              <span>Add new user</span>
            </Link>
          </Button>
        </div>
        <Table columns={USER_COLUMNS} data={users || []} renderRow={renderRow} />
        <Pagination
          route='/admin/users'
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

export default UsersPage
