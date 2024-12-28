import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {getToken} from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest,) {
  const {pathname} = req.nextUrl;
  
  if (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/register')) {
    const token = await getToken({req, secret: process.env.SECRET});
    if (token) {
      console.log('token', token)
      console.log('redirecting to /')
      return NextResponse.redirect( new URL('/', req.nextUrl));
    }
  }
  
  if (pathname.startsWith('/profil/') || pathname === '/') {
    const token = await getToken({req, secret: process.env.SECRET});
    if (!token) {
      console.log('redirecting to /auth/signin')
      return NextResponse.redirect( new URL('/auth/signin', req.nextUrl));
    }
  }
  return NextResponse.next()
  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profil/:path*', "/", "/auth/signin/:path*", "/auth/register/:path*"],
}
