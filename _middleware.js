/* import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // eslint-disable-next-line no-undef
    const token = await getToken({req, secret: process.env.JWT_SECRET});

    const { pathname } = req.nextUrl;
    //Tillåt requests om:
    // Request hämta next-auth session och provider
    //Token finns

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    //Om inte skicka till login sidan
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }

}
*/
export { default } from 'next-auth/middleware';

export const config = { matcher: ['/'] };