const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    app: './src/js/app'
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:3].js',
    path: path.resolve('app/assets')
  },
  bail: true,
  stats: {
    assetsSort: '!size',
    builtAt: false,
    children: false,
    modules: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader']
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({ parallel: true, cache: true, extractComments: false })]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  mode: prod ? 'production' : 'development'
};

module.exports = config;
