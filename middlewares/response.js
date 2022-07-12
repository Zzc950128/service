'use strict'

const { logger } = require('./logger')

const responseHandle = (ctx) => {
    if(ctx.result !== undefined || ctx.msg !== undefined) {
        ctx.type = 'json'
        ctx.body = {
            code: 200,
            msg: ctx.msg || '',
            data: ctx.result || ''
        }
    }
}

const errorHandle = (ctx, next) => {
    return next().catch(err => {
        if(err.code == null) {
            logger.error(err.stack)
        }
        ctx.body = {
            code: err.code || -1,
            msg: err.message.trim() || '系统问题',
            data: ''
        }
        // ctx.status = 200
        return Promise.resolve()
    })
}

module.exports = {
    responseHandle,
    errorHandle
}
