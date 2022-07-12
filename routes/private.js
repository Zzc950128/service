'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
const { jwtMiddleware, jwtVerify } = require('../middlewares/jwt')
// const { sessionVerify } = require('../middlewares/session')

const router = new Router()

router.prefix('/api')

// router.use(sessionVerify)
router.use(jwtMiddleware)
router.use(jwtVerify)

router.get('/test', controllers.test.test)

module.exports = router