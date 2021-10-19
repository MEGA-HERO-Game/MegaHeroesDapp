let baseUrl;
let imgBaseUrl;

if (process.env.NODE_ENV === "development") { // 开发环境
  baseUrl = "/api";
  imgBaseUrl = "http://web.test.xworld.pro:28080";
} else if (process.env.NODE_ENV === 'production') { // 线上环境
  // baseUrl = "http://mhweb.test.xworld.pro:28081";
  // baseUrl = "https://megahero.games";
  baseUrl = "";
  imgBaseUrl = "http://web.test.xworld.pro:28080";
}

export {
  baseUrl,
  imgBaseUrl
}
