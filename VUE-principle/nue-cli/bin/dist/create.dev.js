"use strict";

/* eslint-disable import/no-dynamic-require */
var axios = require('axios'); // ora获取网络上模板过程中的提示效果


var ora = require('ora'); // 用户与终端交互


var inquirer = require('inquirer'); // 下载github中的库方法


var DownloadGitRepo = require('download-git-repo'); // 通过node.js的util中的promisfy方法可以快速的将回调函数中api转换成promise的api


var _require = require('util'),
    promisify = _require.promisify;

var path = require('path'); // 拷贝目录


var ncp = require('ncp');

var shell = require('shelljs'); // 粉笔颜色


var chalk = require('chalk'); // 判断路径对应的文件是否存在


var fs = require('fs'); // 利用用户填写信息编译模板


var render = require('consolidate').ejs.render; // 编译文件


var Metalsmith = require('metalsmith'); // 图像化框


var boxen = require('boxen'); // 版本更新


var updateNotifier = require('update-notifier');

var pkg = require('../package.json');

render = promisify(render); // 执行下载

var exec = promisify(shell.exec); // 下载到用户目录

var _require2 = require('./const'),
    downloadDirPath = _require2.downloadDirPath; // 执行指令


ncp = promisify(ncp);
DownloadGitRepo = promisify(DownloadGitRepo);

var getTemplateNames = function getTemplateNames() {
  var _ref, data;

  return regeneratorRuntime.async(function getTemplateNames$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios.get('https://api.github.com/orgs/it666-com/repos'));

        case 2:
          _ref = _context.sent;
          data = _ref.data;
          return _context.abrupt("return", data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getTemplateTags = function getTemplateTags(currentTemplateName) {
  var _ref2, data;

  return regeneratorRuntime.async(function getTemplateTags$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(axios.get("https://api.github.com/repos/it666-com/".concat(currentTemplateName, "/tags")));

        case 2:
          _ref2 = _context2.sent;
          data = _ref2.data;
          return _context2.abrupt("return", data);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // 具体原理见test.js


var waitLoading = function waitLoading(message, fn) {
  return function _callee() {
    var spinner,
        data,
        _args3 = arguments;
    return regeneratorRuntime.async(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            spinner = ora(message);
            spinner.start();
            _context3.next = 4;
            return regeneratorRuntime.awrap(fn.apply(void 0, _args3));

          case 4:
            data = _context3.sent;
            spinner.succeed("".concat(message, " successfully"));
            return _context3.abrupt("return", data);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

var downloadTemplate = function downloadTemplate(templateName, templateTag) {
  var url, destPath;
  return regeneratorRuntime.async(function downloadTemplate$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // 组织机构名称/模板名称/模板版本  1、拼接模板在github上的路径
          url = "it666-com/".concat(templateName);

          if (templateTag) {
            url += "#".concat(templateTag);
          } // 2、拼接 存储下载好的模板路径


          destPath = "".concat(downloadDirPath).concat(path.sep).concat(templateName); // 3、下载模板

          _context4.next = 5;
          return regeneratorRuntime.awrap(DownloadGitRepo(url, destPath));

        case 5:
          return _context4.abrupt("return", destPath);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var installDependencies = function installDependencies(projectName) {
  return regeneratorRuntime.async(function installDependencies$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // 1、进入创建的项目目录
          shell.cd(projectName); // 2、执行npm install指令

          _context5.next = 3;
          return regeneratorRuntime.awrap(exec('npm install'));

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // 检查版本


var checkVersion = function checkVersion() {
  var notifier = updateNotifier({
    pkg: pkg,
    updateCheckInterval: 0 // 1week

  });
  var update = notifier.update;

  if (update) {
    var messages = [];
    messages.push("".concat(chalk.bgYellow.black(' WARNI: '), "  cao_vue_cli is not latest.\n"));
    messages.push(chalk.grey('current ') + chalk.grey(update.current) + chalk.grey(' → ') + chalk.grey('latest ') + chalk.green(update.latest));
    messages.push("".concat(chalk.grey('Up to date '), " npm i -g ").concat(pkg.name));
    console.log(boxen(messages.join('\n'), {
      padding: 2,
      margin: 2,
      align: 'center',
      borderColor: 'red',
      borderStyle: 'round'
    }));
  }
};

module.exports = function _callee4(projectName) {
  var destPath, data, templateNames, _ref3, currentTemplateName, data2, templateTags, _ref4, currentTemplateTag, sourcePath, askPath;

  return regeneratorRuntime.async(function _callee4$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          checkVersion();
          destPath = path.resolve(projectName); // /Users/caochengxiang/Downloads/cao-99.github.io-master/VUE-principle/nue-cli/lihua

          console.log(chalk.green('✨  Creating project in ') + chalk.red("".concat(destPath))); // console.log('create', projectName)
          // 1、从网络上下载提前准备好的模板
          // 2、安装好模板中指定的依赖
          // 1、拉取所有模板名称
          // const spinner = ora('downloading template names')
          // spinner.start()
          // const data = await getTemplateNames()
          // const templateNames = data.map((obj) => obj.name)
          // // console.log(templateNames)//[ 'vue-simple-template', 'vue-advanced-template' ]
          // spinner.succeed('downloading template successful')

          _context8.next = 5;
          return regeneratorRuntime.awrap(waitLoading('downloading template names', getTemplateNames)());

        case 5:
          data = _context8.sent;
          templateNames = data.map(function (obj) {
            return obj.name;
          }); // 2、让用户选定模板名称

          _context8.next = 9;
          return regeneratorRuntime.awrap(inquirer.prompt({
            name: 'currentTemplateName',
            // 存储当前问题回答的变量
            type: 'list',
            // 提问的类型  input confirm list
            choices: templateNames,
            // 列表选项
            message: '请选择哪个模板来创建项目'
          }));

        case 9:
          _ref3 = _context8.sent;
          currentTemplateName = _ref3.currentTemplateName;
          _context8.next = 13;
          return regeneratorRuntime.awrap(waitLoading('downloading template tags', getTemplateTags)(currentTemplateName));

        case 13:
          data2 = _context8.sent;
          templateTags = data2.map(function (obj) {
            return obj.name;
          }); // 4、选择模板版本来创建项目

          _context8.next = 17;
          return regeneratorRuntime.awrap(inquirer.prompt({
            name: 'currentTemplateTag',
            // 存储当前问题回答的变量
            type: 'list',
            // 提问的类型  input confirm list
            choices: templateTags,
            // 列表选项
            message: '请选择哪一个模板版本来创建项目'
          }));

        case 17:
          _ref4 = _context8.sent;
          currentTemplateTag = _ref4.currentTemplateTag;
          console.log('完成模板及其版本选择', currentTemplateName, currentTemplateTag); // 官方模板会先下载到用户目录中（下载好的模板可能需要编译,vue-advanced-template中的package.json中name、privateauthor都需要输入）
          // 然后再拷贝到执行指令的目录中 const.js判断操作系统
          // 5、下载用户选择的模板

          console.log(chalk.green('✨  Initializing git repository...'));
          _context8.next = 23;
          return regeneratorRuntime.awrap(waitLoading('downloading template', downloadTemplate)(currentTemplateName, currentTemplateTag));

        case 23:
          sourcePath = _context8.sent;
          // console.log(sourcePath);
          askPath = path.join(sourcePath, 'ask.js');

          if (fs.existsSync(askPath)) {
            _context8.next = 30;
            break;
          }

          _context8.next = 28;
          return regeneratorRuntime.awrap(waitLoading('copying template', ncp)(sourcePath, destPath));

        case 28:
          _context8.next = 32;
          break;

        case 30:
          _context8.next = 32;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            Metalsmith(__dirname).source(sourcePath) // 告诉Metalsmith真正需要遍历的目录是谁
            .destination(destPath) // 告诉Metalsmith编译完的文件放到什么地方
            .use(function _callee2(files, metal, done) {
              var config, result, meta;
              return regeneratorRuntime.async(function _callee2$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      // 被遍历目录所有文件路径 在多个use之间共享数据  执行完毕
                      // 1.让用户填写配置信息
                      // eslint-disable-next-line global-require
                      config = require(askPath); // 通过config系统给定的题目来交互

                      _context6.next = 3;
                      return regeneratorRuntime.awrap(inquirer.prompt(config));

                    case 3:
                      result = _context6.sent;
                      console.log(result);
                      meta = metal.metadata();
                      Object.assign(meta, result);
                      done(); // 执行完毕

                    case 8:
                    case "end":
                      return _context6.stop();
                  }
                }
              });
            }).use(function (files, metal, done) {
              var result = metal.metadata(); // 2.根据用户填写的配置信息编译模板
              // 2.1遍历拿到所有文件路径

              Reflect.ownKeys(files).forEach(function _callee3(filePath) {
                var fileContent, resultContent;
                return regeneratorRuntime.async(function _callee3$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        if (!(filePath.includes('.js') || filePath.includes('.json'))) {
                          _context7.next = 7;
                          break;
                        }

                        // 2.3获取当前文件的内容
                        fileContent = files[filePath].contents.toString(); // 2.4判断当前文件的内容是否需要编译

                        if (!fileContent.includes('<%')) {
                          _context7.next = 7;
                          break;
                        }

                        _context7.next = 5;
                        return regeneratorRuntime.awrap(render(fileContent, result));

                      case 5:
                        resultContent = _context7.sent;
                        // 渲染模板 渲染数据
                        // eslint-disable-next-line no-param-reassign
                        files[filePath].contents = Buffer.from(resultContent);

                      case 7:
                      case "end":
                        return _context7.stop();
                    }
                  }
                });
              });
              done();
            }).build(function (err) {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          }));

        case 32:
          // 7、安装相关依赖
          console.log(chalk.green('✨  Initializing dependencies...'));
          _context8.next = 35;
          return regeneratorRuntime.awrap(waitLoading('install dependencies', installDependencies)(projectName));

        case 35:
          // 8.显示创建成功之后的提示信息
          console.log(chalk.green(' Successfully created project ') + chalk.red("".concat(projectName, ".")));
          console.log(chalk.green(' Get started with the following commands:'));
          console.log(chalk.magenta("$ cd ".concat(projectName)));
          console.log(chalk.magenta('$ npm run serve'));

        case 39:
        case "end":
          return _context8.stop();
      }
    }
  });
};