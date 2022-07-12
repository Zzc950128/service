'use strict'

const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const staticCache = require('koa-static-cache')
const cors = require('koa2-cors')
const helmet = require("koa-helmet")
// const session = require('koa-generic-session')

const config = require('./config')
const publicRouter = require('./routes/public')
const privateRouter = require('./routes/private')
// const { sessionConfig } = require('./middlewares/session')
const { loggerMiddleware } = require('./middlewares/logger')
const { errorHandle, responseHandle } = require('./middlewares/response')
const { corsHandler } = require('./middlewares/cors')

const app = new koa()

app.use(loggerMiddleware)

app.use(errorHandle)

// Global Middlewares
// app.keys = config.sessionKeys
// app.use(session(sessionConfig))
app.use(bodyParser())
app.use(staticCache(config.publicDir))

app.use(helmet())

app.use(cors(corsHandler));

// Routers
app.use(publicRouter.routes(), publicRouter.allowedMethods())
app.use(privateRouter.routes(), privateRouter.allowedMethods())

// Response
app.use(responseHandle)

module.exports = app


