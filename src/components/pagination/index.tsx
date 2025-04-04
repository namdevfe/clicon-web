'use client'

import Button from '@/components/button'
import { cn } from '@/lib/cn'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

interface PaginationProps {
  currentPage: number
  limit?: number
  totalPages?: number
  total?: number
  route?: string
  className?: string
}

const Pagination = ({ currentPage = 1, limit, totalPages = 0, route = '/', className = '' }: PaginationProps) => {
  const router = useRouter()

  const listPages = useMemo(() => {
    const results = []
    for (let i = 1; i <= totalPages; i++) {
      results.push(i)
    }
    return results
  }, [totalPages])

  const handlePageChange = (page: number) => {
    if (page === currentPage) return
    router.push(`${route}?page=${page}&limit=${limit}`)
  }

  const handlePreviousClick = () => {
    if (currentPage <= 1) return
    router.push(`${route}?page=${currentPage - 1}&limit=${limit}`)
  }

  const handleNextClick = () => {
    if (currentPage >= totalPages) return
    router.push(`${route}?page=${currentPage + 1}&limit=${limit}`)
  }

  return (
    <div className={cn('flex items-center gap-5', className)}>
      <Button
        outlined='primary-dark'
        className='rounded-full w-10 h-10 p-0 min-w-fit'
        disabled={currentPage === 1}
        onClick={handlePreviousClick}
      >
        <ArrowLeft size={24} />
      </Button>

      <div className='flex items-center gap-2'>
        {listPages.map((page) => (
          <Button
            key={page}
            variant='gray'
            className={cn('w-10 h-10 rounded-full min-w-fit py-[10px] px-0', {
              'border-primary-500 bg-primary-500 text-white hover:border-primary-500 hover:bg-primary-500':
                currentPage === page
            })}
            outlined='gray-light'
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        disabled={currentPage === totalPages}
        outlined='primary-dark'
        className='rounded-full w-10 h-10 p-0 min-w-fit'
        onClick={handleNextClick}
      >
        <ArrowRight size={24} />
      </Button>
    </div>
  )
}

export default Pagination
