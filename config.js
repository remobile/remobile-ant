var rc = require('rc')

module.exports = rc('remobile', {
    host: 'localhost',
    port: process.env.PORT || 3000,
    devPort: process.env.DEV_PORT || 3001,
    db: {
        uri: 'mongodb://localhost/remobile'
    }
})
