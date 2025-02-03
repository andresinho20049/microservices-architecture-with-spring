import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ['/secured/:path*']
}

const middleware = (request: NextRequest) => {
    if(!request.cookies.has("JSESSIONID"))
        return redirectError(request);

    return NextResponse.next();
}

const redirectError = (request: NextRequest) => {
    request.cookies.delete('token');

    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('token');

    return response;
}

export default middleware;