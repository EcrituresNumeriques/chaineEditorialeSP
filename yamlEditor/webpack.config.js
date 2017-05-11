var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
   filename: 'css/main.css'
});

module.exports = {
    entry: './src/js/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        // publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015','react']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: extractPlugin.extract({
                    use: ['css-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            },
            {
              test : /\.(woff2?|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
              use: [
                  {
                      loader: 'file-loader',
                      options: {
                          name: 'fonts/[name].[ext]',
                          outputPath: './fonts/',
                          //publicPath: './fonts/'
                      }
                  }
                ]
            }
        ]
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        //new CleanWebpackPlugin(['dist'])
    ]
};
