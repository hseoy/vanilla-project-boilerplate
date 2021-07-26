const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './frontend/src/index.ts',
  resolve: {
    extensions: ['.ts', '.js', '.json', '.scss'],
    alias: {
      '@': path.resolve(__dirname, 'frontend/'),
    },
  },
  output: {
    path: path.resolve('./backend/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[contenthash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.API_URI': JSON.stringify(process.env.API_URI),
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {},
};
