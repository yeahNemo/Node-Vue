<template>
    <el-container style="height: 100vh">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu router unique-opene :default-active="$route.path">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>内容管理</template>
                    <el-menu-item-group>
                        <template slot="title">分类</template>
                        <el-menu-item index="/category/create">新建分类</el-menu-item>
                        <el-menu-item index="/category/list">分类列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">物品</template>
                        <el-menu-item index="/item/create">新建物品</el-menu-item>
                        <el-menu-item index="/item/list">物品列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">英雄</template>
                        <el-menu-item index="/hero/create">新建英雄</el-menu-item>
                        <el-menu-item index="/hero/list">英雄列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">文章</template>
                        <el-menu-item index="/article/create">新建文章</el-menu-item>
                        <el-menu-item index="/article/list">文章列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">广告位</template>
                        <el-menu-item index="/ad/create">新建广告位</el-menu-item>
                        <el-menu-item index="/ad/list">广告位列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-message"></i>运营管理</template>
                    <el-menu-item-group>
                        <template slot="title">广告位</template>
                        <el-menu-item index="/ad/create">新建广告位</el-menu-item>
                        <el-menu-item index="/ad/list">广告位列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-message"></i>系统管理</template>
                    <el-menu-item-group>
                        <template slot="title">管理员</template>
                        <el-menu-item index="/admin_user/create">新建管理员</el-menu-item>
                        <el-menu-item index="/admin_user/list">管理员列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <span>{{ username }}</span>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            username: localStorage.getItem('username')
        }
    }
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>