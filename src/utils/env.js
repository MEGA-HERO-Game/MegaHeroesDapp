let baseUrl;

if(process.env.NODE_ENV === "development") { // 开发环境
  baseUrl = "/api";
}else if(process.env.NODE_ENV === 'production') { // 线上环境
  // baseUrl = "http://mhweb.test.xworld.pro:28081";
  // baseUrl = "https://megahero.games";
  baseUrl = "";
}

export {
  baseUrl
}
