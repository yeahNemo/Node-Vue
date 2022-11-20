module.exports = options => {
    return async (req, res, next) => {
        const jwt = require('jsonwebtoken')
        const AdminUser = require('../models/Admin_user')
        const assert = require('http-assert')
        // 后端 req.headers.字段必须小写才拿得到
        const token = String(req.headers.authorization || "").split(' ').pop()
        assert(token, 401, '检测到无Token,请重新登录')
        const { id } = jwt.verify(token, req.app.get('jwtSecret'), err => {
            res.status(401).send({ message: 'Token过期' })
            return
        })
        // 通过中间件把 user 挂载到 req 对象，方便接下来的使用
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录！')
        next()
    }
} 