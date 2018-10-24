const webpack = require('webpack');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = options => {
    return webpackMerge(commonConfig({ env: ENV, useAOT: true }), {
        entry: { 'app': './src/main-aot' },
        devtool: false,
        output: {
            path: helpers.root('dist-aot'),
            publicPath: '/',
            filename: '[name].[hash].js',
            chunkFilename: '[id].[hash].chunk.js',
        },
        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }),
            new ExtractTextPlugin('[name].[hash].css'),
            new webpack.DefinePlugin({
                'process.env': {
                    'ENV': JSON.stringify(ENV)
                }
            }),
            new CopyWebpackPlugin([{
                from: 'favicon.ico',
                to: 'favicon.ico'
            }])
        ],
        node: {
            __filename: true
        }
    });
}



