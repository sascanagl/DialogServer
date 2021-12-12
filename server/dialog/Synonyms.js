
/**
 * Stores a list of synonyms, or related pronouns. \
 * The critical function of Synonyms is to never, or almost never, 
 * return the same synonym as was returned last time.  That is, 
 * to randomize which synonym gets used and sometimes suggest that 
 * the original root word should be used, instead.
 */
class Synonyms {

    constructor(arrSynonyms) {
        this.synonyms = arrSynonyms;
        this.lastUsed = -1;
        this.getSynonym = this.getSynonym.bind(this);
    }

    /**
     * @returns the array of strings stored for this object.
     */
    getSynonyms() {
      return Array.from(this.synonyms);
    }

    /** 
     * get a synonym for the supported root word. \
     * do not return the same synonym used last time. \
     * sometimes use the root word instead of a synonym. \
     * @return synonym or null.  null means to use the root word.
     */
    getSynonym() {
      let i = Math.floor(Math.random() * (this.synonyms.length +1));
      if(i == this.lastUsed) return this.getSynonym();
      this.lastUsed = i;
      return (i==0) ? null : this.synonyms[i-1];
    }

    /**
     * Example: \
     * 1 = she/he/it \
     * 2 = her/him/it \
     * 3 = hers/his/its
     * @param {Number} index
     * @return the pronoun or null--which means to use the originating noun.
     */
    getPronoun(index){
      let i = Math.floor(Math.random() * 10);
       return (i > 4) ? this.synonyms[index-1] : null;
    }
}
module.exports = Synonyms;
