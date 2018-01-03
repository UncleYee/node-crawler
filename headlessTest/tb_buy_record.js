const puppeteer = require('puppeteer');

const userName = ''; //用户名
const passWord = ''; //密码

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const request = await browser.request
  await page.setViewport({width: 1440, height: 800})

  await page.goto('https://www.taobao.com', {waitUntil: 'networkidle2'});

  await page.waitFor('.site-nav-mytaobao .site-nav-menu-hd a');
  await page.click('.site-nav-mytaobao .site-nav-menu-hd a');

  await page.waitFor('#J_Quick2Static');
  await page.waitFor(2000);
  await page.click('#J_Quick2Static');

  await page.waitFor('#TPL_username_1');

  await page.focus('#TPL_username_1');
  await page.type('#TPL_username_1', userName, {delay: 20});

  await page.focus('#TPL_password_1');
  await page.type('#TPL_password_1', passWord, {delay: 20});

  await page.click('#J_SubmitStatic');

  await page.waitFor('#bought');
  await page.click('#bought');

  await page.waitFor('.js-actions-row-bottom');
  await page.waitFor('.pagination');

  const totalPage = await page.$eval('.pagination li:nth-last-child(3)', li => li.title);
  console.log(`共有 ${totalPage} 页订单数据.`);

  await page.click('.pagination-next');

  await page.waitFor(3000);

  page.on('response', async response => {
    if(response.request().url.indexOf('buyertrade.taobao.com/trade/itemlist/asyncBought') != -1) {
      const { mainOrders } = await response.json() || {};
      mainOrders.forEach(elm => {
        const {id, payInfo, subOrders} = elm || {};
        console.log('*****************************');
        console.log(`订单号：${id}`)
        console.log(`总价：${payInfo.actualFee}`);
        console.log(`共有 ${subOrders.length} 个子订单`);
        console.log(`分别为：`);
        subOrders.forEach((item, index) => {
          const {itemInfo, priceInfo} = item || {};
          console.log(`  ${index} : ${itemInfo.title}, ￥${priceInfo.realTotal}`);
        })
      });
    }
  });


  await page.click('.pagination-prev');

  await page.waitFor(3000);

  let flag = 1;

  async function getNextPage() {
    if(flag <= totalPage) {
      flag++;
      await page.click('.pagination-next');
      await page.waitFor(3000);

      getNextPage();
    }
  }

  getNextPage();

  await browser.close();
})();