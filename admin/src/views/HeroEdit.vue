<template>
    <div>
        <h1>
            {{ id ? '编辑' : "新建" }}英雄
        </h1>
        <el-form label-width="50px" @submit.native.prevent="save">
            <el-tabs type="border-card" value="skillTab">
                <el-tab-pane label="基础信息" name="basicTab">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false" :on-success="afterUpload">
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option v-for="item of categories" :key="item._id" :value="item._id" :label="item.name">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate style="margin-top:0.65rem;" :max="9" show-score v-model="model.scores.difficulty">
                        </el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate style="margin-top:0.65rem;" :max="9" show-score v-model="model.scores.skills">
                        </el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate style="margin-top:0.65rem;" :max="9" show-score v-model="model.scores.attack">
                        </el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate style="margin-top:0.65rem;" :max="9" show-score v-model="model.scores.survive">
                        </el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" multiple>
                            <el-option v-for="item of items" :key="item._id" :value="item._id" :label="item.name">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" multiple>
                            <el-option v-for="item of items" :key="item._id" :value="item._id" :label="item.name">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.technique"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能信息" name="skillTab">
                    <el-button type="text" @click="model.skills.push({})">
                        <i class="el-icon-plus"></i>添加技能
                    </el-button>
                    <el-row type="flex" style="flex-wrap: wrap;">
                        <el-col :md="12" v-for="(item, i) in model.skills" :key="i" style="padding: 0 60px;">
                            <el-form-item label="名字">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload class="avatar-uploader" :headers="getAuthHeaders()" :action="getUploadUrl()"
                                    :show-file-list="false" :on-success="res => $set(item, 'icon', res.url)">
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input v-model="item.description" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="提示">
                                <el-input v-model="item.tip" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" size="small" @click="model.skills.splice(i, 1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-tab-pane>
            </el-tabs>
            <el-form-item>
                <el-button style="margin-top:1rem" type="primary" native-type="submit">
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
            categories: [],
            items: [],
            model: {
                name: '',
                avatar: '',
                scores: {
                    difficulty: 0,
                    skills: 0,
                    attack: 0,
                    survive: 0
                },
                skills: []
            }
        }
    },
    methods: {
        afterUpload(res) {
            console.log(res);
            this.model.avatar = res.url
            // this.$set(this.model, 'avatar', res.url)
        },
        async save() {
            /* eslint-disable */
            // 大概是 this.$http.post()
            let res
            if (this.id) {
                res = await this.$http.put(`rest/hero/${this.id}`, this.model)
            } else {
                res = await this.$http.post('rest/hero', this.model)
            }
            console.log(res)
            this.$router.push('/hero/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/hero/${this.id}`)
            // console.log(res.data.name);
            this.model = { ...this.model, ...res.data }
        },
        async fetchCategories() {
            const res = await this.$http.get('rest/category') //获取分类列表接口
            this.categories = res.data
        },
        async fetchItems() {
            const res = await this.$http.get('rest/item') //获取分类列表接口
            this.items = res.data
        }
    },
    created() {
        this.fetchItems()
        this.fetchCategories()
        this.id && this.fetch()
    }
}
</script>

<style>

</style>