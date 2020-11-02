/*
TS中的模块几乎和ES6和Node中的模块一致
从零玩转NodeJS核心+原理⑩
27-NodeJS自定义模块(掌握)
28-Node模块导出数据几种方式(掌握)
29-exports和module.exports区别(掌握)
30-NodeJS-Require注意点(掌握)

从零玩转Webpack4+实现原理⑾
85-ES6-模块化上(掌握)
86-ES6-模块化中(掌握)
87-ES6-模块化下(掌握)
* */
/*
1.ES6模块
1.1分开导入导出
export xxx;
import {xxx} from "path";

1.2一次性导入导出
export {xxx, yyy, zzz};
import {xxx, yyy, zzz} from "path";

1.3默认导入导出
export default xxx;
import xxx from "path";
*/
/*
2.Node模块
1.1通过exports.xxx = xxx导出
通过const xxx = require("path");导入
通过const {xx, xx} = require("path");导入

1.2通过module.exports.xxx = xxx导出
通过const xxx = require("path");导入
通过const {xx, xx} = require("path");导入
* */
/*
ES6的模块和Node的模块是不兼容的, 所以TS为了兼容两者就推出了
export = xxx;
import xxx = require('path');
* */
import obj = require("./55/test");
console.log(obj);

