// ./server/server.js

require('dotenv').config();

const path = require('path')
global.appRoot = path.resolve(__dirname, "../");

const config = require(appRoot +"/config");

const http = require("http"), https= require("https"), express = require("express");
const logger = require("./logger");
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs/index');

const engine = require("./engine");
const logic = require("./logic");
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

// Need to put a default landing page for all games here (not yet working)
app.use(express.static(appRoot +'/build'))

/**
 * Route /engine/ REST Api calls to the engine Router
 */
app.use(config.ENGINE_ROOT, engine);
app.use(`${config.ENGINE_ROOT}/api`, swaggerUI.serve, swaggerUI.setup(docs));
app.use(`/`, logic);
app.use(`/`, chainedMessages);
app.use(`/`, randomMessages);
app.use(`/`, messages);
app.use(`/`, synonyms);
app.use(`/`, agents);

// GET on production game builds -- WAS WORKING
app.get('/:game', function (req, res) {
    var game = req.params.game;
    res.sendFile(path.join(appRoot +'/build/', game, 'index.html'))
})

/**
 * HTTPS Server Setup and Config
 */
https.createServer(config.HTTPS_OPTIONS, app).listen(config.HTTPS_PORT, () =>{
    console.log(config.ENGINE_NAME +` listening securely on port ${config.HTTPS_PORT}`);
});
