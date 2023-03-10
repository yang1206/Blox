/**
 * 常用正则表达式
 */

// 非 0 正整数
export const regPositive = /^[1-9]\d*$/

// 非 0 正整数 或 空
export const regPositiveOrEmpty = /\s*|^[1-9]\d*$/

// 中国 11 位手机号格式
export const regMobileCN = /^1\d{10}$/g
