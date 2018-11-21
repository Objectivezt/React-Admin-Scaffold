const path = require('path');
const proxyUrl = {
	target: 'http://aaaaaa',
	changeOrigin: true,
	pathRewrite: {
		'^/': ''
	},
}
const config = {
	entry: 'src/index.js',
	extraBabelPlugins: [
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
	alias: {},
	ignoreMomentLocale: true,
	//   theme: './src/common/theme.js',
	html: {
		template: './src/index.ejs',
	},
	// copy:[{
	//   from:'./favicon.ico',
	//   to:'./',
	// }],
	//extraResolveExtensions:['', '.ts', '.tsx', '.js'],
	devtool: 'false',
	disableDynamicImport: false,
	publicPath: '/',
	outputPath: './dist',
	hash: true,
	proxy: {
		'/usrApi': proxyUrl,
	}
};

export default config;