// ./server/messages.js - api for messages
// api_path - /engine/messages

const express = require("express");
const messages = express.Router();
const MessageMap = require("./dialog/MessageMap");
const AWS_Polly = require("./dialog/AWS_Polly");
const http_serve = require("./http_serve");
const Store = require("./dialog/Store")

/*
 * messages endpoint to GET the collection of message keys in storage.
 * @return JSON: { "count": N, "keys": [strings...] }
 */
messages.get('/:game/messages', function(req,res) {
    var game = req.params.game || "";
    if(game.length == 0){
        http_serve.respondApplicationJson(400, {
                message: "Invalid Get Messages url",
                internal_code: "Invalid Messages url"
            }, res, req);
        return;
    }
    var map = Store.GetMessagesMap(game);
    if(map===undefined){
        http_serve.respondApplicationJson( 400, {
            message: "Invalid Get Messages url for "+ game,
            internal_code: "Invalid MessageMap url"
        }, res, req);
        return;
    }
    http_serve.respondApplicationJson( 200, map.getMessageKeys(), res, req );
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
messages.post('/:game/message/:key', function(req,res) {
    var key = req.params.key ?? "";
    var game = req.params.game ?? "";
    if(key.length == 0 || game.length ==0){
        http_serve.respondApplicationJson( 400, {
            message: "Message cannot be found for game key",
            internal_code: "Invalid Messages Game Key"
        }, res, req);
        return;
    }
    var map = Store.GetMessagesMap(game);
    if(map===undefined){
        http_serve.respondApplicationJson( 400, {
            message: "Invalid Get Messages url for "+ game,
            internal_code: "Invalid Messages url"
        }, res, req);
        return;
    }
    if(req.body){
        var gameState = req.body;
        // TODO: need to handle the case where the key is invalid!
        var jsonObj = map.getMessage(key, gameState);
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