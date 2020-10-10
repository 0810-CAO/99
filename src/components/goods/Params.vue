<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" :closable="false" show-icon></el-alert>
        <el-row class="cat_opt">
            <el-col>
                <span>选择商品分类：</span>
                <!--选择商品分类的级联选择框-->
                <el-cascader v-model="selectdCateKeys" :options="cateList" :props="{expandTrigger:'hover',value: 'cat_id',label: 'cat_name', children: 'children'}" @change="handleChange"></el-cascader>
            </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="动态参数" name="many">
                <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible=true">添加参数</el-button>
                <el-table :data="manyTableData" border stripe>
                    <el-table-column type="expand">
                        <!--循环渲染tag标签-->
                        <template slot-scope="scope">
                            <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable @close="handleClose(i,scope.row)">{{item}}</el-tag>
                            <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only">
                <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible=true">添加属性</el-button>
                <el-table :data="onlyTableData" border stripe>
                    <el-table-column type="expand">
                        <!--循环渲染tag标签-->
                        <template slot-scope="scope">
                            <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable @close="handleClose(i,scope.row)">{{item}}</el-tag>
                            <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-card>
    <el-dialog :title="'添加'+titleText" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <!--添加参数对话框-->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
            <el-form-item :label="titleText" prop="attr_name">
                <el-input v-model="addForm.attr_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addParams">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog :title="'修改'+titleText" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <!--修改参数对话框-->
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
            <el-form-item :label="titleText" prop="attr_name">
                <el-input v-model="editForm.attr_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editParams">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            // 商品分类列表
            cateList: [],
            // 级联选择框双向绑定
            selectdCateKeys: [],
            // 被激活的页签名称
            activeName: 'many',
            // 动态参数的数据
            manyTableData: [],
            // 静态参数的数据
            onlyTableData: [],
            addDialogVisible: false,
            // 添加参数的表单数据对象
            addForm: {
                attr_name: ''
            },
            // 添加表单的验证规则对象
            addFormRules: {
                attr_name: [{
                    required: true,
                    message: '请输入参数名称',
                    trigger: 'blur'
                }]
            },
            editDialogVisible: false,
            editForm: {},
            editFormRules: {
                attr_name: [{
                    required: true,
                    message: '请输入参数名称',
                    trigger: 'blur'
                }]
            }
        }
    },
    created() {
        this.getCateList()
    },
    methods: {
        async getCateList() {
            const {
                data: res
            } = await this.$http.get('categories')
            if (res.meta.status !== 200) {
                return this.$message.error("获取商品分类失败");
            }
            this.cateList = res.data
            console.log(res.data)
        },
        // 选中级联即触发函数
        async handleChange() {
            this.getParamData()
        },
        // tab点击事件函数
        handleTabClick() {
            console.log(this.activeName)
            this.getParamData()
        },
        // 获取参数列表数据
        async getParamData() {
            if (this.selectdCateKeys.length !== 3) {
                this.selectdCateKeys = []
                // 由于设置了三级分类才可以显示参数显示，因此在选择二级或一级分类需要清空下面的参数列表
                this.manyTableData = []
                this.onlyTableData = []
                return
            }
            const {
                data: res
            } = await this.$http.get(`categories/${this.cateId}/attributes`, {
                params: {
                    sel: this.activeName
                }
            })
            if (res.meta.status !== 200) {
                return this.$message.error("获取参数列表失败");
            }
            res.data.forEach(item => {
                // 三元表达式解决attr_vals为空的问题
                item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
                // 控制文本框的显示与隐藏
                item.inputVisible = false
                // 文本框中输入的值
                item.inputValue = ''
            })
            console.log(res.data)
            if (this.activeName === "many") {
                this.manyTableData = res.data
            } else {
                this.onlyTableData = res.data
            }
        },
        // 监听添加对话框的关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        addParams() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return
                const {
                    data: res
                } = await this.$http.post(`categories/${this.cateId}/attributes`, {
                    attr_name: this.addForm.attr_name,
                    attr_sel: this.activeName
                })
                if (res.meta.status !== 201) {
                    return this.$message.error("添加分类失败");
                }
                this.$message.success('添加分类成功')
                this.addDialogVisible = false
                this.getParamData()
            })
        },
        // 展示修改对话框
        async showEditDialog(attr_id) {
            const {
                data: res
            } = await this.$http.get(`categories/${this.cateId}/attributes/${attr_id}`, {
                params: {
                    attr_sel: this.activeName
                }
            })
            if (res.meta.status !== 200) {
                return this.$message.error("获取参数信息失败");
            }
            this.editForm = res.data
            this.editDialogVisible = true
        },
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        editParams() {
            this.$refs.editFormRef.validate(async valid => {
                if (!valid) return
                const {
                    data: res
                } = await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`, {
                    attr_name: this.editForm.attr_name,
                    attr_sel: this.activeName
                })
                if (res.meta.status !== 200) {
                    return this.$message.error("修改参数信息失败");
                }
                this.$message.success('修改参数信息成功')
                this.editDialogVisible = false
                this.getParamData()
            })
        },
        // 根据id删除对应参数项
        async removeParams(attr_id) {
            const confirmResult = await this.$confirm('此操作将永久删除该参数', '提示', {
                confirmButtonText: '确定',
                cancleButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除')
            }
            const {
                data: res
            } = await this.$http.delete(`categories/${this.cateId}/attributes/${attr_id}`)
            if (res.meta.status !== 200) {
                return this.$message.error("删除参数信息失败");
            }
            this.$message.success('删除参数信息成功')
            this.getParamData()
        },
        // 文本框失去焦点或者按下enter
        async handleInputConfirm(row) {
            if (row.inputValue.trim().length === 0) {
                row.inputValue = ''
                row.inputVisible = false
                return
            }
            // 若文本框有内容则添加tag标签
            row.attr_vals.push(row.inputValue.trim())
            row.inputValue = ''
            row.inputVisible = false
            this.saveAttrVals(row)
        },
        //封装的修改删除参数可选项函数
        async saveAttrVals(row) {
            //保存添加的数据到数据库中
            const {
                data: res
            } = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`, {
                attr_name: row.attr_name,
                attr_sel: row.attr_sel,
                attr_vals: row.attr_vals.join(' ')
            })
            if (res.meta.status !== 200) {
                return this.$message.error("修改参数项失败");
            }
            this.$message.success('修改参数项成功')
        },
        showInput(row) {
            row.inputVisible = true
            // 让文本框自动获得焦点
            //当页面元素被重新渲染后才会指定回调函数$nextTick
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            })
        },
        // 删除对应的参数可选项
        handleClose(i, row) {
            row.attr_vals.splice(i, 1)
            this.saveAttrVals(row)
        }
    },
    computed: {
        isBtnDisabled() {
            if (this.selectdCateKeys.length !== 3) {
                return true
            }
            return false
        },
        cateId() {
            if (this.selectdCateKeys.length == 3) {
                return this.selectdCateKeys[2]
            }
            return null
        },
        // 动态计算标题
        titleText() {
            if (this.activeName === "many") {
                return '动态参数'
            } else {
                return '静态属性'
            }
        }
    },
}
</script>

<style lang="less" scoped>
.cat_opt {
    margin: 15px 0;
}

.el-tag {
    margin: 10px;
}

.input-new-tag {
    width: 120px;
}

.el-cascader {
    width: 250px;
}
</style>
