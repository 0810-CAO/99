const PATH = require('path');
// 根据对应系统生成不同分隔符
const SEP = PATH.sep;
const { version } = require('../package.json');
// console.log(process.env)
// console.log(process.platform)//区分win和mac
const currentPlatformKey = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
const downloadDirPath = `${process.env[currentPlatformKey]}${SEP}.nue-template`;
console.log(downloadDirPath);
module.exports = {
  version,
  downloadDirPath,
};
