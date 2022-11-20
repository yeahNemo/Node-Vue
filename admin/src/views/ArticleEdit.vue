<template>
    <div>
        <h1>
            {{ id ? '编辑' : "新建" }}分类
        </h1>
        <el-form label-width="100px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" placeholder="请选择" multiple>
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">

                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-col :span="8">
                    <el-input v-model="model.title"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="详情">
                <el-col :span="20">
                    <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    props: ['id'],
    components: {
        VueEditor
    },
    data() {
        return {
            model: {
                title: ''
            },
            categories: []
        }
    },
    methods: {
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            // An example of using FormData
            // NOTE: Your key could be different such as:
            // formData.append('file', file)
            const formData = new FormData();
            formData.append("file", file);
            const res = await this.$http.post('upload', formData)
            console.log(res);
            const url = res.data.url; // Get url from response
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader()
        },
        async save() {
            /* eslint-disable */
            // 大概是 this.$http.post()
            let res
            if (this.id) {
                res = await this.$http.put(`rest/article/${this.id}`, this.model)
            } else {
                res = await this.$http.post('rest/article', this.model)
            }
            console.log(res)
            this.$router.push('/article/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/article/${this.id}`)
            // console.log(res.data.name);
            this.model = res.data
        },
        async fetchCategories() {
            const res = await this.$http.get(`rest/category`)
            this.categories = res.data
        }
    },
    created() {
        this.id && this.fetch()
        this.fetchCategories()
    }
}
</script>

<style>

</style>