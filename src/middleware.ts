import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const getCookie = (request: NextRequest, name: string): string | undefined => {
    const cookies = request.headers.get('cookie');
    if (!cookies) return undefined;

    const cookieArray = cookies.split('; ').map(cookie => cookie.split('='));
    let cookieMap: Map<string, string>;
    // @ts-ignore
    cookieMap = new Map(cookieArray);
    return cookieMap.get(name);
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const excludedRoutes = ['/login', '/register', '/public'];

    if (excludedRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    const token = request.headers.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/test'],
};
