const mongoose = require('mongoose')

// 数据模型
const schema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = (mongoose.model('Category', schema))