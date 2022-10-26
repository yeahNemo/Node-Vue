import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
