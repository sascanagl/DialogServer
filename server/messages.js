// ./server/messages.js - api for messages
// api_path - /engine/messages

const express = require("express");
const messages = express.Router();
const config = require("../config");
const MessageMap = require("./dialog/MessageMap");

/*
 * messages endpoint to GET the collection of message keys in storage.
 * @return JSON: { "count": N, "keys": [strings...] }
 */
messages.get('/messages', function(req,res) {
    var json = JSON.stringify(MessageMap.getMessageKeys());
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(json),
        'Content-Type' : 'application/json' 
    })
    .end(json);
});

/**
 * Messages endpoint to GET (POST) the processed message for the provided message id and gameState. \
 * We have to use POST to GET this message because GET with BODY is not supported.
 * @param key - id of the message template to be processed.
 * @body JSON: gameState data to use on the template.
 * @return JSON: { "key": string, "message": string }
 */
messages.post('/message/:key', function(req,res) {
    var key = req.params.key || "";
    console.log("Body:\n");
    console.log(req.body);
    if(key.length == 0){
        res.writeHead(400, {
            'Content-Type' : 'application/json' 
        }).end( JSON.stringify({
            message: "Message cannot be found",
            internal_code: "Invalid key"
        }));
    }
    if(req.body){
        var gameState = req.body;
        var json = JSON.stringify(new MessageMap().getMessage(key, gameState));
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(json),
            'Content-Type' : 'application/json' 
        }).end(json);        
    }else{
        res.writeHead(400, {
            'Content-Type' : 'application/json' 
        }).end( JSON.stringify({
            message: "Message cannot be processed",
            internal_code: "Invalid gameState body"
        }));
    }
});

module.exports = messages;