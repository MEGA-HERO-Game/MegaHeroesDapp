const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|svg)(\?.*)?$/i;
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // 把px单位换算成rem单位
          require("postcss-pxtorem")({
            rootValue: 75, // 换算的基数(设计图750的根字体为32)
            selectorBlackList: [".van"], // 要忽略的选择器并保留为px。
            propList: ["*"], //可以从px更改为rem的属性。
            minPixelValue: 2 // 设置要替换的最小像素值。
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://test.asset.gfanx.pro',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        }
      },
      '/baseapi': {
        target: 'http://web.test.xworld.pro:28080',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/baseapi": "",
        }
      },
    }
  },

  lintOnSave: false,
  chainWebpack(config) {
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('compressionPlugin')
            .use(new CompressionPlugin({
              filename: '[path].gz[query]',
              algorithm: 'gzip',
              test: productionGzipExtensions,
              threshold: 10240,
              minRatio: 0.8,
              deleteOriginalAssets: false
            }))
        }
      )
  }
};
