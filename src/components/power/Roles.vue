<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row>
            <el-col>
                <el-button type="primary" @click="addRolesDialogVisible = true">添加角色</el-button>
            </el-col>
        </el-row>
        <!--角色列表区域-->
        <el-table :data="roleList" border stripe>
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row :class="['bdbottom',i1===0?'bdtop':'','vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
                        <!--渲染一级权限-->
                        <el-col :span="5">
                            <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <el-col :span="19">
                            <!--渲染二级权限-->
                            <el-row :class="[i2===0?'':'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                                <el-col :span="6">
                                    <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="18">
                                    <el-tag type="warning" v-for="(item3,i3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row,item3.id)">
                                        {{item3.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeRolesById(scope.row.id)">删除</el-button>
                    <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!--分配权限对话框-->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed">
        <el-tree :data="rightList" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defkeys" ref="treeRef"> </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setRightDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
    </el-dialog>
    <!--添加角色对话框-->
    <el-dialog title="添加角色" :visible.sync="addRolesDialogVisible" width="50%" @close="addRolesDialogClose">
        <el-form :model="addRolesForm" :rules="addRolesFormRules" ref="addRolesFormRef" label-width="100px">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="addRolesForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="addRolesForm.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addRolesDialogVisible  = false">取 消</el-button>
            <el-button type="primary" @click="addRoles">确 定</el-button>
        </span>
    </el-dialog>
    <!--编辑角色对话框-->
    <el-dialog title="添加角色" :visible.sync="editRolesDialogVisible" width="50%" @close="editRolesDialogClose">
        <el-form :model="editRolesForm" :rules="editRolesFormRules" ref="editRolesFormRef" label-width="100px">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="editRolesForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="editRolesForm.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editRolesDialogVisible  = false">取 消</el-button>
            <el-button type="primary" @click="editRolesInfo">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            // 所有角色列表数据
            roleList: [],
            setRightDialogVisible: false,
            // 所有权限数据
            rightList: [],
            // 树形控件的属性绑定对象
            treeProps: {
                label: 'authName',
                // 使用children来嵌套
                children: 'children'
            },
            // 默认选中的节点id值数组
            defkeys: [],
            // 当前分配权限的id
            roleId: [],
            addRolesForm: {
                roleName: "",
                roleDesc: ""
            },
            addRolesDialogVisible: false,
            // 添加角色验证规则
            addRolesFormRules: {
                roleName: [{
                    required: true,
                    message: "请输入角色名称",
                    trigger: "blur"
                }]
            },
            editRolesDialogVisible: false,
            editRolesForm: {
                roleName: "",
                roleDesc: ""
            },
            editRolesFormRules: {
                roleName: [{
                    required: true,
                    message: "请输入角色名称",
                    trigger: "blur"
                }]
            },
            editRolesForm: {}
        }
    },
    created() {
        this.getRolesList()
    },
    methods: {
        async getRolesList() {
            const {
                data: res
            } = await this.$http.get('roles')
            if (res.meta.status !== 200) {
                return this.$message.error('获取角色列表失败')
            }
            this.roleList = res.data
            console.log(this.roleList)
        },
        // 根据id删除对应的权限
        async removeRightById(role, rightId) {
            const confirmResult = await this.$confirm(
                "此操作将永久删除该权限, 是否继续?",
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
            } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            if (res.meta.status !== 200) {
                return this.$message.error("删除权限失败");
            }
            this.$message.success("删除权限成功");
            role.children = res.data
        },
        // 展示分配权限的对话框
        async showSetRightDialog(role) {
            this.roleId = role.id
            const {
                data: res
            } = await this.$http.get('rights/tree')
            if (res.meta.status !== 200) {
                return this.$message.error("获取权限失败");
            }
            // 将获取到的数据保存
            this.rightList = res.data
            console.log(this.rightList)
            this.getLeafKeys(role, this.defkeys)
            this.setRightDialogVisible = true
        },
        // 通过递归将所有三级权限id获取并保存到数组中
        getLeafKeys(node, arr) {
            if (!node.children) {
                return arr.push(node.id)
            }
            node.children.forEach(item => this.getLeafKeys(item, arr))
        },
        setRightDialogClosed() {
            this.defkeys = []
        },
        //分配权限函数
        async allotRights() {
            const keys = [
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedKeys()
            ]
            const idStr = keys.join(',')
            const {
                data: res
            } = await this.$http.post(`roles/${this.roleId}/rights`, {
                rids: idStr
            })
            if (res.meta.status !== 200) {
                return this.$message.error('分配权限失败')
            }
            this.$message.success('分配权限成功')
            this.getRolesList()
            this.setRightDialogVisible = false
        },
        // 根据id删除对应的角色信息
        async removeRolesById(id) {
            const confirmResult = await this.$confirm(
                "此操作将永久删除该角色, 是否继续?",
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
            } = await this.$http.delete("/roles/" + id);
            if (res.meta.status !== 200) {
                return this.$message.error("删除角色失败");
            }
            this.$message.success("删除角色成功");
            this.getRolesList();
        },
        //添加用户预校验
        addRoles() {
            this.$refs.addRolesFormRef.validate(async valid => {
                if (!valid) return;
                const {
                    data: res
                } = await this.$http.post("roles", this.addRolesForm);
                if (res.meta.status !== 201) {
                    this.$message.error("添加角色失败");
                }
                this.$message.success("添加角色成功");
                this.addRolesDialogVisible = false;
                this.getRolesList();
            });
        },
        addRolesDialogClose() {
            this.$refs.addRolesFormRef.resetFields();
        },
        //获取当前点击的角色信息
        async showEditDialog(id) {
            const {
                data: res
            } = await this.$http.get("roles/" + id);
            if (res.meta.status !== 200) {
                return this.$message.error("查询角色信息失败");
            }
            this.editRolesForm = res.data;
            this.editRolesDialogVisible = true;
        },
        //编辑角色信息
        editRolesInfo() {
            this.$refs.editRolesFormRef.validate(async valid => {
                if (!valid) return;
                const {
                    data: res
                } = await this.$http.put(
                    "roles/" + this.editRolesForm.roleId, {
                        roleName: this.editRolesForm.roleName,
                        roleDesc: this.editRolesForm.roleDesc
                    }
                );
                if (res.meta.status !== 200) {
                    return this.$message.error("更新角色信息失败");
                }
                this.editRolesDialogVisible = false;
                this.getRolesList();
                this.$message.success("更新角色信息成功");
            });
        },
        // editRolesDialogClose() {
        //     this.$refs.editRolesFormRef.resetFields();
        // },
    },
}
</script>

<style lang="less" scoped>
.bdtop {
    border-top: 1px solid #eee;
}

.bdbottom {
    border-bottom: 1px solid #eee;
}

.el-tag {
    margin: 7px;
}
</style>
