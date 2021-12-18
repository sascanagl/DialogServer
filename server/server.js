// ./server/server.js

const config = require("../config");

const http = require("http"), https= require("https"), express = require("express");
const logger = require("./logger");
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs/index');

const engine = require("./engine");
const randomMessages = require("./randomMessages");
const messages = require("./messages");
const synonyms = require("./synonyms");

// instance the node server (Express)
const app = express();

// tell the server to use our output file stream for logging
app.use(logger);

app.use(express.json());
app.use(express.text());
//app.use(express.static());  //requires option for root-path
app.use(express.urlencoded({ extended: true }));

/**
 * Route /engine/ REST Api calls to the engine Router
 */
app.use(config.ENGINE_ROOT, engine);
app.use(`${config.ENGINE_ROOT}/api`, swaggerUI.serve, swaggerUI.setup(docs));
app.use(config.ENGINE_ROOT, randomMessages);
app.use(config.ENGINE_ROOT, messages);
app.use(config.ENGINE_ROOT, synonyms);

/**
 * HTTPS Server Setup and Config
 */
https.createServer(config.HTTPS_OPTIONS, app).listen(config.HTTPS_PORT, () =>{
    console.log(config.ENGINE_NAME +` listening securely on port ${config.HTTPS_PORT}`);
});
