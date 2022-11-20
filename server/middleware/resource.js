module.exports = options => {
    return async (req, res, next) => {
        // 这是中间件
        const modelName = require('inflection').capitalize(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}
