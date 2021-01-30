const Service = require('egg').Service;

class UserService extends Service {
  async createUser({ username, password, gender }) {
    /*
    CREATE TABLE `users` (
      `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
      `username` varchar(30) CHARACTER UNIQUE COMMENT 'user name',
      `password` varchar(2555) DEFAULT NULL COMMENT 'user age',
      `gender` enum('男','女','妖') DEFAULT NULL,
      `created_at` datetime DEFAULT NULL COMMENT 'created time',
      `updated_at` datetime DEFAULT NULL COMMENT 'updated time',
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='user';
    * */
    let users = await this.getUser(username);
    // 判断当前用户是否存在
    if (users.length === 0) {
      // 不存在, 就注册
      let res = await this.ctx.model.User.create({
        username,
        password: this.ctx.helper.generatePwd(password),
        gender
      });
      return res.dataValues;
    } else {
      throw new Error('当前用户已存在');
    }
  }
  async getUser(username, password) {
    if (password) {
      let res = await this.ctx.model.User.findOne({
        where: {
          username: username,
          password: this.ctx.helper.generatePwd(password)
        }
      });
      if (res) {
        return res.dataValues;
      } else {
        throw new Error('用户名或密码不正确');
      }
    }
    else {
      let res = await this.ctx.model.User.findAll({
        where: {
          username: username
        }
      });
      // console.log(res);
      return res;
    }
  }
  async findUser({ username, password }) {
    let user = await this.getUser(username, password);
    return user;
  }
}
module.exports = UserService;