
const SynonymMap = require("./SynonymMap")
const MessageMap = require("./MessageMap")
const RandomMessageMap = require("./RandomMessageMap")
const ChainedMessageMap = require("./ChainedMessageMap")

const synonymMaps = new Map();
const messageMaps = new Map();
const randomMessageMaps = new Map();
const chainedMessageMaps = new Map();


/*
 * Get/Load SynonymData for a particular game
*/
exports.GetSynonymsMap = (game) => {
    var lcgame = game.toLowerCase();
    var map = synonymMaps.get(lcgame);
    if(map === undefined) {
        try{
            var data = require(appRoot +"/client/"+ lcgame +"/data/SynonymsData");
            map = new SynonymMap({
                context: game,
                synonyms: data.synonyms
            });
            synonymMaps.set(lcgame, map);
        }catch(error){
            console.error(error);
        }
    }
    return map;
};

/*
 * Get/Load MessageData for a particular game
*/
exports.GetMessagesMap = (game) => {
    var lcgame = game.toLowerCase();
    var map = messageMaps.get(lcgame);
    if(map === undefined) {
        try{
            var data = require(appRoot +"/client/"+ lcgame +"/data/MessageData");
            map = new MessageMap({
                context: game,
                messages: data.messages,
            });
            messageMaps.set(lcgame, map);
        }catch(error){
            console.error(error);
        }
    }
    return map;
};

/*
 * Get/Load RandomMessageData for a particular game
*/
exports.GetRandomMessagesMap = (game) => {
    var lcgame = game.toLowerCase();
    var map = randomMessageMaps.get(lcgame);
    if(map === undefined) {
        try{
            var data = require(appRoot +"/client/"+ lcgame +"/data/RandomMessageData");
            map = new RandomMessageMap({
                context: game,
                messages: data.messages,
            });
            randomMessageMaps.set(lcgame, map);
        }catch(error){
            console.error(error);
        }
    }
    return map;
};

/*
 * Get/Load ChainedMessageData for a particular game
*/
exports.GetChainedMessagesMap = (game) => {
    var lcgame = game.toLowerCase();
    var map = chainedMessageMaps.get(lcgame);
    if(map === undefined) {
        try{
            var data = require(appRoot +"/client/"+ lcgame +"/data/ChainedMessageData");
            map = new ChainedMessageMap({
                context: game,
                chains: data.chains,
            });
            chainedMessageMaps.set(lcgame, map);
        }catch(error){
            console.error(error);
        }
    }
    return map;
};
