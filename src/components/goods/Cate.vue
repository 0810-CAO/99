<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row>
            <el-col>
                <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
            </el-col>
        </el-row>
        <!--表格-->
        <tree-table class="treeTable" :data="catelist" :columns="columns" :expand-type="false" :selection-type="false" show-index index-text="#" border :show-row-hover="false">
            <template slot="isok" slot-scope="scope">
                <i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color:lightgreen"></i>
                <i class="el-icon-error" v-else style="color:red"></i>
            </template>
            <template slot="order" slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
                <el-tag type="success" size="mini" v-else-if="scope.row.cat_level===1">二级</el-tag>
                <el-tag type="warning" size="mini" v-else>三级</el-tag>
            </template>
            <template slot="opt" slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            </template>
        </tree-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[3,5,10,15]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-card>
    <!--添加分类对话框-->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%" @close="addCateDialogClosed">
        <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
            <el-form-item label="分类名称" prop="cat_name">
                <el-input v-model="addCateForm.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类">
                <!--options指定数据源-->
                <!--cascaderProps指定配置对象-->
                <!--selectdKeys选中分类的id-->
                <!--指定级联选择器的配置对象:props-->
                <!--checkStrictly: true 可以选择任意一级选项-->
                <el-cascader v-model="selectdKeys" :options="parentCateList" :props="{expandTrigger:'hover',value: 'cat_id',label: 'cat_name', children: 'children'}" @change="parentCateChange" clearable></el-cascader>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addCateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCate">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            // 查询条件
            queryInfo: {
                type: 3,
                pagenum: 1,
                pagesize: 5
            },
            // 商品数据列表
            catelist: [],
            // 总数据
            total: 0,
            // table 定义每一列以及作用域插槽
            columns: [{
                label: '分类名称',
                prop: 'cat_name'
            }, {
                label: '是否有效',
                // 表示将当前列定义为模板列
                type: 'template',
                // 将当前列使用模板名称
                template: 'isok'
            }, {
                label: '排序',
                // 表示将当前列定义为模板列
                type: 'template',
                // 将当前列使用模板名称
                template: 'order'
            }, {
                label: '操作',
                // 表示将当前列定义为模板列
                type: 'template',
                // 将当前列使用模板名称
                template: 'opt'
            }],
            addCateDialogVisible: false,
            // 添加分类表单的数据对象
            addCateForm: {
                // 将要添加的分类名称
                cat_name: '',
                // 父级分类id
                cat_pid: 0,
                //添加分类的等级默认为一级
                cat_level: 0
            },
            // 添加分类的校验规则
            addCateFormRules: {
                cat_name: [{
                    required: true,
                    message: '请输入分类名称',
                    trigger: 'blur'
                }]
            },
            //父级分类列表
            parentCateList: [],
            // 选中的父级分类数组
            selectdKeys: []
        };
    },
    created() {
        this.getCateList()
    },
    methods: {
        async getCateList() {
            const {
                data: res
            } = await this.$http.get('categories', {
                params: this.queryInfo
            })
            if (res.meta.status !== 200) {
                return this.$message.error("获取商品分类失败");
            }
            this.catelist = res.data.result
            this.total = res.data.total
            console.log(res.data)
        },
        // 监听pagesize
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getCateList()
        },
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getCateList()
        },
        showAddCateDialog() {
            this.getParentCateList()
            this.addCateDialogVisible = true
        },
        // 获取父级分类的数据列表
        async getParentCateList() {
            const {
                data: res
            } = await this.$http.get('categories', {
                params: {
                    type: 2
                }
            })
            if (res.meta.status !== 200) {
                return this.$message.error("获取父级数据失败");
            }
            this.parentCateList = res.data
        },
        // 选择项发生变化触发
        parentCateChange() {
            if (this.selectdKeys.length > 0) {
                // 父级分类的id
                this.addCateForm.cat_pid = this.selectdKeys[this.selectdKeys.length - 1]
                this.addCateForm.cat_level = this.selectdKeys.length
                return // 当前分类的等级
            } else {
                this.addCateForm.cat_pid = 0
                this.addCateForm.cat_level = 0
            }
        },
        addCate() {
            // 添加新的分类  
            this.$refs.addCateFormRef.validate(async valid => {
                if (!valid) return
                const {
                    data: res
                } = await this.$http.post('categories', this.addCateForm)
                if (res.meta.status !== 201) {
                    return this.$message.error("添加分类失败");
                }
                this.$message.success('添加分类成功')
                this.getCateList()
                this.addCateDialogVisible = false
            })
        },
        // 重置表单
        addCateDialogClosed() {
            this.$refs.addCateFormRef.resetFields()
            this.selectdKeys = []
            this.addCateForm.cat_pid = 0;
            this.addCateForm.cat_level = 0
        }
    }
};
</script>

<style scoped>
.treeTable {
    margin-top: 15px;
}
</style>
