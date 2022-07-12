'use strict'

const fs = require('fs')
const path = require('path')
const log4js = require('log4js')
const config = require('../config')

const logsDir = path.parse(config.logPath).dir

// 日志目录判断
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

// log4js 配置
log4js.configure({
    appenders: {
        console: { type: 'console' },
        dateFile: {
            type: 'dateFile',
            filename: config.logPath,
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
    },
    categories: {
        default: {
            appenders: ['console', 'dateFile'],
            level: 'info'
        }
    }
})

const logger = log4js.getLogger(['default'])

// logger中间件
const loggerMiddleware = async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips || (ctx.socket && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress)))
    let logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`
    logger.info(logText)
}

module.exports = {
    logger,
    loggerMiddleware
}