// ./server/engine.js - api for engine info
// api_path - /engine

const express = require("express");
const engine = express.Router();
const config = require("../config");
const http_serve = require("./http_serve");

/**
 * simple /about endpoint
 */
engine.get('/about', function(req,res) {
    http_serve.respondTextPlain( 200
        ,`Welcome to ${config.ENGINE_NAME} version ${config.VERSION}`
        ,res ,req
    );
});

module.exports = engine;