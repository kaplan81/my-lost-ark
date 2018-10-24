const helpers = require('./helpers');
const metadata = require('./metadata');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const METADATA = webpackMerge(commonConfig({env: metadata.metadata.env}).metadata, metadata.metadata);

module.exports = options => {
    return webpackMerge(commonConfig({env: metadata.metadata.env, useAOT: false}), {
        entry: { 'app': './src/main' },
        devtool: 'cheap-module-eval-source-map',
        output: {
            path: helpers.root('dist'),
            publicPath: METADATA.PPATH,
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].map',
            chunkFilename: '[id].chunk.js',
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),
            new DefinePlugin({
                'ENV': JSON.stringify(METADATA.env),
                'process.env': {
                    'ENV': JSON.stringify(METADATA.env),
                    'NODE_ENV': JSON.stringify(METADATA.env)
                }
            }),
        ],
        devServer: {
            contentBase: METADATA.base,
            port: METADATA.port,
            host: METADATA.host,
            historyApiFallback: METADATA.ppath,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            outputPath: helpers.root('dist'),
            stats: 'minimal'
        }
    });
}
