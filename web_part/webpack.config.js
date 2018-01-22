var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = require('./configs/dev');

module.exports = {
    context: path.resolve('app/'),
    entry: {
        'index': './index',
    }, // входная точка - исходный файл
    output: {
        publicPath: '/',
        filename: '[name].js',
    },
    /*resolve:{
        extensions: ["", ".js", ".jsx"]
    },*/
    devServer: {
        inline: true,
        contentBase: './app',
        port: 3000,
        historyApiFallback: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:5000',
                // changeOrigin: true,    // changes the origin of the host header to the target URL
                // secure: false,
            }
        }
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        modules: [
            path.resolve('app/'),
            path.resolve('node_modules/')
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            //'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: './index.html',
            chunks: ['index'],
            env: config.NODE_ENV
        }),
    ],
    module:{
        loaders:[   //загрузчики
            {
                test: /\.js?$/, // определяем тип файлов
                exclude: /(node_modules)/,
                loader: ["babel-loader"],
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader?sourceMap',
                    'css-loader?modules&importLoaders=1&localIdentName=[local]__[hash:base64:4]'
                ],
                exclude: path.resolve(__dirname, 'styles/')
            },
            {
                test : /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            },
        ]
    }
}