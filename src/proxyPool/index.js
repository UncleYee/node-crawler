/**
 * 代理池几种处理中心
 * @author: UncleYee
 */
const getSixProxy = require('./freeProxy/sixsixapi');
const getXMProxy = require('./freeProxy/xiaoma');
const getXCProcxy = require('./freeProxy/xici');

const Validator = require('./validator/Validator');
const ProxyHandle = require('./proxyHandle/ProxyHandle');

const getAllProxyList = () => {
  return new Promise(async (resolve, reject) => {

    const sixList = await getSixProxy();
    const xmList = await getXMProxy();
    const xcList = await getXCProcxy();

    let proxyLists = []
      .concat(sixList.length && sixList)
      .concat(xmList.length && xmList)
      .concat(xcList.length && xcList)

    if (proxyLists.length) {
      resolve(proxyLists);
    } else {
      console.log('未爬取到代理!')
      reject();
    }
  })
}

getAllProxyList().then(list => {
  Validator.validator(list, ProxyHandle.insert);
})