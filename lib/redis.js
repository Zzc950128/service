'use strict'

const redis = require('redis')
const config = require('../config')

const redisClient = redis.createClient(config.redis.port, config.redis.host)

redisClient.connect();

redisClient.on('error', function() {
    console.log(`${url} Failed to connect to redis`)
})  

/**
 * redis get
 * @param {string} key 键
 */
const getRedis = function(key) {
    const redisPromise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }

            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (jsonErr) {
                resolve(val)
            }
        })
    })
    return redisPromise
}

/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位 s
 */
const setRedis = function(key, val, timeout) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

module.exports = {
    getRedis,
    setRedis
}