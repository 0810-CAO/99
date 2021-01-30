'use strict';
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = function (app) {
  var router = app.router,
      controller = app.controller;
  router.get('/', controller.home.index);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
};