const mongoose = require('mongoose')

// 数据模型
const schema = new mongoose.Schema({
    // 广告名字
    name: { type: String },
    // 广告位中有很多item 每个item包含图片和URL
    items: [{
        image: { type: String },
        url: { type: String }
    }]
})

module.exports = (mongoose.model('Ad', schema))