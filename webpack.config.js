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
	return webpackConfig;
};
