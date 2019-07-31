/*
 * @Author: Carrey Wang
 * @Date:   2019-07-26 19:43:01
 * @Last Modified by:   Carrey Wang
 * @Last Modified time: 2019-07-27 20:38:16
 */

'use strict';
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const serverConfig = require('../config/webpack.devServerConfig');
const config = require('../config/webpack.config.dev.js');
const compiler = webpack(config);

const devServer = new WebpackDevServer(compiler, serverConfig);

devServer.listen(3001, 'localhost');