'use strict'

const fs = require('fs')

const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js')

const services = {}
for (const index in files) {
    const file = files[index]
    if (file.toLowerCase().endsWith('js')) {
        const service = require(`./${file}`)
        services[`${file.replace(/\.js/, '')}`] = service
    }
}

module.exports = services