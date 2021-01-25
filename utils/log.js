// 手动实现日志
const fs = require('fs');
const path = require('path');

function createWriteStream() {
  const fullPath = createDirPath();
  const fullFileName = path.join(fullPath, 'access.log');
  const writeStream = fs.createWriteStream(fullFileName);
  return writeStream;
}
function createDirPath() {
  const date = new Date();
  const dirName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
  const fullPath = path.join(__dirname, '../log', dirName);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
  }
  return fullPath;
}
const writeStream = createWriteStream();
function writeLog(log) {
  writeStream.write(log + '\n');
}
module.exports = writeLog;
