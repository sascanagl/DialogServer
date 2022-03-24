// ./server/agents.js - api for agentInfo
// api_path - /:game/agent

const express = require("express");
const agents = express.Router();
const http_serve = require("./http_serve");

/*
 * agentOptions endpoint to GET the collection of agent options in storage.
 * @return JSON: { type: Map<id,text>... }
 */
agents.get('/:game/agent/options', function(req,res) {
    var j = require(appRoot +"/client/"+ req.params.game +"/data/AgentOptions")
    http_serve.respondApplicationJson(200, {
        "agentOptions": j.agentOptions
    }, res, req);
});

module.exports = agents;