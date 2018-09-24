const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        TrelloConnect: './index.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Trello Connect',
            filename: 'index.html',
            template: 'html/index.html',
            inject: 'head'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ], module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    }
};
