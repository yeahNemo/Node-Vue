const mongoose = require('mongoose')

// 数据模型
const schema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String }
})

module.exports = (mongoose.model('Item', schema))