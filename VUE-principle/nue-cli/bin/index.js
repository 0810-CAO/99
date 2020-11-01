#! /usr/bin/env node
/* eslint-disable global-require */
const program = require('commander');
const path = require('path');
const { version } = require('./const');

const commandMap = {
  create: {
    alias: 'c', // 指令简写
    description: 'create a new project powered by vue-cli-service', // 指令描述
    example: 'nue-cli create <app-name>',
  },
  add: {
    alias: 'a', // 指令简写
    description:
      'install a plugin and invoke its generator in an already created progect', // 指令描述
    example: 'nue-cli add [plugin] <plugin> [pluginOptions]',
  },
  '*': {
    alias: '',
    description: '',
    example: '',
  },
};
// Reflect.ownKeys(commandMap) [create add *]node中的遍历方法
Reflect.ownKeys(commandMap).forEach((key) => {
  const value = commandMap[key];
  program
    .command(key) // 指令名称
    .alias(value.alias) // 指令简写
    .description(value.description) // 指令描述
    .action(() => {
      if (key === '*') {
        console.log('指令不存在');
      } else {
        // console.log(process.argv.splice(3))//vue create project获取 project
        // eslint-disable-next-line import/no-dynamic-require
        require(path.resolve(__dirname, key))(...process.argv.splice(3));// 拼接路径后执行(传入解构后的参数)
      }
    });
});
program.on('--help', () => {
  // 示例
  console.log('Example:');
  Reflect.ownKeys(commandMap).forEach((key) => {
    const value = commandMap[key];
    console.log(`${value.example}`);
  });
});
/* program
  .command('create') //指令名称
  .alias('c') //指令简写
  .description('create a new project powered by vue-cli-service') //指令描述
  .action(() => {
    //指令具体的操作
    console.log('创建一个vue项目')
  })
program.on('--help', () => {//示例
  console.log('Example:')
  console.log('nue-cli create <app-name>')
}) */

// 1、通过npm init --y初始化一个node项目
// 2、创建一个js文件，并在文件开头通过#! /usr/bin/env node告诉系统需要在node环境下运行
// 3、在package.json中新增"nue-cli": "./bin/index.js"，nue-cli指令执行那个文件
// 4、将本地包链接到全局npm link

// 1、安装cnpm i eslint
// 2、初始化eslint  npx eslint -init  {3  2 (react vue none)  ts(yes no)  node  1  every  1  y}
// console.log('曹承湘')
// console.log(process.argv)
// if(process.argv[2]==='help'){
// // 输出帮助文档
// }else if(process.argv[2]==='--version'){
// // 输出当前版本号
// }
// commander 快速的处理自定义指令传来的参数
// 将传递进来的参数直接传递给parse方法，自动实现--help
// program.parse(process.argv)//nue-cli --help   nue-cli -h
// 调用parse方法之前，先调用version方法告诉当前版本号，实现--version
program.version(version).parse(process.argv);
