import { getCookie as getCookieC, hasCookie as hasCookieC, setCookie as setCookieC } from "cookies-next/client";
import { getCookie as getCookieS, hasCookie as hasCookieS, setCookie as setCookieS } from "cookies-next/server";

export const JSESSIONID = "JSESSIONID";
export const SESSION_BFF = "SESSION_BFF";
export const SESSION_CLAIMS = "SESSION_CLAIMS";

export const setCookieServer = (key: string, value: string | Object) => {

    const data = typeof value === "string" ? value : JSON.stringify(value);
    const encoded = Buffer.from(data).toString("base64");

    setCookieS(key, encoded);
}

export const setCookieClient = (key: string, value: string | Object) => {

    const data = typeof value === "string" ? value : JSON.stringify(value);
    const encoded = Buffer.from(data).toString("base64");

    setCookieC(key, encoded);
}

export const getCookieServer = async (key: string) => {
    const cookie = await getCookieS(key);
    if(typeof cookie !== "string") return null;

    return Buffer.from(cookie, "base64").toString("ascii");
}

export const getCookieClient = (key: string) => {
    const cookie = getCookieC(key);
    if(typeof cookie !== "string") return null;

    return Buffer.from(cookie, "base64").toString("ascii");
}

export const hasCookieServer = (key: string) => {
    return hasCookieS(key);
}

export const hasCookieClient = (key: string) => {
    return hasCookieC(key);
}