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
    alias: {
        components: path.resolve(__dirname, "./src/components"),
        containers: path.resolve(__dirname, "./src/containers"),
        layouts: path.resolve(__dirname, "./src/layouts"),
        services: path.resolve(__dirname, "./src/services"),
        common: path.resolve(__dirname, "./src/common"),
        models: path.resolve(__dirname, "./src/models"),
        utils: path.resolve(__dirname, "./src/utils"),
        styles: path.resolve(__dirname, "./src/styles"),
    },
    ignoreMomentLocale: true,
    theme: './src/common/theme.js',
    html: {
        template: './src/index.ejs',
    },
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