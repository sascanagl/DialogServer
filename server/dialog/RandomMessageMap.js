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

    static log(msg){ console.log("RandomMessageMap: "+ msg);  }

    // it is possible the strWord has no synonyms
    getRandomMessage(strKey, gameState){
      let message;
      if(strKey != null && strKey.length > 0){
        let lckey = strKey.toLowerCase();
        let objSynonyms = messages.get(lckey);
        let skey = objSynonyms.getSynonym();
        if (skey != null && skey.length > 0) {
          message = this.messageMap.getMessage(skey.toLowerCase(), gameState);
        }else{
          message = this.messageMap.getMessage(lckey, gameState);
        }
      }
      return (message) ? message: " ";
    }

    /**
     * @return JSON: the list of synonyms/pronouns for the provided key. \
     * The count represents the count of synonyms stored with that key.
     */
    getRandomMessageList(akey){
        const list = messages.get(akey.toLowerCase()).getSynonyms();
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