const path = require('path');

module.exports = {
  context: __dirname + "/src",

  entry: {
    javascript: "./app.js",
    html: "./index.html",
  },

  output: {
    filename: "./js/bundle.js",
    path: __dirname + "/dist/js",
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: path.resolve(__dirname, './app/js'),
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
    ],
  },
}
