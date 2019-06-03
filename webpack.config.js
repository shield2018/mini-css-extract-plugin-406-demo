const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const pagesSrc = './src/pages';
const plugins = [];


plugins.push(
    new HtmlWebpackPlugin({
        template: path.join('./src/pages/index','index.pug'),
        filename: 'index.html',
        chunks: ['index']
    }),
    new MiniCssExtractPlugin({
        filename:'[name].[contenthash].css',
        chunkFilename: '[id].css'
    })
);



module.exports = {
    entry: {
        index:[path.resolve(__dirname,'src/pages/index','index.js')]
    },
    optimization: {
        minimize:false
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        publicPath:'/'
    },
    devServer: {
        hot:false,
        inline: false
    },
    module: {
        rules:[
            {
                test:/\.pug$/,
                use: {
                    loader: 'pug-loader',
                    options: {
                        self: true, // 這個要加
                        pretty: true,
                    },
                },
            },
            {
                test:/\.js$/,
                use: ['es3ify-loader', {
                    loader: 'babel-loader'
                }]
            },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader,'css-loader'] },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['ie >= 8','last 4 versions','> 1%']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/,/\.mp4$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: '[name].[hash:8].[ext]',
                },
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['url-loader?limit=10000&mimetype=application/font-woff'] },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['file-loader'] },
            { test: /\.ico$/, use: ['file-loader'] }
        ]
    },
    plugins:plugins
};
