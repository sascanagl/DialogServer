// ./server/randomMessages.js - api for random messages
// api_path - /engine/randomMessages

const express = require("express");
const randomMessages = express.Router();
const config = require("../config");
const RandomMessageMap = require("./dialog/RandomMessageMap");

/*
 * randomMessages endpoint to GET the collection of message keys in storage.
 * @return JSON: { "count": N, "keys": [strings...] }
 */
randomMessages.get('/randomMessages', function(req,res) {
    var json = JSON.stringify(RandomMessageMap.getRandomMessageKeys());
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(json),
        'Content-Type' : 'application/json' 
    })
    .end(json);
});

/**
 * randomMessages endpoint to GET (POST) the processed message for the provided message id and gameState. \
 * We have to use POST to GET this message because GET with BODY is not supported.
 * @param key - id of the message template to be processed.
 * @body JSON: gameState data to use on the template.
 * @return JSON: { "key": string, "message": string }
 */
randomMessages.post('/randomMessage/:key', function(req,res) {
    var key = req.params.key || "";
    console.log("Body:\n");
    console.log(req.body);
    if(key.length == 0){
        res.writeHead(400, {
            'Content-Type' : 'application/json' 
        }).end( JSON.stringify({
            message: "RandomMessage cannot be found",
            internal_code: "Invalid key"
        }));
    }
    if(req.body){
        var gameState = req.body;
        var json = JSON.stringify(new RandomMessageMap().getRandomMessage(key, gameState));
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(json),
            'Content-Type' : 'application/json' 
        }).end(json);
    }else{
        res.writeHead(400, {
            'Content-Type' : 'application/json' 
        }).end( JSON.stringify({
            message: "RandomMessage cannot be processed",
            internal_code: "Invalid gameState body"
        }));
    }
});

/*
 * randomMessages endpoint to GET all the available messages for a provided key.
 * @param key - word mapped to synonyms.
 * @return JSON: { "key": string, count: N, "messages": [string...] }
 */
randomMessages.get('/randomMessages/:key', function(req,res) {
    var key = req.params.key || "";
    if(key.length == 0){
        res.sendStatus(400, {
            'Content-Type' : 'application/json' 
        }).end( JSON.stringify({
            message: "RandomMessages cannot be found",
            internal_code: "Invalid key"
        }));
    }
    var json = JSON.stringify(new RandomMessageMap().getRandomMessageList(key));
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(json),
        'Content-Type' : 'application/json' 
    }).end(json);
});

module.exports = randomMessages;