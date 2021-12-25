// ./server/agents.js - api for agentInfo
// api_path - /engine/agents

const express = require("express");
const agents = express.Router();
const {agentOptions} = require("./dialog/data/AgentOptions");
const http_serve = require("./http_serve");

/*
 * agentOptions endpoint to GET the collection of synonym keys in storage.
 * @return JSON: { type: Map<id,text>... }
 */
agents.get('/agent/options', function(req,res) {
    http_serve.respondApplicationJson(200, agentOptions, res, req);
});

module.exports = agents;