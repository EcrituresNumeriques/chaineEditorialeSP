var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var extractPlugin = new ExtractTextPlugin({
   filename: 'css/main.css'
});

var isProd = (process.env.NODE_ENV === 'production');
var plugins = [        extractPlugin,
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })];
if(isProd){
  plugins.push(new BundleAnalyzerPlugin());
  plugins.push(new CleanWebpackPlugin(['dist']));
}

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
                            plugins: ['lodash'],
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
                            name: 'img/[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.(json)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'json/[name].[ext]',
                            outputPath: 'json/',
                            publicPath: 'json/'
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
    plugins: plugins
};
