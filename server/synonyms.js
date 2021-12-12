// ./server/synonyms.js - api for synonyms
// api_path - /engine/synonyms

const express = require("express");
const synonyms = express.Router();
const config = require("../config");
const SynonymMap = require("./dialog/SynonymMap");

/*
 * synonyms endpoint to GET the collection of synonym keys in storage.
 * @return JSON: { "count": N, "keys": [strings...] }
 */
synonyms.get('/synonyms', function(req,res) {
    var json = JSON.stringify(SynonymMap.getSynonymKeys());
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(json),
        'Content-Type' : 'application/json' })
        .end(json);
});

/*
 * Synonym endpoint to GET a random synonym for a provided synonym key.
 * Synonyms storage is also used to store 1st, 2nd, and 3rd person pronouns.
 * @param key - can be a simple word to get a synonym for.  The key can also have 3 forms 
 * of prefix: 
 * key - get me a synonym if there is one.
 * uc:key - get me a synonym and up-case the first character.
 * n:key - the list is like a list of pronouns, get the nth pronoun.
 * uc:n:key - up-case the nth item in the list and return it.
 * @return JSON: { "key": string, "synonym": string }
 */
synonyms.get('/synonym/:key', function(req,res) {
    var key = req.params.key || "";
    if(key.length == 0){
        res.sendStatus(400);
        return res.send( JSON.stringify({
            message: "Synonym cannot be found",
            internal_code: "Invalid key"
        }));
    }
    var json = JSON.stringify(SynonymMap.getSynonym(key));
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(json),
        'Content-Type' : 'application/json' })
        .end(json);
});

/*
 * Synonym endpoint to GET all synonyms/pronouns for a provided key.
 * @param key - word mapped to synonyms.
 * @return JSON: { "key": string, count: N, "synonyms": [string...] }
 */
synonyms.get('/synonyms/:key', function(req,res) {
    var key = req.params.key || "";
    if(key.length == 0){
        res.sendStatus(400);
        return res.send( JSON.stringify({
            message: "Synonyms cannot be found",
            internal_code: "Invalid key"
        }));
    }
    var json = JSON.stringify(SynonymMap.getSynonymsList(key));
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(json),
        'Content-Type' : 'application/json' })
        .end(json);
});

module.exports = synonyms;