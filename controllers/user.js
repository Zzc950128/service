'use strict'
const { logger } = require('../middlewares/logger')
const userServices = require('../services').user
const { jwtCreate } = require('../middlewares/jwt')
const { InvalidQueryError } = require('../lib/error')

const user = {}

user.login = async (ctx, next) => {
    const { userName, password } = ctx.request.body
    if(!userName || !password) {
        throw new InvalidQueryError('账号名或密码不能为空')
    }
    const user = await userServices.login({
        userName,
        password
    })
    if(!user) {
        ctx.reslut = ''
        ctx.msg = '用户名或者密码不正确'
    } else {
        const userInfo = {
            uid: user.uid,
            name: user.name,
            role: user.role
        }
        userInfo.accessToken = jwtCreate('accessToken:' + user.userName, 60 * 60 * 24)
        // let session = ctx.session
        // ctx.session.userInfo = userInfo
        // ctx.body = ctx.session.userInfo
        ctx.result = userInfo
    }
    return next()
}

user.register = async (ctx, next) => {
    const { userName, password, validateCode } = ctx.request.body
    if(!userName) {
        throw new InvalidQueryError('账号名不符合规范')
    }
    const user = await userServices.login({
        userName
    })
    if(user) {
        ctx.reslut = ''
        ctx.msg = '用户已存在'
        return next()  
    }
    if(!password) {
        throw new InvalidQueryError('密码不符合要求')
    }
    if(!validateCode || validateCode !== '1234') {
        throw new InvalidQueryError('验证码不正确')
    }
    const result = await userServices.register({
        userName,
        password
    })
    if(!result) {
        ctx.reslut = ''
        ctx.msg = '注册失败'
    } else {
        const userInfo = {
            userName: result.userName,
            uid: result.uid,
            name: result.name,
            role: result.role
        }
        ctx.result = userInfo
    }
    return next()
}

module.exports = user