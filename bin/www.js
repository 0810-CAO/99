// 服务端配置文件，在该文件中提供一个简单的服务即可
const http = require('http')
const serverHandle = require('../app')
const PORT = 3000
const server = http.createServer()
server.on('request', serverHandle)
server.listen(PORT)