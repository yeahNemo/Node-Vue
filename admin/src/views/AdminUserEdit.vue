<template>
    <div>
        <h1>
            {{ id ? '编辑' : "新建" }}管理员
        </h1>
        <el-form label-width="100px" @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-col :span="8">
                    <el-input v-model="model.username"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码">
                <el-col :span="8">
                    <el-input v-model="model.password"></el-input>
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
export default {
    props: ['id'],
    data() {
        return {
            model: {}
        }
    },
    methods: {
        async save() {
            /* eslint-disable */
            // 大概是 this.$http.post()
            let res
            if (this.id) {
                res = await this.$http.put(`rest/admin_user/${this.id}`, this.model)
            } else {
                res = await this.$http.post('rest/admin_user', this.model)
            }
            console.log(res)
            this.$router.push('/admin_user/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/admin_user/${this.id}`)
            // console.log(res.data.name);
            this.model = res.data
        }
    },
    created() {
        this.id && this.fetch()
    }
}
</script>

<style>

</style>