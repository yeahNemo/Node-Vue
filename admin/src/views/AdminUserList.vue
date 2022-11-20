<template>
    <div>
        <h1>
            管理员列表
        </h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="250">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="editBtn(scope.row)" type="text" size="normal">编辑
                    </el-button>
                    <el-button @click="delBtn(scope.row)" type="text" size="normal">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    /* eslint-disable */
    data() {
        return {
            items: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get('rest/admin_user') //获取分类列表接口
            this.items = res.data
        },
        editBtn(value) {
            this.$router.push(`/admin_user/edit/${value._id}`)
        },
        delBtn(value) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`rest/admin_user/${value._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.fetch()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            // this.$router.push(`/admin_user/delete/${value._id}`)
        }
    },
    created() {
        this.fetch()
    }
}
</script>

<style>

</style>