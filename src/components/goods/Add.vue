<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-alert title="添加商品信息" type="info" center show-icon :closable="false">
        </el-alert>
        <el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
            <!-- 控制导航栏的防止方向 activeIndex与name相对应通过该值来联动改变步骤条-->
            <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave" @tab-click="tabClicked">
                <el-tab-pane label="基本信息" name="0">
                    <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="addForm.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="goods_price">
                        <el-input v-model="addForm.goods_price" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="goods_weight">
                        <el-input v-model="addForm.goods_weight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="goods_number">
                        <el-input v-model="addForm.goods_number" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goods_cat">
                        <el-cascader v-model="addForm.goods_cat" :options="cateList" :props="{ expandTrigger: 'hover' ,label:'cat_name',value:'cat_id',children:'children'}" @change="handleChange"></el-cascader>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品参数" name="1">
                    <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                        <el-checkbox-group v-model="item.attr_vals">
                            <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品属性" name="2">
                    <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
                        <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品图片" name="3">
                    <!--action图片上传的api地址-->
                    <el-upload :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :headers="headerObj" :on-success="handleSuccess">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-tab-pane>
                <el-tab-pane label="商品内容" name="4">
                    <!--富文本编辑器-->
                    <quill-editor v-model="addForm.goods_introduce">
                    </quill-editor>
                    <el-button type="primary" class="btnAdd" @click="add">添加商品</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </el-card>
    <el-dialog title=" 图片预览" :visible.sync="previewVisible" width="50%">
        <img :src="previewPath" alt="" class="previewImg">
    </el-dialog>
</div>
</template>

<script>
import _ from 'lodash'
export default {
    data() {
        return {
            activeIndex: '0',
            // 添加商品的表单数据对象
            addForm: {
                goods_name: '',
                goods_price: 0,
                goods_weight: 0,
                goods_number: 0,
                goods_cat: [],
                //图片数组
                pics: [],
                // 商品详情描述
                goods_introduce: '',
                attrs: []
            },
            addFormRules: {
                goods_name: [{
                    required: true,
                    message: "请输入商品名称",
                    trigger: "blur"
                }],
                goods_price: [{
                    required: true,
                    message: "请输入商品价格",
                    trigger: "blur"
                }],
                goods_weight: [{
                    required: true,
                    message: "请输入商品重量",
                    trigger: "blur"
                }],
                goods_number: [{
                    required: true,
                    message: "请输入商品数量",
                    trigger: "blur"
                }],
                goods_cat: [{
                    required: true,
                    message: "请选择商品分类",
                    trigger: "blur"
                }]
            },
            // 商品分类列表
            cateList: [],
            //动态参数列表数据
            manyTableData: [],
            //静态属性列表数据
            onlyTableData: [],
            uploadUrl: 'https://www.liulongbin.top:8888/api/private/v1/upload',
            // 图片上传组件的headers请求头,由于上传组件没有调用axios，因此需要手动来设置
            headerObj: {
                Authorization: window.sessionStorage.getItem('token')
            },
            // 预览图片url
            previewPath: '',
            previewVisible: false
        }
    },
    created() {
        this.getCateList()
    },
    methods: {
        async getCateList() {
            const {
                data: res
            } = await this.$http.get('categories');
            if (res.meta.status !== 200) {
                return this.$message.error("分类获取失败");
            }
            this.cateList = res.data
            console.log(res.data)
        },
        // 级联选择器选中后触发
        handleChange() {
            if (this.addForm.goods_cat.length !== 3) {
                this.addForm.goods_cat = []
            }
        },
        // 判断标签页是否切换
        beforeTabLeave(activeName, oldActiveName) {
            // console.log('from' + oldActiveName + '----' + 'to' + activeName)
            if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
                this.$message.error("请先选择商品分类");
                return false
            }
        },
        async tabClicked() {
            // 证明访问的是动态参数面板
            if (this.activeIndex === '1') {
                const {
                    data: res
                } = await this.$http.get(`categories/${this.cateId}/attributes`, {
                    params: {
                        sel: 'many'
                    }
                })
                if (res.meta.status !== 200) {
                    return this.$message.error("获取动态参数列表失败");
                }
                res.data.forEach(item => {
                    item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
                })
                console.log(res.data)
                this.manyTableData = res.data
            } else if (this.activeIndex === '2') {
                const {
                    data: res
                } = await this.$http.get(`categories/${this.cateId}/attributes`, {
                    params: {
                        sel: 'only'
                    }
                })
                if (res.meta.status !== 200) {
                    return this.$message.error("获取静态属性列表失败");
                }
                this.onlyTableData = res.data
            }
        },
        // 处理图片预览
        handlePreview(file) {
            this.previewPath = file.response.data.url
            this.previewVisible = true
        },
        //移除操作图片
        handleRemove(file) {
            const filePath = file.response.data.tmp_path
            const i = this.addForm.pics.findIndex(x => x.pics === filePath)
            this.addForm.pics.splice(i, 1)
        },
        //监听图片上传成功
        handleSuccess(response) {
            const picInfo = {
                pic: response.data.tmp_path
            }
            this.addForm.pics.push(picInfo)
        },
        add() {
            console.log(this.addForm)
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) {
                    return this.$message.error("请填写必要的表单项");
                }
                //深拷贝，避免级联选择器需要数组而此时会将数组转换为字符串
                const form = _.cloneDeep(this.addForm)
                form.goods_cat = form.goods_cat.join(',')
                this.manyTableData.forEach(item => {
                    const newInfo = {
                        attr_id: item.attr_id,
                        attr_value: item.attr_vals.join(' ')
                    }
                    this.addForm.attrs.push(newInfo)
                })
                this.onlyTableData.forEach(item => {
                    const newInfo = {
                        attr_id: item.attr_id,
                        attr_value: item.attr_vals
                    }
                    this.addForm.attrs.push(newInfo)
                })
                form.attrs = this.addForm.attrs
                console.log(form)
                const {
                    data: res
                } = await this.$http.post('goods', form)
                if (res.meta.status !== 201) {
                    return this.$message.error("添加商品失败");
                }
                return this.$message.success("添加商品成功");

            })
            this.$router.push('/goods')
        }
    },
    computed: {
        cateId() {
            if (this.addForm.goods_cat.length === 3) {
                return this.addForm.goods_cat[2]
            }
            return null
        }
    }
}
</script>

<style lang="less" scoped>
.el-checkbox() {
    margin: 0 10px 0 0 !important;

}

.previewImg {
    width: 100%;
}

.btnAdd {
    margin-top: 15px;
}
</style>
