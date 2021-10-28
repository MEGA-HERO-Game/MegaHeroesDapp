import CryptoJS from 'crypto-js'
const md5 = require("md5");

export default {//加密
  encrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'g2weow$Hk)kw;egp';
    return CryptoJS.AES.encrypt(word, CryptoJS.enc.Utf8.parse(keyStr), {mode: CryptoJS.mode.ECB}).toString();
  },
  //解密
  decrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'g2weow$Hk)kw;egp';
    return CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse(keyStr), {mode: CryptoJS.mode.ECB}).toString(CryptoJS.enc.Utf8);
  },
  // 签名
  signSecret(data) {
    let appSecret = ''; //4d18db80e353e526ad6d42a62aaa29be
    let sign = '';
    //字符串拼接
    let dataStrSort = (dataStr) => {
      //未签名原串
      let urlStr = dataStr.split('&').sort().join('&');
      urlStr = `${urlStr}&${appSecret}`;
      console.log('urlStr', urlStr)
      sign = md5(urlStr);
    }

    //判断参数类型
    if (data instanceof Object) {
      //对象处理成字符串
      let arr = [];
      for (let key in data) {
        //如果data[key]为数组，无法自动转换成"['7','6']",需另做处理
        if (data[key] instanceof Array) {
          let newstr = data[key];
          newstr = JSON.stringify(newstr);
          data[key] = newstr;
          arr.push(`${key}`);
        } else {
          arr.push(`${key}`);
        }
      }
      arr = arr.sort();
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str += data[arr[i]];
      }
      str = `${str}${appSecret}`;
      console.log('str', str)
      sign = md5(str);
    } else if (data instanceof String) {
      dataStrSort(data)
    } else {
      sign = md5(appSecret);
    }
    return sign
  },
}