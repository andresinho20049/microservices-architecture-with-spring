import { NextRequest, NextResponse } from "next/server";
import { SESSION_BFF, SESSION_CLAIMS } from "./hooks/use-cookie";
import { decodeSecFromBase64 } from "./hooks/use-encode";
import { AuthStateType } from "./store/features/auth/auth-types";
import { usePage } from "./hooks/use-page";

export const config = {
    matcher: ["/secured/:path*"],
};

const middleware = (request: NextRequest) => {
    if (!request.cookies.has(SESSION_BFF) || !request.cookies.has(SESSION_CLAIMS)) return redirectError(request);

    const cookie = request.cookies.get(SESSION_CLAIMS);

    if(!cookie || !checksIfUserHasPermission(cookie.value, request.nextUrl.pathname)) return redirectError(request);

    return NextResponse.next();
};

const checksIfUserHasPermission = (cookieValue: string, pathname: string) => {

    try {
        const data = decodeSecFromBase64(cookieValue);
        const authState:AuthStateType = JSON.parse(data);

        const { getPagesAuthorized } = usePage();
        
        const pages = getPagesAuthorized(authState)
        const hasPage = pages.some(p => p.href === pathname);
        
        return hasPage;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const redirectError = (request: NextRequest) => {
    return NextResponse.redirect(new URL("/", request.url));
};

export default middleware;
