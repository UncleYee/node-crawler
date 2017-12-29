/**
 * 代理池验证
 * @author: UncleYee
 */
const superagent = require('../../helper/request');
const cheerio = require('cheerio');
const async = require('async');

const { headers } = require('../../config');
const { getDelay } = require('../../helper/utils');

const validateUrl = 'http://www.qq.com/';
let currencyCount = 0;

class Validator {

  // 验证抓取到的代理是否可用
  static validate(url, callback, op) {
    const delay = getDelay();
    currencyCount++;
    superagent
      .get(validateUrl)
      .set(headers)
      .proxy(`http://${url}`)
      .charset('gbk')
      .end((err, res) => {
        if (err) {
          return console.log('验证失败', url);
        }
  
        const $ = cheerio.load(res.text);
        if($('#guess').text() == 'WWWQQCOM') {
          console.log(`验证成功 ==> http://${url}`)
          op(url);
        }
  
        console.log('现在并发数是', currencyCount, '正在抓取的是：', url, '耗时', delay, '毫秒' )
      })
  
    setTimeout(() => {
      currencyCount--;
      callback(null, url);
    }, delay);
  }

  static validator(ipList, op) {
    async.mapLimit(ipList, 20, (url, callback) => {
      Validator.validate(url, callback, op);
    }, (err, result) => {
      console.log('验证结束！')
    })
  }
}

module.exports = Validator;