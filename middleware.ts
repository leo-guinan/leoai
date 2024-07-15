import {auth} from "./auth"
import {NextResponse} from "next/server";


export default auth((req) => {
    console.log("In auth middleware...")
    if (!req?.auth?.user) {
        console.log("User not logged in...")
        if (req.url.split('?')[0].endsWith('/sign-in')) {
            return;
        }
        // Redirect to login if not authenticated
        const signInUrl = new URL('/sign-in', req.nextUrl.origin)
        signInUrl.searchParams.set('next', req.url)
        return NextResponse.rewrite(signInUrl)

    }


    return NextResponse.next();
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|privacy|terms).*)']
}
