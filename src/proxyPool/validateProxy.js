const request = require('../helper/request');
const cheerio = require('cheerio');
const { headers } = require('./config');

const getProxyList = require('./sixsixapi');

const validate = (ipList) => {
  ipList.forEach(url => {
    console.log(`testing ${url}`);

    const validateUrl = 'http://ip.chinaz.com/getip.aspx';
    const proxyUrl = `http://${url}`;

    setTimeout(() => {
      request
      .get(validateUrl)
      .proxy(proxyUrl)
      .charset('gbk')
      .end((err, res) => {
        try {
          if(err) {
            throw err;
          }

          const $ = cheerio.load(res.text);
          const response = JSON.parse($('body').text());
          

          if(response.address) {
            console.log(`验证成功 ==> ${response.address}`)
          }

        } catch (error) {
          console.log(error)
        }
      })
    }, 500);
  })
}

getProxyList().then(ipList => {
  console.log(ipList);
  validate(ipList);
})