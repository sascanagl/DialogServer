// ./server/server.js

const config = require("../config");

const http = require("http"), https= require("https"), express = require("express");
const logger = require("./logger");
const cors = require("cors");
const swagger = require("swagger-ui-express");
const docs = require("./docs/basicInfo.js");
const engine = require("./engine");

// instance the node server (Express)
const app = express();

// tell the server to use our output file stream for logging
app.use(logger);

/**
 * Route /engine/ REST Api calls to the engine Router
 */
app.use(config.API_ROOT, engine);
app.use(`${config.API_ROOT}/api`, swagger.serve, swagger.setup(docs));

/**
 * HTTPS Server Setup and Config
 */
https.createServer(config.HTTPS_OPTIONS, app).listen(config.HTTPS_PORT, () =>{
    console.log(config.API_NAME +` listening securely on port ${config.HTTPS_PORT}`);
});