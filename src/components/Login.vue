<template>
<div class="login_container">
    <div class="login_box">
        <div class="avatar_box">
            <img src="../assets/logo.png" alt="">
        </div>
        <!--ref获取表单实例对象-->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" prefix-icon="iconfont icon-password" type="password"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            //登录表单数据绑定对象
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            //表单验证规则对象
            loginFormRules: {
                username: [{
                        required: true,
                        message: '请输入登录用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '用户名长度在3到10个字符',
                        trigger: 'blur'
                    }
                ],
                password: [{
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '密码长度需在6到15位个字符',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields()
        },
        //对提交的数据预校验，以判断是否向后台发请求
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return
                const {
                    data: res
                } = await this.$http.post("login", this.loginForm)
                if (res.meta.status != 200) return this.$message.error('登录失败')
                this.$message.success('登录成功')
                console.log(res)
                //保存token为了保证只有在登录之后才能访问其他的页面
                window.sessionStorage.setItem("token", res.data.token)
                this.$router.push('/home')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 550px;
    height: 350px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        position: absolute;
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    float: right;
}
</style>
