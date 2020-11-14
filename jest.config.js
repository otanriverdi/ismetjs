/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  testEnvironment: 'jest-environment-node',
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  modulePathIgnorePatterns: ['dist'],
  collectCoverageFrom: ['src/**/*.ts'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
