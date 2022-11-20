const mongoose = require('mongoose')

// 数据模型
const schema = new mongoose.Schema({
    // 管理员用户名
    username: { type: String },
    // 管理员密码
    password: {
        type: String,
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

module.exports = (mongoose.model('Admin_user', schema))