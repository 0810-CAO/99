"use strict";

var PATH = require('path'); // 根据对应系统生成不同分隔符


var SEP = PATH.sep;

var _require = require('../package.json'),
    version = _require.version; // console.log(process.env)
// console.log(process.platform)//区分win和mac


var currentPlatformKey = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
var downloadDirPath = "".concat(process.env[currentPlatformKey]).concat(SEP, ".nue-template");
console.log(downloadDirPath);
module.exports = {
  version: version,
  downloadDirPath: downloadDirPath
};