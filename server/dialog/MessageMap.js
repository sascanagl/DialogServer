
const MarkedMessage = require("./MarkedMessage");
const Store = require("./Store");

// message item prefixes:
const sS  = "$s{"; // synonym
const pS  = "$p{"; // gameState.player
const lS  = "$l{"; // gameState.location
const nS  = "$n{"; // gameState.location.npc
const xS  = "$x{"; // gameState.loop
const iS  = "$i{"; // item

class MessageMap{

    constructor(props){
        if( !props) props = {};
        this.context= props.context ?? "murder";
        this.messages = props.messages ?? new Map();
        this.replaceSynonyms = this.replaceSynonyms.bind(this);
        this.replaceProperties = this.replaceProperties.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.synonymMap = Store.GetSynonymsMap(this.context);
    }

    static log(msg){  /* console.log(msg); */ }

    // called internally only
    replaceSynonyms( message){
        let val = {};
        let mMsg = new MarkedMessage(message, 0, sS);
        while(mMsg.hasMark && mMsg.hasKey()){
            val = this.synonymMap.getSynonym(mMsg.key); // get a synonym { key:, synonym: }
            mMsg.replaceMark(val.synonym);
        }
        return mMsg.message;
    }

    // called internally only
    replaceProperties( message, obj, sMark ){
        let val = {};
        let mMsg = new MarkedMessage(message, 0, sMark);
        while(mMsg.hasMark && mMsg.hasKey()){
            val = obj[mMsg.key] ?? null; // get the property { property: , value: }
            MessageMap.log("Pval: "+ val);
            mMsg.replaceMark(val.value);
        }
        return mMsg.message;
    }

    /**
     * Process the message template specified by msgKey with the provided gameState data.
     * @param msgKey - id of message template to process.
     * @param gameState - JSON: object containing player and location objects from gameState.
     * @return JSON: object containing the original msgKey and the processed message template.
     * The processed message can be just the msgKey again if it was invalid.
     */
    getMessage(msgKey, gameState){
        let message = String(this.messages.get(msgKey) ?? msgKey);
        MessageMap.log(`processing synonyms...`);
        message = this.replaceSynonyms(message);
        if(gameState.player){
            MessageMap.log("processing player: " + message);
            message = this.replaceProperties(message, gameState.player , pS );
        }
        if(gameState.location){
            MessageMap.log("processing location: " + message);
            message = this.replaceProperties(message, gameState.location , lS );
        }
        return {
            key: msgKey,
            message: message
        }
    }

    /**
     * @return JSON: object containing count of keys and key names.
     */
    getMessageKeys(){
      return {
          count: this.messages.size,
          keys: Array.from(this.messages.keys())
      }
    }
}
module.exports = MessageMap;
