/*
 * @Author: Carrey Wang
 * @Date:   2019-07-26 19:58:50
 * @Last Modified by:   Carrey Wang
 * @Last Modified time: 2019-07-27 20:37:59
 */

'use strict';
const path = require('path');

module.exports = {
    /*设置基本目录*/
    contentBase: path.resolve(__dirname, '../public'),
    /*压缩是否开启*/
    compress: true,
    /*是否开启热更新*/
    hot: true
}