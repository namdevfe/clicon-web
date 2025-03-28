import { cn } from '@/lib/cn'

interface BreadcrumbProps {
  children: React.ReactNode
}

const Breadcrumb = ({ children }: BreadcrumbProps) => {
  return <ul className='flex items-center gap-2'>{children}</ul>
}

interface BreadcrumbItemProps {
  isActive?: boolean
  children: React.ReactNode
}

const BreadcrumbItem = ({ children, isActive = false }: BreadcrumbItemProps) => {
  return (
    <li
      className={cn('text-gray-600 transition-colors duration-300', {
        'hover:text-primary-500': !isActive,
        'font-medium text-secondary-500': isActive
      })}
    >
      {children}
    </li>
  )
}

Breadcrumb.Item = BreadcrumbItem
export default Breadcrumb
