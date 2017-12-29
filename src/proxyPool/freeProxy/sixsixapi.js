/**
 * 66ip 免费代理提取
 * @author: UncleYee
 */
const request = require('../../helper/request');
const cheerio = require('cheerio');

const { headers } = require('../../config');

const getProxyList = () => {
  const apiUrl = 'http://www.66ip.cn/mo.php?sxb=&tqsl=300&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=';
  const apiAnonyUrl = 'http://www.66ip.cn/nmtq.php?getnum=300&isp=0&anonymoustype=0&start=&ports=&export=&ipaddress=&area=0&proxytype=2&api=66ip';

  return new Promise((resolve, reject) => {
    console.log('开始抓取66免费代理!')
    let apiLst = [], apiAnonyList = [];
    
    request
      .get(apiUrl)
      .charset('gbk')
      .set(headers)
      .timeout({
        response: 3000,
        deadline: 50000
      })
      .end((err, res) => {
        try {
          if(err) {
            return console.log(err);
          }

          apiLst = res.text.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g);

          request
            .get(apiAnonyUrl)
            .charset('gbk')
            .set(headers)
            .end((err, res) => {
              try {
                if(err) {
                  throw err
                }
        
                apiAnonyList = res.text.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g);

                resolve(apiLst.concat(apiAnonyList));
              } catch (err) {
                reject(err);
              }
            })
        } catch (err) {
          reject(err);
        }
      })
  })
}

module.exports = getProxyList;