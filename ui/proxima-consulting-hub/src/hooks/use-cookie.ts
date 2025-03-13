import { getCookie as getCookieC, hasCookie as hasCookieC, setCookie as setCookieC } from "cookies-next/client";
import { getCookie as getCookieS, hasCookie as hasCookieS, setCookie as setCookieS } from "cookies-next/server";
import { decodeSecFromBase64, encodeSecToBase64 } from "./use-encode";

export const JSESSIONID = "JSESSIONID";
export const SESSION_BFF = "SESSION_BFF";
export const SESSION_CLAIMS = "SESSION_CLAIMS";

export const setCookieServer = (key: string, value: string | Object) => {
    const encoded = encodeSecToBase64(value);
    setCookieS(key, encoded);
}

export const setCookieClient = (key: string, value: string | Object) => {
    const encoded = encodeSecToBase64(value);
    setCookieC(key, encoded);
}

export const getCookieServer = async (key: string) => {
    const cookie = await getCookieS(key);
    if(typeof cookie !== "string") return null;

    return decodeSecFromBase64(cookie);
}

export const getCookieClient = (key: string) => {
    const cookie = getCookieC(key);
    if(typeof cookie !== "string") return null;

    return decodeSecFromBase64(cookie);
}

export const hasCookieServer = (key: string) => {
    return hasCookieS(key);
}

export const hasCookieClient = (key: string) => {
    return hasCookieC(key);
}