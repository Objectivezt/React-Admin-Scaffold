const path = require('path');
const proxyObj = {
	proxyName: {
		target: 'http://objectivezt',
		changeOrigin: true,
		pathRewrite: {
			'^/': ''
		}
	}
};

const proxyUrl = proxyObj.proxyName;

const config = {
	alias: {
		mock: path.resolve(__dirname, 'mock/'),
		globalUI: path.resolve(__dirname, 'src/common/globalUI/'),
		'@': path.resolve(__dirname, 'src/'),
		'@assets': path.resolve(__dirname, 'src/assets/'),
		'@common': path.resolve(__dirname, 'src/common/'),
		'@components': path.resolve(__dirname, 'src/components/'),
		'@containers': path.resolve(__dirname, 'src/containers/'),
		'@layouts': path.resolve(__dirname, 'src/layouts/'),
		'@models': path.resolve(__dirname, 'src/models/'),
		'@services': path.resolve(__dirname, 'src/services/'),
		'@styles': path.resolve(__dirname, 'src/styles/'),
		'@utils': path.resolve(__dirname, 'src/utils/')
	},
	// copy: [{
	// 	from: __dirname + 'src/assets/favicon.ico',
	// 	to: './',
	// }],
	disableDynamicImport: false,
	entry: 'src/index.js',
	extraBabelPlugins: [
		[
			'import',
			{
				libraryName: 'antd',
				libraryDirectory: 'es',
				style: true
			}
		]
	],
	env: {
		development: {
			extraBabelPlugins: ['dva-hmr']
		}
	},
	hash: true,
	html: {
		template: './src/index.ejs'
	},
	ignoreMomentLocale: true,
	outputPath: './dist',
	publicPath: '/',
	theme: './src/common/theme.js',
	proxy: {
		'/usrApi': proxyUrl
	}
};

export default config;
