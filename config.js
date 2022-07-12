'use strict'

const path = require('path')

module.exports = {
    port: '3001',
    secret: 'night_zzc',
    publicDir: path.resolve(__dirname, './public'),
    logPath: path.resolve(__dirname, './logs/koa'),
    sessionKeys: ['night_zzc'],
    mongoDB: {
        database: 'main',
        username: 'root',
        password: 'root',
        host: '127.0.0.1',
        port: 27017
    },
    redis: {
        host: '127.0.0.1',
        port: 6379 
    }
}