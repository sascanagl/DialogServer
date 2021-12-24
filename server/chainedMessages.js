// ./server/chainedMessages.js - api for chained messages
// api_path - /engine/chainedMessages

const express = require("express");
const chainedMessages = express.Router();
const ChainedMessageMap = require("./dialog/ChainedMessageMap");
const AWS_Polly = require("./dialog/AWS_Polly");
const http_serve = require("./http_serve");

/*
 * chainedmessages endpoint to GET the collection of message keys in storage.
 * @return JSON: { "count": N, "keys": [strings...] }
 */
chainedMessages.get('/chainedMessages', function(req,res) {
    http_serve.respondApplicationJson( 200, 
        ChainedMessageMap.getChainedMessageKeys(), res, req);
});

/*
 * chainedMessages endpoint to GET (POST) the processed message for the provided message id and gameState. \
 * We have to use POST to GET this message because GET with BODY is not supported.
 * @param key - path param id of the message template to be processed.
 * @param newlines - optional query param true/false to inject newlines between messages.
 * @param voice - optional query param name of the AWS Polly voice for TTS.
 * @body JSON: gameState data to use on the template.
 * @return JSON Object, One of:
 * { "key": string, "message": string }
 * { "key": string, "message": string, speechUrl: string }
 * { "key": string, "message": string, speechError: string }
 */
chainedMessages.post('/chainedMessage/:key', function(req,res) {
    var key = req.params.key ?? "";
    var linefeeds = false;
    if(req.query.newlines){
        linefeeds = (req.query.newlines === "false") ? false : true;
    }
    if(key.length == 0){
        http_serve.respondApplicationJson( 400, {
            message: "ChainedMessage cannot be found",
            internal_code: "Invalid ChainedMessages Key"
        }, res, req);
        return;
    }
    if(req.body){
        var gameState = req.body;
        // invalid key will get us a "Hmmm..." response
        var jsonObj = new ChainedMessageMap().getChainedMessages(key, gameState, linefeeds);
        var voice;
        if(req.query.voice && req.query.voice.length > 0){
            try{
                voice = AWS_Polly.getVoice(req.query.voice);
            }catch(err){
                jsonObj.speechError = err.message; // continue despite error
            }
        }
        if (voice && jsonObj.message && jsonObj.message.length > 0){
            voice.addSpeechUrlResponse(jsonObj, res, req); // done. response sent
        }else{
            http_serve.respondApplicationJson( 200, jsonObj, res, req);
        }
    }else{
        http_serve.respondApplicationJson( 400, {
            message: "Message cannot be processed",
            internal_code: "Invalid GameState Body"
        }, res, req);
    }
});

module.exports = chainedMessages;