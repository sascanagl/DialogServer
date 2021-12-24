const MessageMap = require("./MessageMap");
const Synonyms   = require("./Synonyms");

const messages = new Map([

  ["amb.rand.noise"  , new Synonyms([ "no_text", "amb.rand.noise1", "no_text", "amb.rand.noise2", "no_text", "amb.rand.noise3" ])],
  ["amb.silence" , new Synonyms(["amb.silence2" ])],
  ["unknown" , new Synonyms([ "unknown1" , "unknown2" ])]
]);

class RandomMessageMap{

    constructor(props){
      if(!props) props = {};
      this.getRandomMessage = this.getRandomMessage.bind(this);
      this.getRandomMessageList = this.getRandomMessageList.bind(this);
      this.messageMap = props.msgMap ?? new MessageMap();
    }

    static log(msg){ /* console.log("RandomMessageMap: "+ msg); */ }

    /**
     * Get a random message from the list using the provided strKey.
     * @param strKey - String: id of set of related messages.
     * @param gameState - JSON: object containing player and location objects from gameState.
     * @return String: MessageMap object. The message may be the same as the strKey 
     * if the strKey is invalid.
     */
     getRandomMessage(strKey, gameState){
      let message = { key: strKey, message: " "};
      if(strKey != null && strKey.length > 0){
        let lckey = strKey.toLowerCase();
        let objSynonyms = messages.get(lckey);
        if (objSynonyms){
          let skey = objSynonyms.getSynonym();
          if (skey != null && skey.length > 0) {
            message = this.messageMap.getMessage(skey.toLowerCase(), gameState);
          }else{
            message = this.messageMap.getMessage(lckey, gameState);
          }
        }
      }
      return message;
    }

    /**
     * @return JSON: the list of synonyms/pronouns for the provided key. \
     * The count represents the count of synonyms stored with that key.
     */
    getRandomMessageList(akey){
        var list;
        try{ 
          list = messages.get(akey.toLowerCase()).getSynonyms(); }
        catch(err){ // handle invalid key
          list = [];
        }
        return {
            key: akey,
            count: list.length,
            synonyms: list
        }
    }

    /**
     * @return JSON: object containing count of keys and key names.
     */
    static getRandomMessageKeys(){
      return {
        count: messages.size,
        keys: Array.from(messages.keys())
      }
    }
}
module.exports = RandomMessageMap;
