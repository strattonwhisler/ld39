var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        game: './src/main.ts'
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            use: ['ts-loader'],
            exclude: /node_modules/,
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }, {
            test: /\.json$/,
            use: ['json-loader']
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
