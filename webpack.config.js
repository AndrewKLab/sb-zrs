var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.js?$/],
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                  ]
            },
        ],

    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                secure: false,
                changeOrigin: true,
                autoRewrite: true,
                headers: {
                    'X-ProxiedBy-Webpack': true,
                },
                target: 'http://lifestudio-test.ru'
            }
        },
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://lifestudio-test.ru'
        })
    }
}