let baseUrl;
let imgBaseUrl;

if (process.env.NODE_ENV === "development") { // 开发环境
  baseUrl = "/api";
  imgBaseUrl = "http://mhweb.test.xworld.pro:28080";
} else if (process.env.NODE_ENV === 'production') { // 线上环境
  // baseUrl = "http://mhweb.test.xworld.pro:28081";
  // baseUrl = "https://megahero.games";
  baseUrl = "http://mhweb.test.xworld.pro:28080";
  imgBaseUrl = baseUrl;
}

export {
  baseUrl,
  imgBaseUrl
}
