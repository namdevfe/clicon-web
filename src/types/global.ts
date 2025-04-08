export type Position = 'left' | 'right'

export interface ApiResponse<T = any> {
  statusCode: number
  message: string
  data?: T
}

export interface Base {
  createdAt: Date
  updatedAt: Date
  _destroy: boolean
  __v: number
}

export interface Pagination {
  total: number
  currentPage: number
  limit: number
  totalPages: number
}

export interface QueryParams {
  page: number
  limit: number
  sort?: 'asc' | 'desc'
  sortBy?: string
}
