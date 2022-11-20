<template>
    <div>
        <h1>
            {{ id ? '编辑' : "新建" }}物品
        </h1>
        <el-form label-width="auto" label-position="left" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标 ">
                <el-upload class="avatar-uploader" :headers="getAuthHeaders()" :action="getUploadUrl()"
                    :show-file-list="false" :on-success="afterUpload">
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

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
export default {
    props: ['id'],
    data() {
        return {
            model: {}
        }
    },
    methods: {
        afterUpload(res) {
            console.log(res);
            // this.model.icon = res.url
            // 对象类型，无法做到响应
            this.$set(this.model, 'icon', res.url)
        },
        async save() {
            /* eslint-disable */
            // 大概是 this.$http.post()
            let res
            if (this.id) {
                res = await this.$http.put(`rest/item/${this.id}`, this.model)
            } else {
                res = await this.$http.post('rest/item', this.model)
            }
            console.log(res)
            this.$router.push('/item/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/item/${this.id}`)
            // console.log(res.data.name);
            this.model = res.data
        }
    },
    created() {
        this.id && this.fetch()
    }
}
</script>

