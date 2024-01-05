import { NextRequest, NextResponse } from 'next/server'
import verifyAuth from './libs/auth'

export async function middleware(req: NextRequest) {
    const routes = ['/login', '/registrar', '/mudar-senha']
    // console.log(req.cookies.get('token')?.value)

    const response = NextResponse.next()

    // Home is /bemvindo
    if (req.nextUrl.pathname == '/') {
        return NextResponse.redirect(new URL('/bemvindo', req.url))
    }

    // Auth logic
    const token = req.cookies.get('token')?.value
    const verifiedToken =
        token && (await verifyAuth(token)
            .catch((err: any) => console.log('from middleware: ', err)))
    if (routes.includes(req.nextUrl.pathname)) {
        if (!verifiedToken) {
            const response = NextResponse.next({ headers: {} });
            response.cookies.delete("token");
            return response
        }
    }

    if (!req.nextUrl.pathname.includes('/login')) {
        if (verifiedToken) {
            // console.log('token is verified')
            return response
        }
        if (req.nextUrl.pathname.includes('/registrar')) {

            return NextResponse.next()
        }
        if (req.nextUrl.pathname.includes('/mudar-senha')) {

            return NextResponse.next()
        }
        // console.log('token is NOT verified', verifiedToken)
        return NextResponse.redirect(new URL('/login', req.url))
    }


    return response
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|manifest.json).*)',
    ],
}
