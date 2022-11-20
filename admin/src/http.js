import axios from "axios"
import Vue from 'vue'
import router from './router'
// new Vue() => vm

const http = axios.create({
    baseURL: "http://localhost:3000/admin/api"
})

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // config.headers.Authorization 这个是标准请求头 但是想加什么都可以 A大写：前端标准
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    // config.headers.Nemo = 'HiNEMO'
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 我们和后端做约定，出错时返回一个 {message: myMessage}
http.interceptors.response.use(res => {
    return res
},
    err => {
        if (err.response.data.message) {
            Vue.prototype.$message({
                type: 'error',
                message: err.response.data.message
            })
            if (err.response.status == 401) {
                router.push('/login')
            }
        }

    })

export default http