import CryptoJS from 'crypto-js'

export default {//加密
  encrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : '023hig2weow$Hk)kw;egp';
    return CryptoJS.AES.encrypt(word, keyStr)
  },
  //解密
  decrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : '023hig2weow$Hk)kw;egp';
    return CryptoJS.AES.decrypt(word, keyStr).toString(CryptoJS.enc.Utf8);
  }
}