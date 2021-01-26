// redis工具类
// 1、导入redis模块
const redis = require("redis");
const { REDIS_CONFIG } = require('../config/db')
// 2、建立redis连接
const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
module.exports = client