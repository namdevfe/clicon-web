'use client'

import roleService from '@/services/role-service'
import { Role } from '@/types/role'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
const Badge = dynamic(() => import('@/components/badge'))

interface RoleBadgeProps {
  id: string
}

const RoleBadge = ({ id }: RoleBadgeProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [role, setRole] = useState<Role>()
  const variants = ['danger', 'warning', 'success', 'secondary', 'gray']
  const randomVariant = variants[Math.floor(Math.random() * variants.length)]

  useEffect(() => {
    ;(async () => {
      if (id) {
        setIsLoading(true)
        try {
          const response = await roleService.getRoleDetails(id)
          if (!!response?.data) {
            setRole(response.data)
          }
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }
    })()
  }, [id])

  if (!isLoading && role?.name) {
    return <Badge variant={randomVariant as any}>{role?.name}</Badge>
  }

  return null
}

export default RoleBadge
