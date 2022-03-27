// ./server/engine.js - api for engine info
// api_path - /engine

const express = require("express");
const fs = require("fs");
const engine = express.Router();
const config = require(appRoot +"/config");
const http_serve = require("./http_serve");

/**
 * simple /about endpoint
 */
engine.get('/about', function(req,res) {
    http_serve.respondTextPlain( 200
        ,`Welcome to ${config.ENGINE_NAME} version ${config.VERSION}`
        ,res ,req
    );
});

/**
 * provide a list with links to the available game instances
 */
engine.get('/instances', function(req,res) {
    let rootClient = appRoot +"/client";
    //console.log("client dir: "+ rootClient);
    let clients = []; // names of instance directories
    let fsDirents = new Set();
    let fsDir = fs.opendirSync(rootClient);
    if (fsDir != null){
        //console.log("fsDir.path: "+ fsDir.path)
        let fsDirent = fsDir.readSync();
        while (fsDirent != null){
            //console.log("fsDirent.name: "+ fsDirent.name)
            fsDirents.add(fsDirent);
            fsDirent = fsDir.readSync()
        }
        fsDir.closeSync;
    }
    for (let entry of fsDirents){
        //console.log("entry type: "+ typeof entry)
        if (entry.isDirectory()){
            let subDir = fs.opendirSync(rootClient + "/"+ entry.name);
            let nextEntry = subDir.readSync();
            while(nextEntry != null){
                if (nextEntry.name = "data"){
                    clients.push(entry.name);
                    break;
                }
                nextEntry = subDir.readSync();
            }
            subDir.closeSync();
        }
    }
    let jsonObj = [];
    for (let entry of clients) {
        let linkurl = "";
        for(domain in req.subdomains){
            linkurl += domain +".";
        }
        client = {
            name: entry,
            link: req.protocol + "://" + linkurl + req.hostname + ":" + config.HTTPS_PORT + "/" + entry
        };
        jsonObj.push(client);
    }
    http_serve.respondApplicationJson( 200
        ,{ instances: jsonObj }
        ,res ,req
    );
});

module.exports = engine;