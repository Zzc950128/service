'use strict'

const redisStore = require('koa-redis')
const config = require('../config')
const { logger } = require('../middlewares/logger')

const sessionUrl = config.redis.host + ":" + config.redis.port
const sessionConfig = {
    key: 'service.sid',
    prefix: 'service:sess:',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: redisStore({
        all: sessionUrl
    })
}

const sessionVerify = function (ctx, next) {
    logger.info(ctx.session)
    if(ctx.session && ctx.session.userInfo) {
        next()
    } else {
        throw {
            code: 401,
            message: 'no authorization'
        }
    }
}

module.exports = {
    sessionVerify,
    sessionConfig
}
