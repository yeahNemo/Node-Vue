<template>
    <div>
        <h1>
            {{ id ? '编辑' : "新建" }}广告位
        </h1>
        <el-form label-width="100px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-col :span="8">
                    <el-input v-model="model.name"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="广告">
                <el-button type="text" @click="model.items.push({})">
                    <i class="el-icon-plus"></i>添加广告
                </el-button>
                <el-row type="flex" style="flex-wrap: wrap;">
                    <el-col :md="12" v-for="(item, i) in model.items" :key="i" style="padding: 0 60px;">
                        <el-form-item label="URL">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图片" style="margin-top:1rem">
                            <el-upload class="avatar-uploader" :headers="getAuthHeaders()" :action="getUploadUrl()"
                                :show-file-list="false" :on-success="res => $set(item, 'image', res.url)">
                                <img v-if="item.image" :src="item.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" size="small" @click="model.items.splice(i, 1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
            model: {
                name: '',
                items: []
            },
        }
    },
    methods: {
        async save() {
            /* eslint-disable */
            // 大概是 this.$http.post()
            let res
            if (this.id) {
                res = await this.$http.put(`rest/ad/${this.id}`, this.model)
            } else {
                res = await this.$http.post('rest/ad', this.model)
            }
            console.log(res)
            this.$router.push('/ad/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/ad/${this.id}`)
            this.model = res.data
        },
    },
    created() {
        this.id && this.fetch()
    }
}
</script>

<style>

</style>