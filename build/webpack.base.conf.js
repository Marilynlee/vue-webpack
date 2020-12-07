'use strict'
const path = require('path')
const fs = require('fs')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const htmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

/**
* pages目录下，直接存在main.js则为单入口
* pages目录下，全为文件夹且每个文件夹下配置main.js文件、index.html模板，则为多入口
*/
const srcRoot = path.resolve(__dirname, '../src');
const pageDir = path.resolve(srcRoot, 'pages');
function getEntry() {
  let entryMap = {};
  let isMulti = true
  // 遍历page文件夹下的目录是不是全是文件夹，全是文件夹就是多入口,存在main.js就是单入口
  fs.readdirSync(pageDir).forEach((pathname) => {
    // 获取page下文件夹的绝对路径
    let fullPathName = path.resolve(pageDir, pathname);
    // 同步读取文件信息
    let stat = fs.statSync(fullPathName);
    // 获取文件夹下的main.js文件路径
    let fileName = path.resolve(fullPathName, 'main.js');

    if (!stat.isDirectory() && pathname === 'main.js') {
      isMulti = false
    }
    // 判断是不是文件夹，且存在main.js文件
    if (stat.isDirectory() && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName;
    }
  });
  console.log(`*****************webpack entry result: isMulti ${isMulti}, entryMap:`)
  console.log(entryMap)
  return isMulti ? entryMap : './src/pages/main.js';
}

/**
* 获取index.html模板
*/
function getHtmlArr(entry) {
  let htmlArr = [];
  if (typeof entry === 'string') {
    htmlArr.push(new htmlWebpackPlugin({
      template: './src/pages/index.html',
      filename: 'index.html',
      title: 'home',
      inject: true,
      hash: true, //开启hash  ?[hash]
      chunks: ['vendor', 'manifest', 'main'],//页面要引入的包
      minify: process.env.NODE_ENV === "development" ? false : {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true, //折叠空白区域 也就是压缩代码
        removeAttributeQuotes: true, //去除属性引用
      }
    }))
  }

  if (typeof entry === 'object') {
    Object.keys(entry).forEach((key) => {
      let fullPathName = path.resolve(pageDir, key);
      let filename = path.resolve(fullPathName, 'index.html');
      if (fs.existsSync(filename)) {
        htmlArr.push(new htmlWebpackPlugin({
          template: filename,
          filename: key + '.html',
          title: key,
          inject: true,
          hash: true, //开启hash  ?[hash]
          chunks: ['vendor', 'manifest', key],//页面要引入的包
          minify: process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性引用
          },
        }));
      }
    });
  }
  console.log(htmlArr)
  return htmlArr;
}
const entry = getEntry();
const htmlArr = getHtmlArr(entry);

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.css$/,
        // use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: htmlArr
}
