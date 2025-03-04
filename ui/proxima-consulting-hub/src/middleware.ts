import { NextRequest, NextResponse } from "next/server";
import { SESSION_BFF, SESSION_CLAIMS } from "./hooks/use-cookie";
import { AuthStateType } from "./store/features/auth/auth-types";
import { getPages } from "./utils/pages";

export const config = {
    matcher: ["/secured/:path*"],
};

const middleware = (request: NextRequest) => {
    if (!request.cookies.has(SESSION_BFF) || !request.cookies.has(SESSION_CLAIMS)) return redirectError(request);

    const cookie = request.cookies.get(SESSION_CLAIMS);

    if(!cookie) return redirectError(request);

    const data = Buffer.from(cookie.value, "base64").toString("ascii");
    const authState:AuthStateType = JSON.parse(data);

    const pages = getPages(authState);
    const hasPage = pages.some(p => p.href === request.nextUrl.pathname);

    if(!hasPage) return redirectError(request);

    console.log("cookieData", data)
    console.log("pages", JSON.stringify(pages))
    console.log("hasPage", hasPage)

    return NextResponse.next();
};

const redirectError = (request: NextRequest) => {
    return NextResponse.redirect(new URL("/", request.url));;
};

export default middleware;
