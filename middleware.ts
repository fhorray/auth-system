import { NextRequest, NextResponse } from 'next/server';
import AuthService from './services/auth-service';

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

const publicRoutes = ['/', '/sign-up', '/login'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await AuthService.isSessionValid(); // Validate JWT Session
  if (!session) {
    const isAPIRoute = pathname.startsWith('/api');
    if (isAPIRoute) {
      return NextResponse.json({ message: 'Não Autorizado', status: 401 });
    }

    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
