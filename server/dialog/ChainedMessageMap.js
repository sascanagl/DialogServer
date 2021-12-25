const SynonymMap       = require("./SynonymMap");
const MarkedMessage    = require("./MarkedMessage");
const MessageMap       = require("./MessageMap");
const RandomMessageMap = require("./RandomMessageMap");

const {chains} = require("./data/ChainedMessageData");

// Map value prefixes for the chained messages template
const sS = "$s{"; // id for Synonyms item. Use $s{uc:id}, $s{n:id}, and $s{uc:n:id} as needed.
const mS = "$m{"; // id for Messages item
const rS = "$r{"; // id for RandomMessage item
const cS = "$c{"; // id for ChainedMessage item

class ChainedMessageMap{

    constructor(){
        this.replaceSynonyms = this.replaceSynonyms.bind(this);
        this.replaceMessages = this.replaceMessages.bind(this);
        this.replaceRandomMessages = this.replaceRandomMessages.bind(this);
        this.getChainedMessages = this.getChainedMessages.bind(this);
        this.synonymMap = new SynonymMap();
        this.messageMap = new MessageMap({synMap: this.synonymMap});
        this.randomMap = new RandomMessageMap({msgMap: this.messageMap});
    }

    static log(msg){ /* console.log("ChainedMessageMap: "+ msg); */ }

    // called internally only
    replaceSynonyms( message){
        let val = {};
        let mMsg = new MarkedMessage(message, 0, sS);
        while(mMsg.hasMark && mMsg.hasKey()){
            val = this.synonymMap.getSynonym(mMsg.key.toLowerCase()); // get a synonym { key: , synonym: }
            mMsg.replaceMark(val.synonym);
        }
        return mMsg.message;
    }

    // called internally only
    replaceMessages( message, gameState){
        let val = {};
        let mMsg = new MarkedMessage(message, 0, mS);
        while(mMsg.hasMark && mMsg.hasKey()){
            val = this.messageMap.getMessage(mMsg.key, gameState);  // { key: , message: }
            mMsg.replaceMark(val.message);
        }
        return mMsg.message;
    }

    // called internally only
    /**
     * @param message String: message template
     * @param gameState - JSON: gameState containing data to insert into templates.
     * @return String: processed message
     */
    replaceRandomMessages( message, gameState){
        let val = null;
        let mMsg = new MarkedMessage(message, 0, rS);
        while(mMsg.hasMark && mMsg.hasKey()){
            val = this.randomMap.getRandomMessage(mMsg.key, gameState);
            mMsg.replaceMark(val);
        }
        return mMsg.message;
    }

    // this is who we call externally
    /**
     * Process a chained message template for synonyms, messages, and random messages.
     * @param msgKey - string - key of message chain to process.
     * @param gameState - JSON: gameState containing data to insert into templates.
     * @param linefeeds - boolean: true/false to add linefeeds between stages of processing.
     * @return JSON: Object with key: and message:
     */
    getChainedMessages(msgKey, gameState, linefeeds){
        let phrase = chains.get(msgKey);
        //console.log("insert linefeeds = "+ linefeeds);
        if(phrase != null && phrase.length > 0){
            phrase = this.replaceSynonyms(phrase);
            if(linefeeds && phrase != null) phrase += "\n";  // might check to add \n ONLY if length changed!
            phrase = this.replaceMessages(phrase, gameState);
            if(linefeeds && phrase != null) phrase += "\n";  // might check to add \n ONLY if length changed!
            phrase = this.replaceRandomMessages(phrase, gameState);
            if(linefeeds && phrase != null) phrase += "\n";  // might check to add \n ONLY if length changed!
        }else{
            phrase = "Hmm...";
        }
        return {
            key: msgKey,
            message: phrase
        }
}

    /**
     * @return JSON: object containing count of keys and key names.
     */
    static getChainedMessageKeys(){
      return {
          count: chains.size,
          keys: Array.from(chains.keys())
      }
    }
}
module.exports = ChainedMessageMap;
