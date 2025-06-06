'use client'
import Avatar from '@/components/avatar'
import Container from '@/components/container'
import Dropdown from '@/components/dropdown'
import Menu, { MenuItem } from '@/components/menu'
import { STORAGE } from '@/constants/storage'
import tokenMethod from '@/lib/storage'
import authService from '@/services/auth-service'
import { useAppDispatch } from '@/store'
import { setProfile } from '@/store/reducers/authSlice'
import { SignOut, User } from '@phosphor-icons/react'
import { BellSimple } from '@phosphor-icons/react/dist/ssr'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const ACCOUNT_MENU_ITEMS: MenuItem[] = [
  {
    icon: <User size={18} />,
    menuKey: 'profile',
    title: 'Profile',
    href: '/admin/profile'
  },
  {
    icon: <SignOut size={18} />,
    menuKey: 'logout',
    title: 'Logout'
  }
]

const AdminHeader = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res: any = await authService.logoutFromNextServer()
      if (res?.statusCode === StatusCodes.OK) {
        // Clear token & profile on next client
        tokenMethod.remove()
        localStorage.removeItem(STORAGE.PROFILE)
        dispatch(setProfile(null))

        // Clear token & profile on next server
        toast.success(res?.message)

        // Redirect to auth page
        router.push('/auth')
      }
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  const handleMenuChange = (item: MenuItem) => {
    switch (item.menuKey) {
      case 'logout':
        handleLogout()
        break
    }
  }

  return (
    <header className='h-16 shadow-md fixed top-0 z-[100] bg-white l-[var(--w-sidebar)] w-[calc(100%-var(--w-sidebar))]'>
      <Container className='h-full flex items-center justify-between'>
        <div>Search</div>
        <div className='flex items-center gap-4'>
          <button>
            <BellSimple size={20} />
          </button>

          <Dropdown position='right'>
            <Dropdown.Trigger>
              <button>
                <Avatar imageURL='/images/avatar-img.jpg' alt='Avatar' width={36} height={36} priority />
              </button>
            </Dropdown.Trigger>
            <Dropdown.Content className='fixed'>
              <Menu items={ACCOUNT_MENU_ITEMS} onChange={handleMenuChange} />
            </Dropdown.Content>
          </Dropdown>
        </div>
      </Container>
    </header>
  )
}

export default AdminHeader
