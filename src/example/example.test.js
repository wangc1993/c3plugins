/*
 * @Author: Carrey Wang
 * @Date: 2019-08-08 18:30:56
 * @LastEditors: Carrey Wang
 * @LastEditTime: 2019-08-12 17:24:42
 */
const sum = require('./example');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});