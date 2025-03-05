import { descryptedAES, encryptedAES } from "./use-crypto";

const CHAR_NORMALIZE_MORE = "+";
const CHAR_NORMALIZE_EQUAL = "=";

const CHAR_DENORMALIZE_LESS = "-"
const CHAR_DENORMALIZE_UNDER = "_";

const normalize = (encoded: string) => {
    return encoded
        .replaceAll(CHAR_DENORMALIZE_LESS, CHAR_NORMALIZE_MORE)
        .replaceAll(CHAR_DENORMALIZE_UNDER, CHAR_NORMALIZE_EQUAL);
}

const denormalize = (encoded: string) => {
    return encoded
        .replaceAll(CHAR_NORMALIZE_MORE, CHAR_DENORMALIZE_LESS)
        .replaceAll(CHAR_NORMALIZE_EQUAL, CHAR_DENORMALIZE_UNDER);
}

export const encodeToBase64 = (value: string | Object) => {
    
    if(typeof value === "string") return Buffer.from(value).toString("base64");

    const data = JSON.stringify(value);
    return Buffer.from(data).toString("base64");
}

export const decodeFromBase64 = (encoded: string) => {
    return Buffer.from(encoded, "base64").toString("ascii");
}

export const encodeSecToBase64 = (value: string | Object) => {
    const data = typeof value === "string" ? value : JSON.stringify(value);
    const encrypted = encryptedAES(data);
    const encoded = encodeToBase64(encrypted);
    return denormalize(encoded);
}

export const decodeSecFromBase64 = (denormalized: string) => {
    const encoded = normalize(denormalized);
    const encrypted = decodeFromBase64(encoded);
    const data = descryptedAES(encrypted);
    return data;
}