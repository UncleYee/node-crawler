/**
 * 西刺免费代理
 * @author: UncleYee
 */
const request = require('../../helper/request');
const cheerio = require('cheerio');

const { headers } = require('../../config');

const getProxyList = () => {
  // 免费代理链接
  const freeProxyUrl = 'http://www.xicidaili.com/nn/'; // 国内高匿

  return new Promise((resolve, reject) => {
    console.log('开始抓取西刺免费代理!');

    const proxyList = [];
    let flag = 1;
    url = `${freeProxyUrl}${flag}`;

    const fetchUrl = (url) => {
      request
      .get(url)
      .timeout({
        response: 3000,
        deadline: 50000
      })
      .charset('gbk')
      .set(headers)
      .end((err, res) => {
        try {
          if(err) {
            return console.log(err);
          }

          console.log(`正在抓取：${url}`);

          // 分析DOM文档
          const $ = cheerio.load(res.text);
          $('#ip_list tbody tr').each((idx, elm) => {
            if(idx > 0) {
              const $elm = $(elm);
              const ip = $elm.find('td').eq(1).text();
              const port = $elm.find('td').eq(2).text();
              const url = `${ip}:${port}`;
              proxyList.push(url);
            }
          });

          // 抓取前10页的代理
          setTimeout(() => {
            if (flag < 10) {
              flag++;
              url = `${freeProxyUrl}${flag}`;
              fetchUrl(url);
            } else {
              resolve(proxyList);
            }
          }, 500);
        } catch (err) {
          reject(err);
        }
      })
    }

    fetchUrl(url);
  })
}

module.exports = getProxyList;