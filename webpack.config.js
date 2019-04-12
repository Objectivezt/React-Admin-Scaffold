const isUglifyJsPlugin = process.env.NODE_ENV === 'production';
module.exports = webpackConfig => {
	if (isUglifyJsPlugin) {
		webpackConfig.plugins.splice(3, 1); // 删除 UglifyJsPlugin
	}
	return webpackConfig;
};
