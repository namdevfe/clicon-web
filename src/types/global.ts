export type Position = 'left' | 'right'

export interface ApiResponse<T> {
  statusCode: number
  message: string
  data?: T
}
