import { STORAGE } from '@/constants/storage'
import { Login, ProfileResponse } from '@/types/auth'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const AUTH_PATHS = ['/auth', '/auth/email-verification']
const CUSTOMER_PATHS = ['/profile']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = !!request.cookies.get(STORAGE.AUTH)?.value
    ? (JSON.parse(request.cookies.get(STORAGE.AUTH)?.value || '') as Login)
    : null
  const profile = request.cookies.get(STORAGE.PROFILE)?.value
    ? (JSON.parse(request.cookies.get(STORAGE.PROFILE)?.value as string) as ProfileResponse)
    : null
  const accessToken = token?.accessToken || ''
  const isAdminPath = pathname.startsWith('/admin')
  const isCustomerPath = CUSTOMER_PATHS.some((path) => pathname.startsWith(path))

  // If haven't accessToken & role have not admin role is redirect to permission deined page
  if ((isAdminPath || isCustomerPath) && !accessToken) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (!profile && (isAdminPath || isCustomerPath)) {
    return NextResponse.redirect(new URL('/permission-denied', request.url))
  }

  const isCustomer = profile?.role.name.toLowerCase() === 'customer'
  const isAdmin = profile?.role.name.toLowerCase() === 'admin'

  if (!!accessToken && !!profile) {
    // If have accessToken then redirect to home page
    if (AUTH_PATHS.some((path) => path.includes(pathname))) {
      return NextResponse.redirect(new URL('/', request.url))
    } else if (isAdminPath && isCustomer) {
      return NextResponse.redirect(new URL('/permission-denied', request.url))
    } else if (isCustomerPath && isAdmin) {
      return NextResponse.redirect(new URL('/permission-denied', request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/auth/:path*', '/admin/:path*', '/profile']
}
