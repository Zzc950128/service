'use strict'
const { logger } = require('../middlewares/logger')
const User = require('../models/index').getModel('user')
const mongo = require('../models/index').mongo

/**
 * 自增加ID
 * @param {*} sequenceName 
 * @returns sequence_value
 */
function getNextSequenceValue(sequenceName) {
    const sequencePromise = new Promise((resolve, reject) => {
        mongo.collections.users.findOneAndUpdate(
            { _id: sequenceName },
            {
                $inc: {
                    sequence_value: 1
                }
            },
            { new: true },
            (err, result) => {
                if(err) {
                    resolve(null)
                }
                resolve(result)
            }
        )
    })
    return sequencePromise
}

const user = {
    /**
     * @Description 登录
     * @date 2002/07/06
     * @param { Object } userData 
     * @returns { Object | null}
     */
    async login (userData) {
        const userInfo = await User.findOne(userData)
        return userInfo
    },

    /**
     * @Description 登录
     * @date 2002/07/06
     * @param { Object } userInfo 
     * @returns { Object | null }
     */
    async register (userInfo) {
        const result = await getNextSequenceValue("userId")
        if(result && result.value && result.value.sequence_value) {
            userInfo.uid = +result.value.sequence_value
        } else {
            return Promise.resolve(null)
        }
        userInfo.name = '用户'
        userInfo.role = 'default'
        const userModel = new User(userInfo);
        const registerPromise = new Promise((resolve, reject) => {
            userModel.save((err, result) => {
                logger.info('userModel', err, result)
                if(err) {
                    resolve()
                }
                resolve(result)
            })
        })
        return registerPromise
    }
}

module.exports = user