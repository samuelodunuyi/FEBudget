import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authPath = ['/login']; // paths that don't require authentication

export default function middleware(request: NextRequest) {
  const hasToken = request.cookies.get('token');
  const isAuthPath = authPath.includes(request.nextUrl.pathname);
  if (hasToken && isAuthPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  let redirectUrl = `/login`;
  if (request.nextUrl.searchParams) {
    redirectUrl += `?${request.nextUrl.searchParams}`;
  }

  if (hasToken) {
    return NextResponse.next();
  }

  if (isAuthPath) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
export const config = {
  matcher: ['/login', '/'],
};
