// ./server/logic.js - api for game data loading
// api_path - /:game

const express = require("express");
const logic = express.Router();
const http_serve = require("./http_serve");

/**
 * Get /logic -- the core logic table
 */
 logic.get('/:game/logic', function(req,res) {
    var j = require("../client/"+ req.params.game +"/data/LogicTable")
    http_serve.respondApplicationJson(200, {
       "logic": j.logic
    }, res, req);
});

/**
 * Get /locations -- the initial game worlds and zones.
 * The client stores current state and any changes to these.
 */
 logic.get('/:game/locations', function(req,res) {
    var j = require("../client/"+ req.params.game +"/data/LocationData")
    http_serve.respondApplicationJson(200, {
        "worldInfo": j.worldInfo,
        "zoneInfo": j.zoneInfo
    }, res, req);
});
module.exports = logic;