import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const SUPER_ADMIN_EMAIL = 'zaynabrehan@gmail.com'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Protect super-admin routes
  if (pathname.startsWith('/super-admin')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('error', 'Please login to continue')
      return NextResponse.redirect(url)
    }
    if (user.email !== SUPER_ADMIN_EMAIL) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('error', 'Unauthorized access')
      return NextResponse.redirect(url)
    }
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('error', 'Please login to continue')
      return NextResponse.redirect(url)
    }
    
    // Check if user is super admin (redirect to super-admin dashboard)
    if (user.email === SUPER_ADMIN_EMAIL) {
      const url = request.nextUrl.clone()
      url.pathname = '/super-admin'
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in users away from login page
  if (pathname === '/login' && user) {
    const url = request.nextUrl.clone()
    if (user.email === SUPER_ADMIN_EMAIL) {
      url.pathname = '/super-admin'
    } else {
      url.pathname = '/admin'
    }
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
