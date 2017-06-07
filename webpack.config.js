/**
 * Created by ZhaoBoWen on 2016/11/15.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        connect: './src/js/useConnect.js'
    },
    output: {
        path: __dirname + '/build/js',
        filename: '[name].min.js',
        library: 'connect',
        libraryTarget: 'umd'
    },
    // resolveLoader: {
    //     root: path.join(__dirname, 'node_modules')
    // }
};