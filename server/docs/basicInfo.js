const config = require('../../config');

module.exports = {
    openapi: "3.0.3",
    info: {
        title:config.ENGINE_NAME,
        description: "Dialog Engine Server Mid-tier",
        version: config.VERSION,
        contact: {
            name: "Carl Nagle",
            email: "carl.nagle@cjncreations.com"
        },
    },
};