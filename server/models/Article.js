const mongoose = require('mongoose')

// 数据模型
const schema = new mongoose.Schema({
    // 文章标题
    title: { type: String },
    // 文章分类：一个文章可能有多个分类
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    body: { type: String }
})

module.exports = (mongoose.model('Article', schema))