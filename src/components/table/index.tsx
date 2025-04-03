import { cn } from '@/lib/cn'

export interface Column {
  id: string
  title: string
  className?: string
}

interface TableProps {
  columns: Column[]
  // eslint-disable-next-line no-unused-vars
  renderRow: (item: any) => React.ReactNode
  data: any[]
}

const Table = ({ columns = [], data = [], renderRow }: TableProps) => {
  return (
    <table className={cn('w-full')}>
      <thead className='py-[10px] bg-gray-50 border border-gray-100'>
        <tr>
          {columns.map((column) => (
            <th
              key={column.id}
              className={cn('px-6 py-[10px] text-gray-700 text-label4 text-left uppercase', column.className)}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='border border-gray-100'>{data.map((row) => renderRow(row))}</tbody>
    </table>
  )
}

export default Table
