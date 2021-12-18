const Synonyms = require("./Synonyms");

/**
 * Map<string, Synonyms> \
 * "key" = string - root word or primary word with assigned Synonyms. \
 * "value" = Synonyms - class instance of all synonyms to be considered for that key. \
 * A proper noun key can, instead, be storing the pronouns to use for that noun.
 **/
const synonyms = new Map([
  ["academics" , new Synonyms([ "scholars", "professors" ])],
  ["anywhere"  , new Synonyms([ "everywhere", "wherever", "anyplace" ])],
  ["apartment" , new Synonyms([ "abode", "home", "flat", "residence", "digs" ])],
  ["bobby"     , new Synonyms([ "he", "him", "his" ])],
  ["chance"    , new Synonyms([ "happen", "hazard", "stumble", "venture" ])],
  ["chicago"   , new Synonyms([ "the Windy City" ])],
  ["coworkers" , new Synonyms([ "associates", "colleagues" ])],
  ["direction" , new Synonyms([ "awareness", "surity", "purpose", "plan", "destination" ])],
  ["entered"   , new Synonyms([ "set foot in", "walked into", "stepped into" ])],
  ["evening"   , new Synonyms([ "night" ])],
  ["fiona"     , new Synonyms([ "she", "her", "hers" ])],
  ["gathering" , new Synonyms([ "party", "affair", "meeting", "congregation" ])],
  ["harold"    , new Synonyms([ "he", "him", "his" ])],
  ["intended"  , new Synonyms([ "expected" ])],
  ["informal"  , new Synonyms([ "relaxed", "casual", "straightforward", "easygoing", "laid back", "ordinary" ])],
  ["little"    , new Synonyms([ "no" , "slight" , "minor" ])],
  ["John Law"  , new Synonyms([ "Pig", "Bacon", "Blue", "Bobby", "Fuzz", "Five-O", "Gumshoe", "Mountie", "Vics" ])],
  ["lost"      , new Synonyms([ "adrift" , "astray" , "disoriented" ])],
  ["lois"      , new Synonyms([ "he", "him", "his" ])],
  ["margaret"  , new Synonyms([ "she", "her", "hers" ])],
  ["nearby"    , new Synonyms([ "close by"  , "very near", "not far"    ])],
  ["notice"    , new Synonyms([ "note", "heed", "thought", "awareness", "regard" ])],
  ["painful"   , new Synonyms([ "difficult", "unbearable"               ])],
  ["pauline"   , new Synonyms([ "she", "her", "hers" ])],
  ["quiet"     , new Synonyms([ "soft", "soulful", "muted", "low", "dull", "muffled" ])],
  ["rick"      , new Synonyms([ "he", "him", "his" ])],
  ["seek"      , new Synonyms([ "find", "pursue", "chase", "hunt", "scout", "solicit" ])],
  ["showing"   , new Synonyms([ "presenting", "demonstrating", "promoting", "relaying" ])],
  ["silence"   , new Synonyms([ "quiet", "stillness" ])],
  ["softly"    , new Synonyms([ "soulfully", "faintly", "gently", "tenderly", "delicately" ])],
  ["speechless", new Synonyms([ "confused", "muddled", "befuddled"      ])],
  ["strangers" , new Synonyms([ "newcomers", "unknowns", "unfamiliars", "outsiders", "visitors" ])],
  ["thanks"    , new Synonyms([ "thank you", "much obliged", "gracias"  ])],
  ["think"     , new Synonyms([ "ponder"   , "contemplate" , "muse"     ])],
  ["tim"       , new Synonyms([ "he", "him", "his" ])],
  ["uc"        , new Synonyms([ "the University of Chicago" ])],
  ["utterly"   , new Synonyms([ "completely" , "totally" , "wholly", "altogether", "categorically", "entirely" ])],
  ["walking"   , new Synonyms([ "striding" , "meandering"  , "waddling" ])],
  ["wander"    , new Synonyms([ "stroll" , "amble"  , "walk", "dawdle", "saunter", "meander", "roam", "prowl", "drift", "traipse", "mosey", "trudge" ])],
  ["watch"     , new Synonyms([ "see", "behold", "observe", "view", "study", "witness" ])],
  ["welcome"   , new Synonyms([ "entrée" ])],
  ["whispers"  , new Synonyms([ "mumbles" , "murmurs"  , "breathes"     ])],
  ["wow"       , new Synonyms([ "jeez", "unbelievable", "uncanny", "whoa" ])],
  ["wrestling" , new Synonyms([ "rustling", "noises", "jostling"        ])]
]);

class SynonymMap{

    constructor() {
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
     * @return string 
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
        let objSynonym = synonyms.get(key.toLowerCase());
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
     */
    getSynonymsList(strWord){
        const list = synonyms.get(strWord.toLowerCase()).getSynonyms();
        return {
           key: strWord,
           count: list.length,
           synonyms: list
        }
    }

    /**
     * @return JSON: object containing count of keys and key names.
     */
    static getSynonymKeys(){
      return {
          count: synonyms.size,
          keys: Array.from(synonyms.keys())
      }
    }
}
module.exports = SynonymMap;
