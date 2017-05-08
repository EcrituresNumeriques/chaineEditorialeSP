const path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');


module.exports = {
  context: __dirname + "/src",

  entry: {
    javascript: "./js/app.jsx",
    html: "./index.html",
  },

  output: {
    filename: "./js/bundle.js",
    path: __dirname + "/dist"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', 'css'],
    root: path.resolve(__dirname, './src'),
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.css$/,
        loaders:['style-loader','css-loader']
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin({})
  ]
}
