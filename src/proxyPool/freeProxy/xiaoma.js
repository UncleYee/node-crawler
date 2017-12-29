/**
 * 小马免费代理
 * @author: UncleYee
 */
const request = require('../../helper/request');
const cheerio = require('cheerio');

const { headers } = require('../../config');

const getProxyList = () => {
  // 免费代理链接
  const freeProxyUrl = 'http://www.yun-daili.com/free.asp';

  return new Promise((resolve, reject) => {
    console.log('开始抓取小马免费代理!');

    const proxyList = [];
    let flag = 1;
    url = `${freeProxyUrl}?stype=${flag}`;

    const fetchUrl = (url) => {
      request
      .get(url)
      .charset('gbk')
      .set(headers)
      .timeout({
        response: 5000,
        deadline: 50000
      })
      .end((err, res) => {
        try {
          if(err) {
            return console.log(err);
          }

          console.log(`正在抓取：${url}`);

          // 分析DOM文档
          const $ = cheerio.load(res.text);
          $('#list .odd').each((idx, elm) => {
            const $elm = $(elm);
            const ip = $elm.find('.style1').text();
            const port = $elm.find('.style2').text();
            const url = `${ip}:${port}`;
            proxyList.push(url);
          });

          // 是否有下一页
          const isHasNextPage = $('#listnav').find('a').last().prev().text() == '下一页' ? true : false;

          if(isHasNextPage) {
            setTimeout(() => {
              const nextUrl = freeProxyUrl + $('#listnav').find('a').last().prev().attr('href');
              fetchUrl(nextUrl);
            }, 500);
          } else if(flag < 4) {
            flag++;
            setTimeout(() => {
              const nextUrl = `${freeProxyUrl}?stype=${flag}`;
              fetchUrl(nextUrl);
            }, 500);
          } else {
            resolve(proxyList);
          }

        } catch (err) {
          reject(err);
        }
      })
    }

    fetchUrl(url);
  })
}

module.exports = getProxyList;