import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [

      // 创建分类路由
      {
        path: "/category/create",
        component: () => import('../views/CategoryEdit.vue')
      },
      {
        path: "/category/list",
        component: () => import('../views/CategoryList.vue')
      },
      {
        path: "/category/edit/:id",
        component: () => import('../views/CategoryEdit.vue'),
        props: true
      },

      // 物品管理路由

      {
        path: "/item/create",
        component: () => import('../views/ItemEdit.vue')
      },
      {
        path: "/item/list",
        component: () => import('../views/ItemList.vue')
      },
      {
        path: "/item/edit/:id",
        component: () => import('../views/ItemEdit.vue'),
        props: true
      },

      // 英雄管理路由

      {
        path: "/hero/create",
        component: () => import('../views/HeroEdit.vue')
      },
      {
        path: "/hero/list",
        component: () => import('../views/HeroList.vue')
      },
      {
        path: "/hero/edit/:id",
        component: () => import('../views/HeroEdit.vue'),
        props: true
      },

      // 文章管理路由

      {
        path: "/article/create",
        component: () => import('../views/ArticleEdit.vue')
      },
      {
        path: "/article/list",
        component: () => import('../views/ArticleList.vue')
      },
      {
        path: "/article/edit/:id",
        component: () => import('../views/ArticleEdit.vue'),
        props: true
      },

      // 广告位管理路由
      {
        path: "/ad/create",
        component: () => import('../views/AdEdit.vue')
      },
      {
        path: "/ad/list",
        component: () => import('../views/AdList.vue')
      },
      {
        path: "/ad/edit/:id",
        component: () => import('../views/AdEdit.vue'),
        props: true
      },
      // 管理员路由
      {
        path: "/admin_user/create",
        component: () => import('../views/AdminUserEdit.vue')
      },
      {
        path: "/admin_user/list",
        component: () => import('../views/AdminUserList.vue')
      },
      {
        path: "/admin_user/edit/:id",
        component: () => import('../views/AdminUserEdit.vue'),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name != 'login' && !localStorage.token) {
    return next('/login')
  } else {
    next()
  }
})

export default router
