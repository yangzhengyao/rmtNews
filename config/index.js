'use strict'
// Template version: 1.2.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/sellnew': {
      //  target: 'http://124.204.66.253:9080',
      //  target: 'http://192.168.4.252:9001',
      //  target: 'http://192.168.16.113:9001',
       //  target: 'http://123.139.57.171:9003',
       //target: 'http://192.168.16.16:9001', //测试环境
        target: 'http://192.168.16.16:9001',
        changeOrigin: true,
        pathRewrite: {
          "^/sellnew": "http://192.168.16.16:9001"
        }
      },
      '/sell': {
        // target: 'http://124.204.66.253:9080',
        target: 'http://qtx.wengetech.com:9080',
        changeOrigin: true,
        pathRewrite: {
          "^/sell": ""
        }
      },
      '/xhs': {
        // target: 'http://leshan.wengetech.com:9001', //社区
        target: 'http://leshan.wengetech.com:28086',
        // target: 'http://124.204.66.253:9080',
        target: 'http://haicang.wengetech.com:28086',
        changeOrigin: true,
        pathRewrite: {
          "^/xhs": ""
        }
      },
      '/wenhai': {
        target: 'http://wxservice.wengetech.com',
        changeOrigin: true,
        pathRewrite: {
          "^/wenhai": ""
        }
      },
      '/ft': {
        target: 'http://hongqi.wengetech.com:9001',
        changeOrigin: true,
        pathRewrite: {
          "^/ft": ""
        }
      },
      '/newip': {
        target: 'http://192.168.16.16:9001',
        changeOrigin: true,
        pathRewrite: {
          "^/newip": ""
        }
      },
      '/api': { //使用"/api"来代替"http://f.apiplus.c"
        //172.168.0.249:8088  本地
        //192.168.10.176:28086  线上
        //124.204.66.253:28080  线上
        target: 'http://192.168.7.2:9001', //源地址
        changeOrigin: true, //改变源
        pathRewrite: {
          '^/api': 'http://192.168.4.252:9001' //路径重写
        }
      }
    },
    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8084, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static', // 这里取消了static目录，是因为cordova打包必须是css，js文件夹的格式，防止资源引用路径出错
    assetsPublicPath: './', // cordova打包用'./'，原因是引用资源的问题。部署服务器请使用 '/'
    proxyTable: {
      '/sell': {
        target: 'http://124.204.66.253:9080',
        changeOrigin: true,
        pathRewrite: {
          "^/sell": ""
        }
      }
    },
    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
