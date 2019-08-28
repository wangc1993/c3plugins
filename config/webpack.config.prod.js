/*
 * @Author: Carrey Wang
 * @Date:   2019-07-26 19:58:50
 * @Last Modified by:   Carrey Wang
 * @Last Modified time: 2019-08-28 21:39:59
 */

'use strict';
const {config, otherConfig } =  require('./webpack.config.common.js');

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
            test: /\.(ts|tsx|js)$/,
            use: [{
                loader: 'ts-loader'
            }]
        }]
    }
}