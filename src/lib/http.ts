import apiRoot from '@/constants/api'
import tokenMethod from '@/lib/storage'

type CustomRequestInit = Omit<RequestInit, 'method'> & {
  baseURL?: string
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const isClient = typeof window !== 'undefined'

const request = async <Response>(method: Method, url: string, options?: CustomRequestInit) => {
  // If you pass options.baseURL is a empty string, it will call api to server of NextJS
  // Else it will call to server of NodeJS (Express)
  const baseURL = options?.baseURL === undefined ? apiRoot : ''

  // If you pass url endpoint with format includes '/auth/login' or 'auth/login' same correct
  const fullURL = url.startsWith('/') ? `${baseURL}${url}` : `${baseURL}/${url}`

  // If you pass body data request, it will auto change from object to string to send on request
  const body = options?.body ? JSON.stringify(options?.body) : undefined

  const token = isClient && tokenMethod.get()

  const baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token?.accessToken}`
  }

  // eslint-disable-next-line no-useless-catch
  try {
    const res = await fetch(fullURL, {
      ...options,
      headers: {
        ...baseHeaders,
        ...options?.headers
      } as any,
      method,
      body
    })

    const result = (await res.json()) as Response

    if (!res.ok) {
      throw result
    }

    if (res.status >= 200 && res.status < 300) {
      return result
    }
  } catch (error) {
    throw error
  }
}

const http = {
  get: <Response>(url: string, options?: Omit<CustomRequestInit, 'body'>) => {
    return request<Response>('GET', url, { ...options })
  },
  post: <Response>(url: string, body: any, options?: Omit<CustomRequestInit, 'body'>) => {
    return request<Response>('POST', url, { ...options, body })
  },
  put: <Response>(url: string, body: any, options?: Omit<CustomRequestInit, 'body'>) => {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete: <Response>(url: string, body: any, options?: Omit<CustomRequestInit, 'body'>) => {
    return request<Response>('DELETE', url, { ...options, body })
  }
}

export default http
