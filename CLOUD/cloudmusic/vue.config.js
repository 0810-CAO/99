const jsdom = require("jsdom");
const { JSDOM } = jsdom;
module.exports = {
  // 部署应用包的基本URL, 不设置可能会出现打包后项目找不到资源问题
  publicPath: "./",

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },
  // 以下代码是安装预渲染插件后自动添加
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        "/",
        "/recommend",
        "/singer",
        "/rank",
        "/search",
        "/account",
        "/detail"
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        // 预渲染内容写入之前的额外操作 避免在服务器运行中切换设备屏幕导致像素比变化
        let reg = /<meta name="viewport".*user-scalable=no">/gi;
        let res = route.html.match(reg);
        route.html = route.html.replace(res[1], "");
        // 1.根据字符串创建一个网页  将网络等待图标清除(在nodejs中使用document中方法)
        let html = new JSDOM(route.html);
        // 2.从创建好的网页中拿到document对象
        let dom = html.window.document;
        // 3.找到对应的元素, 删除对应的元素
        let loadingEle = dom.querySelector(".container");
        dom.body.removeChild(loadingEle);
        route.html = html.serialize();
        return route;
      }
    }
  }
};
