import webpack from 'webpack';
import fs from 'fs';
const path = require('path');
const isNotPrd = process.env.NODE_ENV !== 'production';
const packageName = 'pure';
module.exports = webpackConfig => {
  console.log('资源目录上下文:', process.env.ENV_PUBLIC_PATH);
  console.log('API请求目录上下文:', process.env.ENV_API_CONTEXT);
  console.log('环境信息:', process.env.NODE_ENV);

  webpackConfig.output = {
    filename: '[name].[hash:12].js',
    path: path.resolve(__dirname, './dist'), // 打包到dist目录下
    publicPath: '/',
    library: `${packageName}-[name]`,
    libraryTarget: 'umd'
    // jsonpFunction: `webpackJsonp_${packageName}`
  };

  if (isNotPrd) {
    webpackConfig.plugins.splice(3, 1); // 删除 UglifyJsPlugin
    fs.writeFile('./build/scaffold.dev.config.json', JSON.stringify(webpackConfig));
  } else {
    webpackConfig.plugins[3].options.compress.drop_console = true;
    fs.writeFile('./build/scaffold.prd.config.json', JSON.stringify(webpackConfig));
  }

  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.ENV_API_CONTEXT': JSON.stringify(process.env.ENV_API_CONTEXT),
      'process.env.ENV_PUBLIC_PATH': JSON.stringify(process.env.ENV_PUBLIC_PATH)
    })
  );

  return webpackConfig;
};
