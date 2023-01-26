/**
 * 加密数据
 * @param data - 数据
 */
declare function encrypto(data: any, SecretKey: string): string;
/**
 * 解密数据
 * @param cipherText - 密文
 */
declare function decrypto(cipherText: string, SecretKey: string): any;
/**
     * 检测密码是否一致
     * @param password0 加密前密码
     * @param password1 加密后密码
     * @param SecretKey key
     */
declare function compare(password0: string, password1: string, SecretKey: string): boolean;

export { compare, decrypto, encrypto };
