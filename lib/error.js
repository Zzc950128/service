'use strict'

class CodeError extends Error {
    constructor (message = '未知错误', code = -1) {
        super(message)
        this.code = code
    }
}

/**
 * 拒绝访问构造函数
 */
class ForbiddenError extends CodeError {
    constructor (message = '拒绝访问') {
        super(message, 403)
    }
}

/**
 * 无效的参数构造函数
 */
class InvalidQueryError extends CodeError {
    constructor (message = '无效的参数') {
        super(message, 400)
    }
}

module.exports = {
    CodeError,
    ForbiddenError,
    InvalidQueryError
}