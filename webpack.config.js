import webpack from 'webpack';
const isNotPrd = process.env.ENV_PUBLIC_PATH !== 'production';
module.exports = webpackConfig => {
	console.log('资源目录上下文:', process.env.ENV_PUBLIC_PATH);
	console.log('API请求目录上下文:', process.env.ENV_API_CONTEXT);
	console.log('环境信息:', process.env.NODE_ENV);
	if (isNotPrd) {
		webpackConfig.plugins.splice(3, 1); // 删除 UglifyJsPlugin
	} else {
		webpackConfig.plugins[3].options.compress.drop_console = true;
	}
	webpackConfig.plugins[3].options.title = 'loading...';

	webpackConfig.plugins.push(
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.ENV_API_CONTEXT': JSON.stringify(
				process.env.ENV_API_CONTEXT
			),
			'process.env.ENV_PUBLIC_PATH': JSON.stringify(
				process.env.ENV_PUBLIC_PATH
			)
		})
	);

	return webpackConfig;
};
