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
  config: () => config,
  filePath: () => filePath
});
module.exports = __toCommonJS(src_exports);

// src/env.ts
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var dotenv = require("dotenv");
var isProd = process.env.NODE_ENV === "production";
function parseEnv() {
  const localEnv = path.resolve("../../.env");
  const prodEnv = path.resolve("../../.env.prod");
  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv))
    throw new Error("\u7F3A\u5C11\u73AF\u5883\u914D\u7F6E\u6587\u4EF6");
  const filePath2 = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;
  const config2 = dotenv.parse(fs.readFileSync(filePath2));
  return { filePath: filePath2, config: config2 };
}
var { filePath, config } = parseEnv();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  filePath
});
