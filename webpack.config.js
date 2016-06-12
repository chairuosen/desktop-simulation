var webpack = require('webpack');
var path = require('path');

module.exports = {
    resolve:{
        root:[path.join(__dirname,"src")]
    },
    entry:{
        'main':['./src/main.js']
    },
    output:{
        path:'./dist',
        publicPath:'/',
        filename:'[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    },
    plugins:[]
}