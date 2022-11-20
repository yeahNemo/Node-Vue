import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import http from './http'
import './style.css'


Vue.use(ElementUI);
Vue.prototype.$http = http
Vue.mixin({
  methods: {
    getUploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    },
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});