/* eslint-disable import/no-dynamic-require */
const axios = require('axios');
// ora获取网络上模板过程中的提示效果
const ora = require('ora');
// 用户与终端交互
const inquirer = require('inquirer');
// 下载github中的库方法
let DownloadGitRepo = require('download-git-repo');
// 通过node.js的util中的promisfy方法可以快速的将回调函数中api转换成promise的api
const { promisify } = require('util');
const path = require('path');
// 拷贝目录
let ncp = require('ncp');
const shell = require('shelljs');
// 粉笔颜色
const chalk = require('chalk');
// 判断路径对应的文件是否存在
const fs = require('fs');
// 利用用户填写信息编译模板
let { render } = require('consolidate').ejs;
// 编译文件
const Metalsmith = require('metalsmith');
// 图像化框
const boxen = require('boxen');
// 版本更新
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

render = promisify(render);
// 执行下载
const exec = promisify(shell.exec);
// 下载到用户目录
const { downloadDirPath } = require('./const');
// 执行指令
ncp = promisify(ncp);
DownloadGitRepo = promisify(DownloadGitRepo);
const getTemplateNames = async () => {
  const { data } = await axios.get(
    'https://api.github.com/orgs/it666-com/repos',
  );
  return data;
};
const getTemplateTags = async (currentTemplateName) => {
  const { data } = await axios.get(
    `https://api.github.com/repos/it666-com/${currentTemplateName}/tags`,
  );
  return data;
};
// 具体原理见test.js
const waitLoading = (message, fn) => async (...args) => {
  const spinner = ora(message);
  spinner.start();
  const data = await fn(...args);
  spinner.succeed(`${message} successfully`);
  return data;
};
const downloadTemplate = async (templateName, templateTag) => {
  // 组织机构名称/模板名称/模板版本  1、拼接模板在github上的路径
  let url = `it666-com/${templateName}`;
  if (templateTag) {
    url += `#${templateTag}`;
  }
  // 2、拼接 存储下载好的模板路径
  const destPath = `${downloadDirPath}${path.sep}${templateName}`;
  // 3、下载模板
  await DownloadGitRepo(url, destPath);
  // 4、将保存模板的路径返回给调用者
  return destPath;
};
const installDependencies = async (projectName) => {
  // 1、进入创建的项目目录
  shell.cd(projectName);
  // 2、执行npm install指令
  await exec('npm install');
};
// 检查版本
const checkVersion = () => {
  const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 0, // 1week
  });
  const { update } = notifier;
  if (update) {
    const messages = [];
    messages.push(
      `${chalk.bgYellow.black(' WARNI: ')}  cao_vue_cli is not latest.\n`,
    );
    messages.push(
      chalk.grey('current ')
        + chalk.grey(update.current)
        + chalk.grey(' → ')
        + chalk.grey('latest ')
        + chalk.green(update.latest),
    );
    messages.push(
      `${chalk.grey('Up to date ')} npm i -g ${pkg.name}`,
    );

    console.log(boxen(messages.join('\n'), {
      padding: 2,
      margin: 2,
      align: 'center',
      borderColor: 'red',
      borderStyle: 'round',
    }));
  }
};
module.exports = async (projectName) => {
  checkVersion();
  const destPath = path.resolve(projectName);
  // /Users/caochengxiang/Downloads/cao-99.github.io-master/VUE-principle/nue-cli/lihua
  console.log(chalk.green('✨  Creating project in ') + chalk.red(`${destPath}`));
  // console.log('create', projectName)
  // 1、从网络上下载提前准备好的模板
  // 2、安装好模板中指定的依赖

  // 1、拉取所有模板名称
  // const spinner = ora('downloading template names')
  // spinner.start()
  // const data = await getTemplateNames()
  // const templateNames = data.map((obj) => obj.name)
  // // console.log(templateNames)//[ 'vue-simple-template', 'vue-advanced-template' ]
  // spinner.succeed('downloading template successful')
  const data = await waitLoading(
    'downloading template names',
    getTemplateNames,
  )();
  const templateNames = data.map((obj) => obj.name);
  // 2、让用户选定模板名称
  const { currentTemplateName } = await inquirer.prompt({
    name: 'currentTemplateName', // 存储当前问题回答的变量
    type: 'list', // 提问的类型  input confirm list
    choices: templateNames, // 列表选项
    message: '请选择哪个模板来创建项目',
  });
  // console.log(currentTemplateName)
  // 3、获取用户指定模板所有版本号
  // spinner.start()
  // const data2 = await getTemplateTags(currentTemplateName)
  // const templateTags = data2.map((obj) => obj.name)
  // spinner.succeed('downloading template successful')
  // console.log(templateTags) [ '3.0', '2.0', '1.0' ]
  const data2 = await waitLoading(
    'downloading template tags',
    getTemplateTags,
  )(currentTemplateName);
  const templateTags = data2.map((obj) => obj.name);
  // 4、选择模板版本来创建项目
  const { currentTemplateTag } = await inquirer.prompt({
    name: 'currentTemplateTag', // 存储当前问题回答的变量
    type: 'list', // 提问的类型  input confirm list
    choices: templateTags, // 列表选项
    message: '请选择哪一个模板版本来创建项目',
  });
  console.log('完成模板及其版本选择', currentTemplateName, currentTemplateTag);
  // 官方模板会先下载到用户目录中（下载好的模板可能需要编译,vue-advanced-template中的package.json中name、privateauthor都需要输入）
  // 然后再拷贝到执行指令的目录中 const.js判断操作系统
  // 5、下载用户选择的模板
  console.log(chalk.green('✨  Initializing git repository...'));
  const sourcePath = await waitLoading('downloading template', downloadTemplate)(currentTemplateName, currentTemplateTag);
  // console.log(sourcePath);

  const askPath = path.join(sourcePath, 'ask.js');
  if (!fs.existsSync(askPath)) {
    // 6、将用户目录中的模板拷贝到执行指令的目录中  /Users/caochengxiang/.nue-template/vue-simple-template   lihua
    await waitLoading('copying template', ncp)(sourcePath, destPath);
  } else {
    // 6.将用户目录中的模板编译后再拷贝到执行指令的路径中
    await new Promise((resolve, reject) => {
      Metalsmith(__dirname)
        .source(sourcePath) // 告诉Metalsmith真正需要遍历的目录是谁
        .destination(destPath) // 告诉Metalsmith编译完的文件放到什么地方
        .use(async (files, metal, done) => { // 被遍历目录所有文件路径 在多个use之间共享数据  执行完毕
          // 1.让用户填写配置信息
          // eslint-disable-next-line global-require
          const config = require(askPath);
          // 通过config系统给定的题目来交互
          const result = await inquirer.prompt(config);
          console.log(result);
          const meta = metal.metadata();
          Object.assign(meta, result);
          done(); // 执行完毕
        })
        .use((files, metal, done) => {
          const result = metal.metadata();
          // 2.根据用户填写的配置信息编译模板
          // 2.1遍历拿到所有文件路径
          Reflect.ownKeys(files).forEach(async (filePath) => {
            // 2.2提取我们需要处理的问题
            if (filePath.includes('.js') || filePath.includes('.json')) {
              // 2.3获取当前文件的内容
              const fileContent = files[filePath].contents.toString();
              // 2.4判断当前文件的内容是否需要编译
              if (fileContent.includes('<%')) {
                const resultContent = await render(fileContent, result);// 渲染模板 渲染数据
                // eslint-disable-next-line no-param-reassign
                files[filePath].contents = Buffer.from(resultContent);
              }
            }
          });
          done();
        })
        .build((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }
  // 7、安装相关依赖
  console.log(chalk.green('✨  Initializing dependencies...'));
  await waitLoading('install dependencies', installDependencies)(projectName);
  // 8.显示创建成功之后的提示信息
  console.log(chalk.green(' Successfully created project ') + chalk.red(`${projectName}.`));
  console.log(chalk.green(' Get started with the following commands:'));
  console.log(chalk.magenta(`$ cd ${projectName}`));
  console.log(chalk.magenta('$ npm run serve'));
};
