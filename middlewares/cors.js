'use strict'

const corsHandler = {
    origin: function (ctx) {
        if (ctx.url === '/Admin') {
            return false;
        }
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate','Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}

module.exports = {
    corsHandler
}