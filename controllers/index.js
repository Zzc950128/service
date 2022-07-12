'use strict'

const fs = require('fs')

const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js')

const controllers = {}
for (const index in files) {
    const file = files[index]
    if (file.toLowerCase().endsWith('js')) {
        const controller = require(`./${file}`)
        controllers[`${file.replace(/\.js/, '')}`] = controller
    }
}

module.exports = controllers