var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  compare: () => compare,
  decrypto: () => decrypto,
  encrypto: () => encrypto
});
module.exports = __toCommonJS(src_exports);

// src/crypto.ts
var CryptoJS = __toESM(require("crypto-js"));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compare,
  decrypto,
  encrypto
});
