// ./server/server.js

const config = require("../config");

const http = require("http"), https= require("https"), express = require("express");
const logger = require("./logger");
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs/index');

const engine = require("./engine");
const synonyms = require("./synonyms");

// instance the node server (Express)
const app = express();

// tell the server to use our output file stream for logging
app.use(logger);

/**
 * Route /engine/ REST Api calls to the engine Router
 */
app.use(synonyms);
app.use('/engine', engine);
app.use('/api', swaggerUI.serve, swaggerUI.setup(docs));

/**
 * HTTPS Server Setup and Config
 */
https.createServer(config.HTTPS_OPTIONS, app).listen(config.HTTPS_PORT, () =>{
    console.log(config.API_NAME +` listening securely on port ${config.HTTPS_PORT}`);
});
