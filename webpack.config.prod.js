import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  // devtool: 'inline-source-map', // for dev env
  devtool: 'source-map', // for production
  noInfo: false,

  //applications entry point
  entry: {
    main: path.resolve(__dirname, 'src/index'),
    vendor: path.resolve(__dirname, 'src/vendor')
  },

  target: 'web',

  //defines where webpack should create the dev bundle
  //there will not be a physical file, webpack just creates in and serves the bundles from memory
  output: {
    // path: path.resolve(__dirname, 'src'), // development
    path: path.resolve(__dirname, 'dist'), // production
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  // commented out for this config to be integrated express srcServer.js
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'src'),
  // },
  plugins: [
    //generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    //hash the files using md5 so that their names change when the content changes
    new WebpackMd5Hash(),

    // use CommonsChunkPlugin to create a separate bundle of
    // vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    //Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      trackJSToken: "a75db89e01554c94ba595271b0474751"
    }),

    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    //minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],

  //tells webpack the file types(loaders) that we want it to handle
  //webpack can handle many more types of loaders than this
  module: {
    loaders:[
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      // {test: /\.css$/, loaders: ['style', 'css']}
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
