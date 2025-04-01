export type Position = 'left' | 'right'

export interface ApiResponse<T> {
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
