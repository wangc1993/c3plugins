/*
 * @Author: Carrey Wang
 * @Date: 2019-08-09 11:23:19
 * @LastEditors: Carrey Wang
 * @LastEditTime: 2019-08-12 17:50:22
 */

'use strict';

const newJest = require('jest');
const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}
newJest.run(argv);
