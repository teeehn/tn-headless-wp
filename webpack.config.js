const webpack = require('webpack');
const path = require('path');

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: './app.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            include: path.resolve(__dirname, 'src/scss'),
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', { modules: false }]
                    ]
                }
            }]
        }]
    }
}

module.exports = config;
