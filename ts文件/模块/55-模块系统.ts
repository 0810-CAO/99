// 1、ES6模块
// 1.1分开导入导出
// export xxx;
// import {xxx} from 'path'
// 1.2一次性导入导出
// export {xx,yy,zz}
// import {xx,yy,zz} from 'path'
// 1.3默认导入导出
// export default xxx;
// import xxx from 'path'

// 2、node模块
// 2.1通过exports.xxx=xxx导出
// 通过const xxx=reuqire('path')导入
// 通过const {xxx,xxx}=reuqire('path')导入
// 2.2通过module.export.xxx=xxx导出
// 通过const xxx=require('path')导入
// 通过const {xxx,xxx}=reuqire('path')导入

// ES6模块和Node的模块不兼容
// export =xxx;
// import xxx=require('path')
import obj = require('./index')
console.log(obj)


