var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


var htmlOption = {
    title:"Desktop Simulate"
}

module.exports = {
    resolve:{
        root:[path.join(__dirname,"src")]
    },
    entry:{
        'main':['./src/main.js']
    },
    output:{
        path:'./dist',
        publicPath:'./',
        filename:'[name].[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.vue$/,
                loader: "vue"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin(htmlOption)
    ]
}