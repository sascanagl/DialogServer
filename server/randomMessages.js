// ./server/randomMessages.js - api for random messages
// api_path - /engine/randomMessages

const express = require("express");
const randomMessages = express.Router();
const RandomMessageMap = require("./dialog/RandomMessageMap");
const AWS_Polly = require("./dialog/AWS_Polly");
const http_serve = require("./http_serve");

/*
 * randomMessages endpoint to GET the collection of message keys in storage.
 * @return JSON: { "count": N, "keys": [strings...] }
 */
randomMessages.get('/randomMessages', function(req,res) {
    http_serve.respondApplicationJson( 200,
        RandomMessageMap.getRandomMessageKeys(),
        res, req);
});

/*
 * randomMessages endpoint to GET (POST) the processed message for the provided message id and gameState. \
 * We have to use POST to GET this message because GET with BODY is not supported.
 * @param key - path param id of the set of messages to be processed.
 * @param voice - optional query param name of the AWS Polly voice for TTS.
 * @body JSON: gameState data to use on the final message template.
 * @return JSON Object, One of:
 * { "key": string, "message": string }
 * { "key": string, "message": string, speechUrl: string }
 * { "key": string, "message": string, speechError: string }
 */
randomMessages.post('/randomMessage/:key', function(req,res) {
    var key = req.params.key ?? "";
    if(key.length == 0){
        http_serve.respondApplicationJson( 400, {
            message: "RandomMessage cannot be found",
            internal_code: "Invalid RandomMessages Key"
        }, res, req);
        return;
    }
    if(req.body){
        var gameState = req.body;
        var jsonObj = new RandomMessageMap().getRandomMessage(key, gameState);
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
            message: "RandomMessage cannot be processed",
            internal_code: "Invalid GameState Body"
        }, res, req);
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
        http_serve.respondApplicationJson( 400, {
            message: "RandomMessages cannot be found",
            internal_code: "Invalid RandomMessages Key"
        }, res, req);
        return;
    }
    http_serve.respondApplicationJson( 200, 
        new RandomMessageMap().getRandomMessageList(key),
        res, req);
});

module.exports = randomMessages;