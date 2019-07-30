/*
 * @Author: Carrey Wang
 * @Date:   2019-07-26 19:58:50
 * @Last Modified by:   Carrey Wang
 * @Last Modified time: 2019-07-29 20:28:19
 */

'use strict';
const webpack = require('webpack');
const path = require('path');
const DevServerConfig = require('./webpack.devServerConfig');

module.exports = {
    mode: 'development',
    /*入口文件的配置项*/
    entry: {
        app: './app',
        turntable: './src/turntable/turntable.ts',
        textslide: './src/textslide/textslide.ts',
        flowborder: './src/flowborder/flowborder.ts',
        glossybutton: './src/glossybutton/glossybutton.ts',
        textflow3d: './src/textflow3d/textflow3d.ts',
        batteryloading: './src/batteryloading/batteryloading.ts',
    },
    /*出口文件的配置项*/
    output: {
        /*打包的路径*/
        path: path.resolve(__dirname, '../public'),
        /*打包的文件名*/
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.less/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'less-loader'
            }],
            exclude: '/node_modules/'
        }, {
            test: /\.ts/,
            use: {
                loader: 'ts-loader'
            }
        }]
    },
    /*配置webpack服务器*/
    devServer: DevServerConfig
}