// sequelize
'use strict';

module.exports = function (app) {
  var _app$Sequelize = app.Sequelize,
      STRING = _app$Sequelize.STRING,
      INTEGER = _app$Sequelize.INTEGER,
      DATE = _app$Sequelize.DATE;
  var User = app.model.define('users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE
  });
  return User; // this.ctx.model.User.create()
};