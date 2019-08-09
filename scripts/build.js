'use strict';
process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const config = require('../config/webpack.config.prod.js');
const compiler = webpack(config);
compiler.run((err) => {
    if (err) {
        console.log(chalk.red('Failed to compile.\n'));
        printBuildError(err);
        process.exit(1);
    }
});