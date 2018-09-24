const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');


module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            })
        ]
    },
    performance: {
        maxEntrypointSize: 500000,
        maxAssetSize: 500000
    },
    output: {
        filename: 'trello-connect.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'TrelloConnect',
        libraryTarget: 'umd',
        libraryExport: "default",
        publicPath: ''
    },
});
