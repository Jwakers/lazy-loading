const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        library: 'Lazyload',
        libraryTarget: 'var',
        libraryExport: 'default',
        path: __dirname + '/docs',
        filename: "[name].js?[hash]"
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: true,
                    keep_classnames: true,
                    keep_fnames: false,
                    mangle: false
                }
            })

        ]
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: ['html-loader']
        }, {
            test: /\.(scss|css)$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: process.env.NODE_ENV === 'development',
                },
              }, 'css-loader', 'sass-loader']
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.(jp(e*)g|png|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8000,
                    name: './assets/[name].[ext]?[hash]'
                }
            }]
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        })]
}