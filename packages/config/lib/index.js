var a=Object.create;var n=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var l=Object.getPrototypeOf,E=Object.prototype.hasOwnProperty;var m=(o,s)=>{for(var t in s)n(o,t,{get:s[t],enumerable:!0})},f=(o,s,t,p)=>{if(s&&typeof s=="object"||typeof s=="function")for(let r of h(s))!E.call(o,r)&&r!==t&&n(o,r,{get:()=>s[r],enumerable:!(p=v(s,r))||p.enumerable});return o};var i=(o,s,t)=>(t=o!=null?a(l(o)):{},f(s||!o||!o.__esModule?n(t,"default",{value:o,enumerable:!0}):t,o)),x=o=>f(n({},"__esModule",{value:!0}),o);var P={};m(P,{config:()=>y});module.exports=x(P);var e=i(require("fs")),c=i(require("path")),d=process.env.NODE_ENV==="production";function u(){let o=c.resolve(".env"),s=c.resolve(".env.prod");if(!e.existsSync(o)&&!e.existsSync(s))throw new Error("\u7F3A\u5C11\u73AF\u5883\u914D\u7F6E\u6587\u4EF6");return{path:d&&e.existsSync(s)?s:o}}var y=u();0&&(module.exports={config});