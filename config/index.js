'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
    // const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target: 'http://192.168.16.90:8001',
                changeOrigin: true,
                // secure: false,  // 如果是https接口，需要配置这个参数
            },
            '/RemoteFunctionHub': {
                target: 'ws://192.168.16.90:8001',
                changeOrigin: true,
                ws: true,
                secure: false, // 如果是https接口，需要配置这个参数
            },
            '/token': {
                target: "https://wsliveroom-demo.zego.im:8282",
                changeOrigin: true
            }
        },

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: true,
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
    },
    // module: {
    //     rules: [{
    //             test: /\.vue$/,
    //             loader: 'vue-loader'
    //         },
    //         // 它会应用到普通的 `.js` 文件
    //         // 以及 `.vue` 文件中的 `<script>` 块
    //         {
    //             test: /\.js$/,
    //             loader: 'babel-loader'
    //         },
    //         // 它会应用到普通的 `.css` 文件
    //         // 以及 `.vue` 文件中的 `<style>` 块
    //         {
    //             test: /\.css$/,
    //             use: [
    //                 'vue-style-loader',
    //                 'css-loader'
    //             ]
    //         }
    //     ]
    // },
    // plugins: [
    //     // 请确保引入这个插件来施展魔法
    //     new VueLoaderPlugin()
    // ]
}