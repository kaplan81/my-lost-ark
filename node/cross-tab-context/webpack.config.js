const path = require('path');

module.exports = {
  entry: './src/cross-tab-context', 
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'cross-tab-context.js',
    library: 'CrossTabContextLibrary',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/
      },

      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: 'source-map-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  target:'web',
  // stats: 'errors-only'
}
