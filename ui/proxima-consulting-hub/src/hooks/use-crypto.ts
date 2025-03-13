import CryptoJs from 'crypto-js';

const KEY_SIGNATURE = process.env.CRYPTO_KEY || "1a5c5769bdd059933e2de9b53c121fdf";
const key = CryptoJs.enc.Utf8.parse(KEY_SIGNATURE);

export const encryptedAES = (text: string) => {

    const wordArr = CryptoJs.enc.Utf8.parse(text);
  
    const cipher = CryptoJs.AES.encrypt(wordArr, key, { mode: CryptoJs.mode.ECB, padding: CryptoJs.pad.Pkcs7 });
    const textEcrypted = cipher.ciphertext.toString(CryptoJs.enc.Hex);

    return textEcrypted;

}

export const descryptedAES = (textEcrypted: string) => {

    const wordArr = CryptoJs.enc.Hex.parse(textEcrypted);
  
    //@ts-expect-error
    const decrypt = CryptoJs.AES.decrypt({ ciphertext: wordArr }, key, { mode: CryptoJs.mode.ECB, padding: CryptoJs.pad.Pkcs7 });
    const text = decrypt.toString(CryptoJs.enc.Utf8);
  
    return text
}