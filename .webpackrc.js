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
		components: path.resolve(__dirname, 'src/components/'),
		containers: path.resolve(__dirname, 'src/containers/'),
		layouts: path.resolve(__dirname, 'src/layouts/'),
		services: path.resolve(__dirname, 'src/services/'),
		common: path.resolve(__dirname, 'src/common/'),
		models: path.resolve(__dirname, 'src/models/'),
		utils: path.resolve(__dirname, 'src/utils/'),
		styles: path.resolve(__dirname, 'src/styles/'),
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
