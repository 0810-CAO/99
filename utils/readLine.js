// 分析日志
const fs = require('fs');
const path = require('path');
// 按行读取log数据
const readline = require('readline')

function createReadStream() {
  const fullPath = createDirPath();
  const fullFileName = path.join(fullPath, 'access.log');
  const readStream = fs.createReadStream(fullFileName);
  return readStream;
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
const readStream = createReadStream();
const readObject = readline.createInterface({
  input: readStream
})
let totalCount = 0
let chromCount = 0
readObject.on('line', (lineData) => {
  // console.log(lineData);
  if (!lineData) {
    return
  }
  totalCount++
  if (lineData.indexOf('Chrome') > 0) {
    chromCount++
  }
})
readObject.on('close', () => {
  console.log(chromCount / totalCount);
})