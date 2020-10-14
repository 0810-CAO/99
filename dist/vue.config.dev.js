"use strict";

module.exports = {
  chainWebpack: function chainWebpack(config) {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', function (config) {
      config.entry('app').clear().add('./src/main-prod.js');
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor'
      });
    }); // 开发模式

    config.when(process.env.NODE_ENV === 'development', function (config) {
      config.entry('app').clear().add('./src/main.js');
    });
  }
};