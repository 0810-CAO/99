'use strict';

module.exports = app => {
    /*
    当前我们已经对需要存储的数据进行了两次校验
    第一次是在前端校验的
    第二次是在后端收到数据之后校验的
    第三次是在存储的时候校验(还可以)
    https://github.com/demopark/sequelize-docs-Zh-CN/blob/v5/models-definition.md
    * */
    const User = app.model.define('user', {
        id: {
            type: app.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: app.Sequelize.STRING, // varchar(255)
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },
        password: {
            type: app.Sequelize.STRING, // varchar(255)
            allowNull: false,
            unique: false,
            // validate:{
            //     is: /^[A-Za-z0-9]{6,20}$/
            // }
        },
        gender: {
            type: app.Sequelize.ENUM(['男', '女', '妖']),
            defaultValue: '妖'
        }
    });
    return User;
};