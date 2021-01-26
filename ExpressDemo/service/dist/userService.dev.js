"use strict";

// 操作数据库
var exc = require('../db/mysql');

function getUser(username, password) {
  var sql, results, _sql, _results;

  return regeneratorRuntime.async(function getUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!password) {
            _context.next = 8;
            break;
          }

          sql = "select * from user where username='".concat(username, "' and password='").concat(password, "'");
          _context.next = 4;
          return regeneratorRuntime.awrap(exc(sql));

        case 4:
          results = _context.sent;
          return _context.abrupt("return", results);

        case 8:
          _sql = "select * from user where username='".concat(username, "'");
          _context.next = 11;
          return regeneratorRuntime.awrap(exc(_sql));

        case 11:
          _results = _context.sent;
          return _context.abrupt("return", _results);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}

function createUser(_ref) {
  var username, password, gender, sql, results;
  return regeneratorRuntime.async(function createUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          username = _ref.username, password = _ref.password, gender = _ref.gender;
          sql = "insert into user(username,password,gender) values('".concat(username, "','").concat(password, "','").concat(gender, "')");
          _context2.next = 4;
          return regeneratorRuntime.awrap(exc(sql));

        case 4:
          results = _context2.sent;
          return _context2.abrupt("return", results);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  getUser: getUser,
  createUser: createUser
};