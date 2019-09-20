var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + '/docs',
        filename: "[name].js?[hash]"
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
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env']
                    ]
                }
            }
        }, {
            test: /\.(jp(e*)g|png|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8000
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