const mongoose = require('mongoose')

// 数据模型
const schema = new mongoose.Schema({
    // 英雄名称
    name: { type: String },
    // 称号
    title: { type: String },
    // 头像
    avatar: { type: String },
    // 英雄定位
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    // 评分
    scores: {
        difficulty: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },

    },
    // 技能：4个（多个）
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tip: { type: String }
    }],
    // 顺风出装
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
    // 逆风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
    // 使用技巧
    technique: { type: String },
    // 对抗技巧
    battleTips: { type: String },
    // 团战思路
    teamTips: { type: String },
    // 英雄关系
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
        description: { type: String },
    }]

})

module.exports = (mongoose.model('Hero', schema))