
const Store= require("./Store");

/**
 * Map<string, Synonyms> \
 * "key" = string - root word or primary word with assigned Synonyms. \
 * "value" = Synonyms - class instance of all synonyms to be considered for that key. \
 * A proper noun key can, instead, be storing the pronouns to use for that noun.
 **/

class SynonymMap{

    constructor(props) {
      if (!props) props = {};
      this.context = props.context ?? "murder";
      this.synonyms = props.synonyms ?? new Map();
      this.capFirst = this.capFirst.bind(this);
      this.getSynonym = this.getSynonym.bind(this);
      this.getSynonymsList = this.getSynonymsList.bind(this);
    }

    /**
     * Prefix flag to indicate the returned synonym from getSynonym() should be capitalized. \
     * Example:
     * - getSynonym("uc:bobby") should return "He" instead of "he". 
     */
    static ucS = "uc:"; // flag: upCase first letter of returned synonym

    // normally called internally only
    capFirst(key){
        return key.charAt(0).toUpperCase() + key.slice(1);
    }

    /** 
     * Retrieve a synonym or pronoun for a strWord key. \
     * it is possible the strWord has no synonyms. \
     * @param strWord - the word to get the the lookup for.
     * uc:strWord - means to upCase first letter before return. \
     * n:strWord - means to get the specific index instead of a random index (Pronouns). \
     * uc:n:strWord - means to get the specific index (pronoun) and upCase the first letter.
     * @return string -- may be the original strWord provided
     */
    getSynonym(strWord){
      // initialize response to be 'no change'
      const json = { key: strWord, synonym: strWord };
      if(strWord != null && strWord.length > 0){
        let ucBool = strWord.startsWith(SynonymMap.ucS);
        let key = ucBool ? strWord.slice(SynonymMap.ucS.length) :
                           strWord;
        let pindex = key.indexOf(":");
        let person = 0;
        if(pindex > 0) {
          person = key.substring(0,pindex);
          key = key.substring(pindex+1);
        }
        // return null or new word
        // null means use the key given
        let objSynonym = this.synonyms.get(key.toLowerCase());
        if(objSynonym != null){
            let str = null;
            if(person > 0){
                str = objSynonym.getPronoun(person);
            }else{
                str = objSynonym.getSynonym();
            }
            if(str != null && str.length > 0){
                json.synonym = ucBool ? this.capFirst(str) : str;
                return json;
            }
            if(person == 3)
                key = key +"'s"; // 3rd person possessive
        }
        json.synonym = ucBool ? this.capFirst(key) : key;
      }
      return json;
    }

    /**
     * @return JSON: the list of synonyms/pronouns for the provided key. \
     * The count represents the count of synonyms stored with that key.
     * An empty list is returned if the key is invalid.
     */
    getSynonymsList(strWord){
        var list;
        try{
            list = this.synonyms.get(strWord.toLowerCase()).getSynonyms();
        }catch(err){
            list = [];
        }
        return {
           key: strWord,
           count: list.length,
           synonyms: list
        }
    }

    /**
     * @return JSON: object containing count of keys and key names.
     */
    getSynonymKeys(){
      return {
          count: this.synonyms.size,
          keys: Array.from(this.synonyms.keys())
      }
    }
}
module.exports = SynonymMap;
