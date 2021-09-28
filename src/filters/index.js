/**
 * 
 * @param {String} string
 */
export function hiddenCharCenter(string) {
   if(!string){
    return "";
   }
  return string.slice(0, 5) + '....' + string.slice(-4)
}

function scientificToNumber(num) {
	var str = num.toString();
	var reg = /^(\d+)(e)([\-]?\d+)$/;
	var arr, len,
		zero = '';
	if (!reg.test(str)) {
		return num;
	} else {
		arr = reg.exec(str);
		len = Math.abs(arr[3]) - 1;
		for (var i = 0; i < len; i++) {
			zero += '0';
		}
		return '0.' + zero + arr[1];
	}
}

export function keepDecimals(m,n=4) {
  // if(typeof m != 'number'){
  //     return false;
  // };
  if(m != 0 && !m){
    return 0
  }
  if(n <= 0){//不保留小数，取整
      return m | 0;
  };
  let num = scientificToNumber(m);
  num = num.toString();
  var result = "";
  var zeroResult = function(n){
      var zero = "";
      for(var i = 0;i<n;i++){
          zero+="0";
      }
      return zero;
  }
  if(num%1 == 0){//整数
      result = num + "."+zeroResult(n);
  }else{//小数
      var num1 = num.split(".");
      if(num1[1].length<n){
        result = num1[0]+"."+num1[1]+zeroResult(n-num1[1].length)
      }else{
        result = num1[0]+"."+num1[1].substring(0,n)
      }
  }
  return result;
}