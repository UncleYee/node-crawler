/**
 * 代理池 IP 处理模块
 * @author: UncleYee
 */
const Sequelize = require('sequelize');
const redis = require('redis');
const Connection = require('../../conn/Connection');
const config = require('../../config');

const sequlize = Connection.initConn(config.dbConfig.proxyConfig);

// 代理 IP Model
const ProxyIp = sequlize.define('proxyip', {
  ip: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
})

class ProxyHandle {
  static test(ip) {
    console.log(ip);
  }
  // 插入 IP
  static insert(ip) {
    ProxyIp.sync({force: false}).then(() => {
      return ProxyIp.create({
        ip: ip
      })
    })
  }

  static delete(ip) {

  }
}


module.exports = ProxyHandle;