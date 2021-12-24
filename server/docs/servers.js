const config = require(`../../config`);

module.exports = {
    servers: [
        {
            url: `https://localhost:${config.HTTPS_PORT}${config.ENGINE_ROOT}`,
            description: "Local Dev Server",
        }
    ],
};