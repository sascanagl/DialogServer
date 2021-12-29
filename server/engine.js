// ./server/engine.js - api for engine info
// api_path - /engine

const express = require("express");
const engine = express.Router();
const config = require("../config");
const http_serve = require("./http_serve");
const CoreLogicTable = require("./dialog/data/__CoreLogicTable");

/**
 * simple /about endpoint
 */
engine.get('/about', function(req,res) {
    http_serve.respondTextPlain( 200
        ,`Welcome to ${config.ENGINE_NAME} version ${config.VERSION}`
        ,res ,req
    );
});

/**
 * Get /logic -- the core logic table
 */
 engine.get('/logic', function(req,res) {
    var jsonObj = CoreLogicTable.logic;
    http_serve.respondApplicationJson(200, {
        "logic": jsonObj
    }, res, req);
});

module.exports = engine;