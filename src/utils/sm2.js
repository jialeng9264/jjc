import { privateKeySM2, privateKeySM4 } from "@/config/settings";
const sm2 = require("sm-crypto").sm2;
const sm4 = require("sm-crypto").sm4;
const cipherMode = 0;

export const $decryption = (str) => {
  // const decryptData = sm2.doDecrypt(str, privateKeySM2, cipherMode, { output: "json" });
  const decryptData4 = sm4.decrypt(str, privateKeySM4, { output: "json" });
  return decryptData4;
};
export const $decryption2 = (str) => {
  try {
    const rData = sm4.decrypt(str, privateKeySM4, { output: "json" });
    try {
      if (typeof rData === 'string') {
        const obj = JSON.parse(rData)
        if (typeof obj === 'object' && obj) {
          return obj
        } else {
          return rData;
        }
      } else {
        return rData;
      }
    } catch (e) {
      return rData;
    }
  } catch (e) {
    return str;
  }
};

