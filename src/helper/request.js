/**
 * superagent 与插件封装
 * @author:  UncleYee
 */
const charset = require('superagent-charset');
const request = charset(require('superagent'));
require('superagent-proxy')(request);

module.exports = request;
