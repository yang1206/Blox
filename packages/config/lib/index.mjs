var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// src/env.ts
import * as fs from "fs";
import * as path from "path";
var dotenv = __require("dotenv");
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
export {
  config,
  filePath
};
