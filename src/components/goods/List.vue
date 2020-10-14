<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
                    <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="goAddPage">添加商品</el-button>
            </el-col>
        </el-row>
        <el-table :data="goodsList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="商品名称" prop="goods_name"></el-table-column>
            <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
            <el-table-column label="商品重量" prop="goods_weight" width="80px"></el-table-column>
            <el-table-column label="创建时间" prop="add_time" width="140px">
                <template slot-scope="scope">
                    {{scope.row.add_time|dateFormate}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.goods_id)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.goods_id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[10, 30, 50, 100]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
        </el-pagination>
    </el-card>
    <el-dialog title="修改商品信息" :visible.sync="editDialogVisible" width="50%">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="140px">
            <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="editForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="goods_price" type="number">
                <el-input v-model="editForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="goods_number" type="number">
                <el-input v-model="editForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="重量" prop="goods_weight">
                <el-input v-model="editForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input v-model="editForm.goods_introduce"></el-input>
            </el-form-item>
            <el-form-item label="上传的图片">
                <el-input v-model="editForm.pics"></el-input>
            </el-form-item>
            <el-form-item label="商品的参数">
                <el-input v-model="editForm.attrs"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editDialogInfo">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
            goodsList: [],
            total: 0,
            editForm: {},
            editFormRules: {
                goods_name: [{
                    required: true,
                    message: "请输入分类名",
                    trigger: "blur"
                }],
                goods_price: [{
                    required: true,
                    message: "请输入分类名",
                    trigger: "blur"
                }],
                goods_number: [{
                    required: true,
                    message: "请输入分类名",
                    trigger: "blur"
                }],
                goods_weight: [{
                    required: true,
                    message: "请输入分类名",
                    trigger: "blur"
                }]
            },
            editDialogVisible: false
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        async getGoodsList() {
            const {
                data: res
            } = await this.$http.get('goods', {
                params: this.queryInfo
            })
            if (res.meta.status !== 200) {
                return this.$message.error("获取商品列表失败");
            }
            this.$message.success('获取商品列表成功')
            this.goodsList = res.data.goods
            this.total = res.data.total
        },
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getGoodsList()
        },
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getGoodsList()
        },
        async removeById(id) {
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
            } = await this.$http.delete("/goods/" + id);
            if (res.meta.status !== 200) {
                return this.$message.error("删除商品失败");
            }
            this.$message.success("删除商品成功");
            this.getGoodsList()
        },
        // 添加商品页面跳转
        goAddPage() {
            this.$router.push('/goods/add')
        },
        async showEditDialog(id) {
            const {
                data: res
            } = await this.$http.get("goods/" + id);
            const cp_pics = []
            const cp_attrs = []
            if (res.meta.status !== 200) {
                return this.$message.error("查询商品信息失败");
            }
            console.log(res.data.attrs)
            res.data.pics.forEach(item => {
                const pic = item.pics_mid
                cp_pics.push(pic)
            })
            res.data.attrs.forEach(item => {
                const attr = item.attr_value
                cp_attrs.push(attr)
            })
            res.data.pics = cp_pics
            res.data.attrs = cp_attrs
            this.editForm = res.data;
            this.editDialogVisible = true;
        },
        editDialogInfo() {
            this.$refs.editFormRef.validate(async valid => {
                if (!valid) return;
                const {
                    data: res
                } = await this.$http.put(
                    "goods/" + this.editForm.goods_id, {
                        goods_name: this.editForm.goods_name,
                        goods_price: this.editForm.goods_price,
                        goods_number: this.editForm.goods_number,
                        goods_weight: this.editForm.goods_weight,
                        goods_introduce: this.editForm.goods_introduce,
                        pics: this.editForm.pics,
                        attrs: this.editForm.attrs
                    }
                );
                if (res.meta.status !== 200) {
                    return this.$message.error("更新商品信息失败");
                }
                this.editDialogVisible = false;
                this.getGoodsList()
                this.$message.success("更新商品信息成功");
            });
        }
    },
}
</script>

<style lang="less" scoped>
</style>
