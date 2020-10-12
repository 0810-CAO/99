<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
        <el-row :gutter="15">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
            </el-col>
        </el-row>
        <!--用户列表-->
        <el-table :data="userlist" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="姓名" prop="username"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="电话" prop="mobile"></el-table-column>
            <el-table-column label="角色" prop="role_name"></el-table-column>
            <el-table-column label="状态">
                <!-- 作用域插槽-->
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                    <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-card>

    <!--添加用户对话框  addFormRef表单引用名-->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
            <!--username为data中的校验规则-->
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
    </el-dialog>
    <!--修改用户对话框-->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClose">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <!--username为data中的校验规则-->
            <el-form-item label="用户名" prop="username">
                <el-input v-model="editForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
    </el-dialog>
    <!--分配角色-->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClosed">
        <div>
            <p>当前的用户:{{userInfo.username}}</p>
            <p>当前的角色:{{userInfo.role_name}}</p>
            <p>分配新角色</p>
            <el-select v-model="selectedRoleId" placeholder="请选择">
                <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id">
                </el-option>
            </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setRoleDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        // 验证手机号规则
        var checkEamil = (rule, value, cb) => {
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            if (regEmail.test(value)) {
                return cb();
            }
            cb(new Error("请输入合法的邮箱"));
        };
        var checkMobile = (rule, value, cb) => {
            const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if (regMobile.test(value)) {
                return cb();
            }
            cb(new Error("请输入合法的手机号"));
        };
        return {
            // 获取用户列表数据
            queryInfo: {
                query: "",
                pagenum: 1,
                pagesize: 2
            },
            userlist: [],
            total: 0,
            // 控制用户添加对话框的显示与隐藏
            addDialogVisible: false,
            // 添加用户表单数据
            addForm: {
                username: "",
                password: "",
                email: "",
                mobile: ""
            },
            // 添加用户表单数据验证规则
            addFormRules: {
                username: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 10,
                        message: "用户名长度在3到10个字符",
                        trigger: "blur"
                    }
                ],
                password: [{
                        required: true,
                        message: "请输入登录密码",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 15,
                        message: "密码长度需在6到15位个字符",
                        trigger: "blur"
                    }
                ],
                email: [{
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur"
                    },
                    {
                        validator: checkEamil,
                        trigger: "blur"
                    }
                ],
                mobile: [{
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    {
                        validator: checkMobile,
                        trigger: "blur"
                    }
                ]
            },
            // 控制需改用户对话框显示与隐藏
            editDialogVisible: false,
            // 查询的用户信息
            editForm: {},
            // 修改用户表单数据验证规则
            editFormRules: {
                email: [{
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur"
                    },
                    {
                        validator: checkEamil,
                        trigger: "blur"
                    }
                ],
                mobile: [{
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    {
                        validator: checkMobile,
                        trigger: "blur"
                    }
                ]
            },
            setRoleDialogVisible: false,
            // 需要被分配角色的用户信息
            userInfo: {},
            // 所有角色的数据列表
            rolesList: [],
            // 已经选中的id
            selectedRoleId: ''
        };
    },
    created() {
        this.getUserList();
    },
    methods: {
        async getUserList() {
            const {
                data: res
            } = await this.$http.get("users", {
                params: this.queryInfo
            });
            if (res.meta.status !== 200) {
                return this.$message.error("用户获取失败");
            }
            this.userlist = res.data.users;
            this.total = res.data.total;
            console.log(res);
        },
        // 监听pagesize改变
        handleSizeChange(newSize) {
            console.log(newSize);
            this.queryInfo.pagesize = newSize;
            this.getUserList();
        },
        handleCurrentChange(newPage) {
            console.log(newPage);
            this.queryInfo.pagenum = newPage;
            this.getUserList();
        },
        // 监听switch开关状态改变
        async userStateChanged(userinfo) {
            console.log(userinfo);
            const {
                data: res
            } = await this.$http.put(
                `users/${userinfo.id}/state/${userinfo.mg_state}`
            );
            if (res.meta.status !== 200) {
                userinfo.mg_state = !userinfo.mg_state;
                return this.$message.error("更新用户状态失败");
            }
            this.$message.success("更新用户状态成功");
        },
        // 监听关闭对话框,清空表单数据
        addDialogClose() {
            this.$refs.addFormRef.resetFields();
        },
        //添加用户预校验
        addUser() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return;
                // 发起网络请求
                const {
                    data: res
                } = await this.$http.post("users", this.addForm);
                if (res.meta.status !== 201) {
                    this.$message.error("添加用户失败");
                }
                this.$message.success("添加用户成功");
                this.addDialogVisible = false;
                this.getUserList();
            });
        },
        // 展示编辑的对话框
        async showEditDialog(id) {
            const {
                data: res
            } = await this.$http.get("users/" + id);
            if (res.meta.status !== 200) {
                return this.$message.error("查询用户信息失败");
            }
            this.editForm = res.data;
            this.editDialogVisible = true;
        },
        editDialogClose() {
            this.$refs.editFormRef.resetFields();
        },
        // 修改用户信息并提交
        editUserInfo() {
            this.$refs.editFormRef.validate(async valid => {
                if (!valid) return;
                const {
                    data: res
                } = await this.$http.put(
                    "users/" + this.editForm.id, {
                        email: this.editForm.email,
                        mobile: this.editForm.mobile
                    }
                );
                if (res.meta.status !== 200) {
                    return this.$message.error("更新用户信息失败");
                }
                this.editDialogVisible = false;
                this.getUserList();
                this.$message.success("更新用户信息成功");
            });
        },
        // 根据id删除对应的用户信息
        async removeUserById(id) {
            // 返回为promise
            // 用户确认删除返回confirm 取消删除返回cancel
            const confirmResult = await this.$confirm(
                "此操作将永久删除该用户, 是否继续?",
                "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            ).catch(err => err);
            if (confirmResult !== "confirm") {
                return this.$message.info("已经取消删除");
            }
            const {
                data: res
            } = await this.$http.delete("/users/" + id);
            if (res.meta.status !== 200) {
                return this.$message.error("删除用户失败");
            }
            this.$message.success("删除用户成功");
            this.getUserList();
        },
        async setRole(userInfo) {
            this.userInfo = userInfo
            const {
                data: res
            } = await this.$http.get('roles')
            if (res.meta.status !== 200) {
                return this.$message.error("获取角色列表失败");
            }
            this.rolesList = res.data
            this.setRoleDialogVisible = true
        },
        // 点击按钮分配角色
        async saveRoleInfo() {
            if (!this.selectedRoleId) {
                return this.$message.error('请选择要分配的角色')
            }
            const {
                data: res
            } = await this.$http.put(`users/${this.userInfo.id}/role`, {
                rid: this.selectedRoleId
            })
            if (res.meta.status !== 200) {
                return this.$message.error("更新角色失败");
            }
            console.log(res)
            this.$message.success('更新角色成功')
            this.getUserList()
            this.setRoleDialogVisible = false
        },
        // 监听分配角色对话框的关闭
        setRoleDialogClosed() {
            this.selectedRoleId = ''
            this.userInfo = {}
        }
    }
};
</script>

<style lang="less" scoped></style>
