/**
 * 爬虫相关配置
 * @author: UncleYee
 */
const path = require('path');
// 请求头
const headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
  'referer': 'https://www.baidu.com',
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
}

const dbConfig = {
  proxyConfig: {
    DB_NAME: '',
    DB_PATH: path.resolve(__dirname, 'db/proxyPool.sqlite'),
    LOG_PATH_NAME: path.resolve(__dirname, 'log/proxyPool.log')
  },
  crawlerConfig: {
    DB_NAME: '',
    DB_PATH: path.resolve(__dirname, 'db/crawler.sqlite'),
    LOG_PATH_NAME: path.resolve(__dirname, 'log/crawler.log')
  }
}


module.exports = {
  headers,
  dbConfig
}