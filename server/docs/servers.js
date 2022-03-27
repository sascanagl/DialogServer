const config = require(appRoot +`/config`);

module.exports = {
    servers: [
        {
            url: `https://localhost:${config.HTTPS_PORT}`,
            description: "Local Dev Server",
        }
    ],
};