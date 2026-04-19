import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  
  if (isDashboard) {
    const cookies = request.cookies.getAll()
    const hasAuth = cookies.some(cookie => 
      cookie.name.includes('auth-token') || 
      cookie.name.includes('supabase') ||
      cookie.name.includes('sb-') ||
      cookie.name.includes('access_token')
    )
    
    if (!hasAuth) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
