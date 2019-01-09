const path = require('path');
const proxyObj = {
	proxyName: {
		target: 'http://aaaaaa',
		changeOrigin: true,
		pathRewrite: {
			'^/': ''
		},
	}
}

const proxyUrl = proxyObj.proxyName;

const config = {
	alias: {
		common: path.resolve(__dirname, 'src/common/'),
		components: path.resolve(__dirname, 'src/components/'),
		containers: path.resolve(__dirname, 'src/containers/'),
		layouts: path.resolve(__dirname, 'src/layouts/'),
		mock: path.resolve(__dirname, 'mock/'),
		models: path.resolve(__dirname, 'src/models/'),
		services: path.resolve(__dirname, 'src/services/'),
		styles: path.resolve(__dirname, 'src/styles/'),
		utils: path.resolve(__dirname, 'src/utils/'),
	},
	// copy: [{
	// 	from: __dirname + 'src/assets/favicon.ico',
	// 	to: './',
	// }],
	devtool: 'true',
	disableDynamicImport: false,
	entry: 'src/index.js',
	extraBabelPlugins: [
		'transform-decorators-legacy',
		[
			'import',
			{
				libraryName: 'antd',
				libraryDirectory: 'es',
				style: true
			},
		],
	],
	env: {
		development: {
			extraBabelPlugins: ['dva-hmr'],
		},
	},
	hash: true,
	html: {
		template: './src/index.ejs',
	},
	ignoreMomentLocale: true,
	outputPath: './dist',
	publicPath: '/',
	theme: './src/common/theme.js',
	proxy: {
		'/usrApi': proxyUrl,
	},
};

export default config;
