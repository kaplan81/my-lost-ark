const webpack = require('webpack');
const helpers = require('./helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = options => {
    return {
        entry: {
            'polyfills': './src/polyfills',
            'vendor': './src/vendor',
        },
        resolve: {
            extensions: ['.ts', '.js', '.json', '.jpg', '.jpeg', '.gif', '.png', '.css', '.html'],
            modules: [
                helpers.root('src'),
                'node_modules'
            ]
        },
        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loaders: ['awesome-typescript', 'angular2-template', 'angular2-webpack2-lazy-children'],
                    exclude: [/node_modules/, /\.(spec|e2e)\.ts$/]
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.html$/,
                    loader: 'html'
                },
                {
                    test: /\.(png|jpe?g|gif|ico)$/,
                    loader: 'file',
                    query: {
                        name: 'public/img/[name].[ext]'
                    }
                },
                {
                    test: /\.(svg|woff|woff2|ttf|eot)$/,
                    loader: 'file',
                    query: {
                        name: 'public/fonts/[name].[ext]'
                    }
                },
                {
                    test: /\.css$/,
                    exclude: helpers.root('src', 'app'),
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: 'style',
                        loader: 'css',
                        query: {
                            css: 'sourceMap'
                        }
                    })
                },
                {
                    test: /\.css$/,
                    include: helpers.root('src', 'app'),
                    loader: 'raw'
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'vendor', 'polyfills']
                // names: ['app', 'polyfills'],
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                helpers.root('src')
            )
        ]
    }
};
