import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const excludedRoutes = ['/login', '/register', '/']

	if (excludedRoutes.includes(pathname)) {
		return NextResponse.next()
	}

	const token = cookies().get('token')

	if (!token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/', '/test'],
}
