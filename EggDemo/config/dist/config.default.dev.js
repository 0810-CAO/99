/* eslint valid-jsdoc: "off" */
'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (appInfo) {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  var config = exports = {}; // use for cookie sign key, should change to your own and keep security

  config.keys = appInfo.name + '_1592213709118_461'; // add your middleware config here

  config.middleware = [];
  config.ajv = {
    keyword: 'schema',
    // to indicate the namespace and path of schemas, default as 'schema'
    allErrors: true,
    // required for custom error message
    jsonPointers: true // required for custom error message

  };
  config.sequelize = {
    dialect: 'mysql',
    host: '8.131.77.175',
    port: '3306',
    user: 'demo',
    password: 'j6izGiySCTpiCXSZ',
    database: 'demo'
  };
  config.redis = {
    client: {
      port: '6379',
      // Redis port
      host: '127.0.0.1',
      // Redis host
      // password: '',
      db: 0
    }
  }; // add your user config here

  var userConfig = {// myAppName: 'egg',
  };
  return _objectSpread({}, config, {}, userConfig);
};