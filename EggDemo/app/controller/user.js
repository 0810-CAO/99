'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async register() {
        const { ctx } = this;
        // 1.校验数据是否符合预期
        let res =  await ctx.validate('schema.user', ctx.request.body);
        // 2.根据校验结果做出对应的处理
        if(res){
            // 将校验通过的数据交给Service存储到数据库中
            try {
                let res = await ctx.service.user.createUser(ctx.request.body);
                ctx.success(res);
            }catch (e) {
                ctx.error(400, e.message);
            }
        }else{
            // 告诉前端数据不符合预期
            ctx.error(400, ctx.helper.errorCode[400]);
        }
    }
    async login(){
        const { ctx } = this;
        // console.log(ctx.request.body);
        try {
            let res = await ctx.service.user.findUser(ctx.request.body);
            ctx.session.user = res;
            ctx.success(res);
        }catch (e) {
            ctx.error(202, e.message);
        }
    }
}

module.exports = UserController;
