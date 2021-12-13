// ./server/engine.js - api for engine info
// api_path - /engine

const express = require("express");
const engine = express.Router();
const config = require("../config");

/**
 * simple /about endpoint
 */
engine.get('/about', function(req,res) {
    var msg = `Welcome to ${config.ENGINE_NAME} version ${config.VERSION}`;
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(msg),
        'Content-Type' : 'text/plain' })
        .end(msg);
});

module.exports = engine;