// ./server/engine.js - api for engine info
// api_path - /engine

const express = require("express");
const engine = express.Router();
const config = require("../config");
const http_serve = require("./http_serve");
const CoreLogicTable = require("./dialog/data/__CoreLogicTable");
const LocationData = require("./dialog/data/LocationData");

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

/**
 * Get /locations -- the initial game worlds and zones.
 * The client stores current state and any changes to these.
 */
 engine.get('/locations', function(req,res) {
    http_serve.respondApplicationJson(200, {
        "worldInfo": LocationData.worldInfo,
        "zoneInfo": LocationData.zoneInfo
    }, res, req);
});
module.exports = engine;