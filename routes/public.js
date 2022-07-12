'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()
router.prefix('/api')

/**
 * 用户相关
 */
router.post('/register', controllers.user.register)
router.post('/login', controllers.user.login)

module.exports = router