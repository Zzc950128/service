'use strict'

const test = {}

test.test = async (ctx, next) => {
    // const userinfo = {
    //     userName: ctx.jwtData.data.slice(12)
    // }
    ctx.result = {
        message: "success"
        // userInfo: userinfo,
    }
    return next()
}

module.exports = test