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
        use: 'ts-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs: 3,
                  targets: '> 1%',
                  useBuiltIns: 'usage',
                },
              ],
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
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
