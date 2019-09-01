import defaultWebpackConfig from 'scaffold-core/dist/webpackConfig';

const path = require('path');
const ENV_PATH =
	process.env.NODE_ENV === 'production' && process.env.ENV_PUBLIC_PATH
		? process.env.ENV_PUBLIC_PATH
		: '';
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
		...createAlias(__dirname)
	},
	...custom,
	// copy: [{
	// 	from: __dirname + 'src/assets/favicon.ico',
	// 	to: './',
	// }],
	entry: 'src/index.js',
	// extraBabelPresets: ['@babel/typescript'],
	extraBabelPlugins: [
		[
			'import',
			{
				libraryName: 'antd',
				libraryDirectory: 'es',
				style: true
			}
		],
		'@babel/plugin-transform-typescript'
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
	publicPath: '/' + ENV_PATH,
	theme: './src/common/theme.js',
	proxy: {
		'/usrApi': proxyUrl
	}
};

export default config;
