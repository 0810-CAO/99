const path = require('path')
const fs = require('fs')
const mime = require('./mime')
// 读取静态资源  （请求对象、响应对象、静态资源所在目录）
function readFile(req, res, rootPath) {
  // 1、获取静态资源地址
  // http://localhost:3000/login.html?name=ccx&age=21
  let fileName = req.url.split('?')[0];
  let filePath = path.join(rootPath, fileName)
  // console.log(fileName);// /login.html 
  // console.log(filePath);// /Users/caochengxiang/Downloads/NEK/nodetest/www/login.html
  // 2、判断静态资源是否存在
  let isExist = fs.existsSync(filePath)
  if (!isExist) {
    return
  }
  // 3、获取静态资源后缀名
  let fileExt = path.extname(filePath)
  // console.log(fileExt);
  // 4、根据文件后缀获取文件类型
  let type = mime[fileExt]
  // console.log(type);
  // 5、对文本类型进行特殊处理
  if (type.startsWith('text')) {
    type += '; charset=utf-8;'
  }
  // 6、告诉客户端返回资源类型
  res.writeHead(200, {
    'Content-Type': type
  })
  // 7、加载静态资源并返回
  // fs.readFileSync(filePath, (err, content) => {
  //   if (err) {
  //     res.end('Error')
  //     return
  //   }
  //   res.end(content)
  // })
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.end('Server Error');
        reject(err);
      } else {
        res.end(content);
        resolve();
      }
    });
  });
}
module.exports = {
  readFile
}