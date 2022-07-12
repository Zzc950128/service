const pm2Config = {
    apps: [{
        name: 'service',
        script: './bin/www',

        error_file: './logs/pm2-error.log',
        out_file: './logs/pm2-out.log',
        log_date_format: "YYYY-MM-DD HH:mm",

        // args: '',
        intances: 1,
        autorestart: true,
        watch: true,
        ignore_watch: [
            'node_modules',
            'logs'
        ],
        // max_memory_restart: '1G',
        env_pro: {
            "NODE_ENV": "production",
            "REMOTE_ADDR": ""
        },
        env_dev: {
            "NODE_ENV": "development",
            "REMOTE_ADDR": ""
        },
        env_test: {
            "NODE_ENV": "test",
            "REMOTE_ADDR": ""
        },
    }]
}

module.exports = pm2Config
