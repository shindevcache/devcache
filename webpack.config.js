const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve('./client', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader'}
        ]
      }
    ]
  },
  devServer: {
    publicPath: '/build',
    contentBase: './client',
    proxy: [{
      context: ['/api', '/signup', '/login'],
      target: 'http://localhost:3000',
    }]
  },
};