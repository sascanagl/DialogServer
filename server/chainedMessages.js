// ./server/chainedMessages.js - api for chained messages
// api_path - /engine/chainedMessages

//const config = require("../config");
const express = require("express");
const chainedMessages = express.Router();
const ChainedMessageMap = require("./dialog/ChainedMessageMap");
const AWS_Polly = require("./dialog/AWS_Polly");

/*
 * chainedmessages endpoint to GET the collection of message keys in storage.
 * @return JSON: { "count": N, "keys": [strings...] }
 */
chainedMessages.get('/chainedMessages', function(req,res) {
    var json = JSON.stringify(ChainedMessageMap.getChainedMessageKeys());
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(json),
        'Content-Type' : 'application/json'
    })
    .end(json);
});

/**
 * chainedMessages endpoint to GET (POST) the processed message for the provided message id and gameState. \
 * We have to use POST to GET this message because GET with BODY is not supported. \
 * This endpoint does NOT insert linefeeds between each chained message.
 * @param key - id of the message template to be processed.
 * @body JSON: gameState data to use on the template.
 * @return JSON: { "key": string, "message": string }
 */
chainedMessages.post('/chainedMessage/:key', function(req,res) {
    var key = req.params.key ?? "";
    var linefeeds = false;
    if(req.query.newlines){
        linefeeds = (req.query.newlines === "false") ? false: true;
    }
    //console.log("GameState:");
    //console.log(req.body);
    if(key.length == 0){
        res.writeHead(400, {
            'Content-Type' : 'application/json'
        }).end( JSON.stringify({
            message: "ChainedMessage cannot be found",
            internal_code: "Invalid key"
        }));
    }
    if(req.body){
        var gameState = req.body;
        var jsonObj = new ChainedMessageMap().getChainedMessages(key, gameState, linefeeds);
        var voice;
        if(req.query.voice && req.query.voice.length > 0){
            try{
                voice = AWS_Polly.getVoice(req.query.voice);
            }catch(err){
                console.log("Error retrieving "+ req.query.voice +": "+ err.message);
                jsonObj.speechError = err.message;
            }
        }
        if (voice && jsonObj.message && jsonObj.message.length > 0){
            voice.addSpeechUrlResponse(jsonObj, res, req);
        }else{
            var json = JSON.stringify(jsonObj);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(json),
                'Content-Type' : 'application/json'
            })
            .end(json);
        }
    }else{
        res.writeHead(400, {
            'Content-Type' : 'application/json'
        })
        .end( JSON.stringify({
            message: "Message cannot be processed",
            internal_code: "Invalid gameState body"
        }));
    }
});

module.exports = chainedMessages;