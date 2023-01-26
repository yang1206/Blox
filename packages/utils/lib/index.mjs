// src/crypto.ts
import * as CryptoJS from "crypto-js";
function encrypto(data, SecretKey) {
  const newData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(newData, SecretKey).toString();
}
function decrypto(cipherText, SecretKey) {
  const bytes = CryptoJS.AES.decrypt(cipherText, SecretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  if (originalText)
    return JSON.parse(originalText);
  return null;
}
function compare(password0, password1, SecretKey) {
  const decryptoPwd = decrypto(password1, SecretKey);
  if (decryptoPwd === password0)
    return true;
  return false;
}
export {
  compare,
  decrypto,
  encrypto
};
