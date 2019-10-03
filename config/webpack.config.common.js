/*
* @Author: Carrey Wang
* @Date:   2019-08-27 22:45:42
* @Last Modified by:   Carrey Wang
* @Last Modified time: 2019-10-03 17:12:22
*/

'use strict';
const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
/* 配置HTML参数 */
const getHtmlConfig = (title, name, chunks) => {
    return {
        template: path.resolve(__dirname, `../public/${name}.html`),
        filename: `${name}.html`,
        favicon: path.resolve(__dirname, '../public/logo.ico'),
        inject: true,//script标签的位置
        title,
        chunks: chunks,//页面要引入的包
        /* 压缩 */
        minify: NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性引用
        },
    };
};
/* 配置多页面 */
const pageArr = [{
    _html: 'index',
    title: '插件导航页',
    /* 页面用到的chunk模块 */
    chunks: ['index']
},
{
    _html: 'turntable',
    title: '转盘',
    chunks: ['turntable']
},
{
    _html: 'textslide',
    title: '文本切换',
    chunks: ['textslide']
},
{
    _html: 'flowborder',
    title: '流动的边框',
    chunks: ['flowborder']
},
{
    _html: 'glossybutton',
    title: '金属光泽的按钮',
    chunks: ['glossybutton']
},
{
    _html: 'textflow3d',
    title: '3d的文字跑马灯',
    chunks: ['textflow3d']
},
{
    _html: 'batteryloading',
    title: '电池loading',
    chunks: ['batteryloading']
},
{
    _html: 'textAssertion',
    title: '文字断言特效',
    chunks: ['textAssertion']
},
{
    _html: 'hotcoffee',
    title: '热咖啡',
    chunks: ['hotcoffee']
},
{
    _html: 'concentricMatrix',
    title: '旋转同心矩阵',
    chunks: ['concentricMatrix']
},
{
    _html: 'example',
    title: '测试',
    chunks: ['example'],
    /* 后缀名，默认ts */
    suffix: 'js'
},
{
    _html: 'textslide2',
    title: '文本切换2',
    chunks: ['textslide2']
},
{
    _html: 'inverseFilling',
    title: '反色填充',
    chunks: ['inverseFilling']
},
{
    _html: 'signboard',
    title: '晃动的广告牌',
    chunks: ['signboard']
}
,
{
    _html: 'strokeButton',
    title: '描边按钮',
    chunks: ['strokeButton']
}
];

module.exports.config = {
    mode: NODE_ENV,
    /*入口文件的配置项*/
    entry: {},
    /*出口文件的配置项*/
    output: {
        /*打包的路径*/
        path: path.resolve(__dirname, '../dist'),
        /*打包的文件名*/
        filename: '[name].[hash:8].bundle.js',
    },
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
    },
    resolve: {
        /* 按顺序自动补全后缀名（如果出现同名的文件名，会匹配同一个文件） */
        extensions: ['.ts', '.js', '.less']
    },
    plugins: [],
}
/* 自动生成entry和html模板 */
pageArr.forEach((page) => {
    module.exports.config.entry[page._html] = page._html === 'index' ? `./${page._html}.ts` : `./src/${page._html}/${page._html}.${page.hasOwnProperty('suffix') ? page.suffix : 'ts'}`;
    module.exports.config.plugins.push(new htmlWebpackPlugin(getHtmlConfig(page.title, page._html, page.chunks)));
})
module.exports.otherConfig = {
    webpack,
    path,
    htmlWebpackPlugin,
    NODE_ENV
}
