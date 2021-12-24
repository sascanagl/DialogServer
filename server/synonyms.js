// ./server/synonyms.js - api for synonyms
// api_path - /engine/synonyms

const express = require("express");
const synonyms = express.Router();
const SynonymMap = require("./dialog/SynonymMap");
const AWS_Polly = require("./dialog/AWS_Polly");
const http_serve = require("./http_serve");

/*
 * synonyms endpoint to GET the collection of synonym keys in storage.
 * @return JSON: { "count": N, "keys": [strings...] }
 */
synonyms.get('/synonyms', function(req,res) {
    var jsonObj = SynonymMap.getSynonymKeys();
    http_serve.respondApplicationJson(200, jsonObj, res, req);
});

/*
 * Synonym endpoint to GET a random synonym for a provided synonym key.
 * Synonyms storage is also used to store 1st, 2nd, and 3rd person pronouns.
 * @param key - path param a simple word to get a synonym for.  The key can also have 3 forms 
 * of prefix:
 * key - get me a synonym if there is one.
 * uc:key - get me a synonym and up-case the first character.
 * n:key - the list is like a list of pronouns, get the nth pronoun.
 * uc:n:key - up-case the nth item in the list and return it.
 * @param voice - optional query param name of the AWS Polly voice for TTS.
 * @return JSON Object, One of:
 * { "key": string, "synonym": string }
 * { "key": string, "synonym": string, speechUrl: string }
 * { "key": string, "synonym": string, speechError: string }
 */
synonyms.get('/synonym/:key', function(req,res) {
    var key = req.params.key || "";
    if(key.length == 0){
        http_serve.respondApplicationJson(400, {
                message: "Synonym cannot be found",
                internal_code: "Invalid Synonyms Key"
            }, res, req);
        return;
    }
    var jsonObj = new SynonymMap().getSynonym(key);  // can be key unchanged
    var voice;
    if(req.query.voice && req.query.voice.length > 0){
        try{
            voice = AWS_Polly.getVoice(req.query.voice);
        }catch(err){
            jsonObj.speechError = err.message; // continue despite speechError
        }
    }
    if (voice && jsonObj.synonym && jsonObj.synonym.length > 0){
        voice.addSpeechUrlResponse(jsonObj, res, req); // done. response sent
    }else{
        http_serve.respondApplicationJson(200, jsonObj, res, req);
    }
});

/*
 * Synonym endpoint to GET all synonyms/pronouns for a provided key.
 * @param key - path param key mapped to synonyms.
 * @param voice - optional query param name of the AWS Polly voice for TTS.
 * @return JSON Object, One of:
 * { "key": string, count: N, "synonyms": [string...] }
 * { "key": string, count: N, "synonyms": [string...], speechUrl: string }
 * { "key": string, count: N, "synonyms": [string...], speechError: string }
  */
synonyms.get('/synonyms/:key', function(req,res) {
    var key = req.params.key || "";
    if(key.length == 0){
        http_serve.respondApplicationJson( 400, {
            message: "Synonyms cannot be found",
            internal_code: "Invalid Synonyms Key"
        }, res, req);
        return;
    }
    var jsonObj = new SynonymMap().getSynonymsList(key);
    var voice;
    if(req.query.voice && req.query.voice.length > 0){
        try{
            voice = AWS_Polly.getVoice(req.query.voice);
        }catch(err){
            jsonObj.speechError = err.message; // continue despite speechError
        }
    }
    if (voice && jsonObj.synonyms && jsonObj.synonyms.length > 0){
        voice.addSpeechUrlResponse(jsonObj, res, req); // done. response sent
    }else{
        http_serve.respondApplicationJson( 200, jsonObj, res, req);
    }
});

module.exports = synonyms;