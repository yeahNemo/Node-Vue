module.exports = app => {

    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/Admin_user')
    const assert = require('http-assert')
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')

    const router = express.Router({
        mergeParams: true
    })
    // const Category = require('../../models/Category')

    // 添加 API
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        // req.body: { name: '123' }
        res.send(model)
        console.log(req.body);
    })

    // 获取列表API
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            // modelName 是 mongodb 模型自带的一个属性 
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        // req.body: { name: '123' }
        res.send(items)
    })

    // 根据 id 获取 name
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        // req.body: { name: '123' }
        res.send(model)
    })

    // 保存按钮更新内容 API
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        // req.body: { name: '123' }
        res.send(model)
    })

    // 删除分类item API
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        // req.body: { name: '123' }
        res.send({
            success: true
        })
    })

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    // 文件上传
    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, resp) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        resp.send(file)
    })

    // 用户登录
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        console.log(username);
        // 登录逻辑有3步
        // 1、根据用户名找用户
        const user = await AdminUser.findOne({ username: username }).select('+password')
        assert(user, 422, '用户不存在！')
        // 2、校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // 3、返回token
        const token = jwt.sign({ id: user._id }, app.get('jwtSecret'), { expiresIn: '15s' })
        res.send({ token })
    })

    // 这个中间件，是出错的处理
    // 若捕获到错误，则将返回一个对象 {message: myMessage}
    // 前端 http.js 捕获到这个错误和信息，就用$message输出myMessage
    app.use(async (err, req, res, next) => {
        // statusCode 是 assert的第二个参数
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}