'use client'

import Breadcrumb from '@/components/breadcrumb'
import { CaretRight, Stack } from '@phosphor-icons/react'
import Link from 'next/link'

const UsersPageBreadcrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link href='/' className='flex items-center gap-2'>
          <Stack size={20} className='flex-shrink-0' />
          <span>Dashboard</span>
          <CaretRight size={12} />
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item isActive>Users</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default UsersPageBreadcrumb
