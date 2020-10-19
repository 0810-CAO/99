"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _Loading = _interopRequireDefault(require("./Loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*eslint-disable*/

/*封装组件为插件使用*/
var _default = {
  install: function install() {
    _vue["default"].component(_Loading["default"].name, _Loading["default"]);
  }
};
exports["default"] = _default;