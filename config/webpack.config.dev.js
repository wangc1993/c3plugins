/*
 * @Author: Carrey Wang
 * @Date:   2019-07-26 19:58:50
 * @Last Modified by:   Carrey Wang
 * @Last Modified time: 2019-08-28 21:37:06
 */

'use strict';
const {config, otherConfig } =  require('./webpack.config.common.js');
const DevServerConfig = require('./webpack.devServerConfig');

module.exports = {
    ...config,
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'less-loader'
            }],
            exclude: '/node_modules/'
        }, {
            test: /\.ts$/,
            use: [{
                loader: 'ts-loader'
            }]
        }]
    },
    /*配置webpack服务器*/
    devServer: DevServerConfig
}