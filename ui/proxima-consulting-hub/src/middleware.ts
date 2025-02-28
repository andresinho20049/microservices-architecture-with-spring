import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/secured/:path*"],
};

const middleware = (request: NextRequest) => {
    if (!request.cookies.has("SESSION_BFF")) return redirectError(request);

    return NextResponse.next();
};

const redirectError = (request: NextRequest) => {
    return NextResponse.redirect(new URL("/", request.url));;
};

export default middleware;
