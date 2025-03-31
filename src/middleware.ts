import { Login } from '@/types/auth'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const AUTH_PATHS = ['/auth', '/auth/email-verification']
const ADMIN_PATHS = [
  '/admin',
  '/admin/dashboard',
  '/admin/users',
  '/admin/settings/roles',
  '/admin/settings/permissions'
]

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const cookies = !!request.cookies.get('auth')?.value
    ? (JSON.parse(request.cookies.get('auth')?.value || '') as Login)
    : null
  const accessToken = cookies?.accessToken || ''
  const isAdmin = false

  // If have accessToken then redirect to home page
  if (!!accessToken && AUTH_PATHS.some((path) => path.includes(pathname))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If haven't accessToken & role have not admin role is redirect to permission deined page
  if (!accessToken && ADMIN_PATHS.some((path) => path.includes(pathname)) && !isAdmin) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/auth/:path*', '/admin/:path*']
}
