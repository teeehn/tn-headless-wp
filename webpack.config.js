const webpack = require('webpack');
const path = require('path');

const config = {
    context: path.resolve(__dirname, 'src'),
    devtool: 'cheap-module-eval-source-map',
    entry: './app.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(png|jpg)$/,
            use: [{
                loader: 'url-loader',
                options: { limit: 10000 }
            }]
        },{
            test: /\.scss$/,
            include: path.resolve(__dirname, 'src/scss'),
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },{
            test: /\.(js|jsx)$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'react'] }
            }]
        }
    ]}
}

module.exports = config;
