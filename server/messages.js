// ./server/messages.js - api for messages
// api_path - /engine/messages

const express = require("express");
const messages = express.Router();
const MessageMap = require("./dialog/MessageMap");
const AWS_Polly = require("./dialog/AWS_Polly");
const http_serve = require("./http_serve");

/*
 * messages endpoint to GET the collection of message keys in storage.
 * @return JSON: { "count": N, "keys": [strings...] }
 */
messages.get('/messages', function(req,res) {
    http_serve.respondApplicationJson( 200,
        MessageMap.getMessageKeys(), res, req
    );
});

/*
 * Messages endpoint to GET (POST) the processed message for the provided message id and gameState. \
 * We have to use POST to GET this message because GET with BODY is not supported.
 * @param key - path param id of the message template to be processed.
 * @param voice - optional query param name of the AWS Polly voice for TTS.
 * @body JSON: gameState data to use on the template.
 * @return JSON Object, One of:
 * { "key": string, "message": string }
 * { "key": string, "message": string, speechUrl: string }
 * { "key": string, "message": string, speechError: string }
 */
messages.post('/message/:key', function(req,res) {
    var key = req.params.key ?? "";
    if(key.length == 0){
        http_serve.respondApplicationJson( 400, {
            message: "Message cannot be found",
            internal_code: "Invalid Messages Key"
        }, res, req);
        return;
    }
    if(req.body){
        var gameState = req.body;
        // TODO: need to handle the case where the key is invalid!
        var jsonObj = new MessageMap().getMessage(key, gameState);
        var voice;
        if(req.query.voice && req.query.voice.length > 0){
            try{
                voice = AWS_Polly.getVoice(req.query.voice);
            }catch(err){
                jsonObj.speechError = err.message; // continue despite speechError
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

module.exports = messages;