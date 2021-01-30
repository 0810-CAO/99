module.exports = {
    success(data, code=200, msg='成功') {
        // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
        this.body = {
            code:code,
            msg:msg,
            data:data
        }
    },
    error(code=500, msg='错误') {
        // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
        this.body = {
            code:code,
            msg:msg
        }
    }
};