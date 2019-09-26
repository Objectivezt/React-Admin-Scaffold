import defaultWebpackConfig from 'scaffold-core/dist/webpackConfig';

const path = require('path');
const ENV_PATH = process.env.ENV_PUBLIC_PATH;
const proxyObj = {
  proxyName: {
    target: 'http://objectivezt',
    changeOrigin: true,
    pathRewrite: {
      '^/': ''
    }
  }
};

const { custom, createAlias } = defaultWebpackConfig;
const proxyUrl = proxyObj.proxyName;

const config = {
  alias: {
    mock: path.resolve(__dirname, 'mock/'),
    globalUI: path.resolve(__dirname, 'src/common/globalUI/'),
    ...createAlias(__dirname),
    '@setting': path.resolve(__dirname, 'src/setting/')
  },
  ...custom,
  copy: [
    {
      from: path.resolve(__dirname, 'src/containers/UI/d3root/'),
      to: 'iframe/'
    }
  ],
  entry: 'src/index.js',
  // extraBabelPresets: [['@babel/preset-typescript']],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ],
    '@babel/plugin-transform-typescript',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread'
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr']
    }
  },
  define: {
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.ENV_API_CONTEXT': process.env.ENV_API_CONTEXT,
    'process.env.ENV_PUBLIC_PATH': process.env.ENV_PUBLIC_PATH
  },
  html: {
    template: './src/index.ejs'
  },
  outputPath: './dist',
  publicPath: ENV_PATH,
  theme: './src/common/theme.js',
  proxy: {
    '/test': proxyUrl
  }
};

export default config;
