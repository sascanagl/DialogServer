// ./server/server.js

require('dotenv').config();

const config = require("../config");

const http = require("http"), https= require("https"), express = require("express");
const path = require('path')
const logger = require("./logger");
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs/index');

const engine = require("./engine");
const chainedMessages = require("./chainedMessages");
const randomMessages = require("./randomMessages");
const messages = require("./messages");
const synonyms = require("./synonyms");
const agents = require("./agents");

// instance the node server (Express)
const app = express();

// tell the server to use our output file stream for logging
app.use(logger);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../build')))

/**
 * Route /engine/ REST Api calls to the engine Router
 */
app.use(config.ENGINE_ROOT, engine);
app.use(`${config.ENGINE_ROOT}/api`, swaggerUI.serve, swaggerUI.setup(docs));
app.use(config.ENGINE_ROOT, chainedMessages);
app.use(config.ENGINE_ROOT, randomMessages);
app.use(config.ENGINE_ROOT, messages);
app.use(config.ENGINE_ROOT, synonyms);
app.use(config.ENGINE_ROOT, agents);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

/**
 * HTTPS Server Setup and Config
 */
https.createServer(config.HTTPS_OPTIONS, app).listen(config.HTTPS_PORT, () =>{
    console.log(config.ENGINE_NAME +` listening securely on port ${config.HTTPS_PORT}`);
});
