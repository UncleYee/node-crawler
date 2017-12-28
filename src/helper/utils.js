const getDelay = () => {
  return parseInt((Math.random() * 10000000) % 2000, 10);
}

module.exports = {
  getDelay
}