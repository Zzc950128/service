'use strict'

const koaJwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const jwtMiddleware = koaJwt({ secret: config.secret })

const jwtVerify = function (ctx, next) {
    try {
        const token = ctx.request.header.authorization
        if(token && typeof token === 'string') {
            ctx.jwtData = jwt.verify(token.slice(7), config.secret)
        } else {
            throw {
                code: 401,
                message: 'no authorization'
            }
        }
    } catch(err) {
        throw {
            code: 401,
            message: err.message
        }
    }
    next()
}

const jwtCreate = function (data, exp) {
    const token = jwt.sign({
        data: data,
        exp:  Math.floor(Date.now() / 1000) + (exp || (60 * 2))
    }, config.secret)
    return token
}

module.exports = {
    jwtCreate,
    jwtVerify,
    jwtMiddleware
}