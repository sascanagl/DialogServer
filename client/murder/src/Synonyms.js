
// class instances stored in the SynonymMap
class Synonyms {

    constructor(arrSynonyms) {
        this.synonyms = arrSynonyms;
        this.lastUsed = -1;
        this.getSynonym = this.getSynonym.bind(this);
    }

    // get a synonym for the supported root word.
    // do not return the same synonym used last time.
    // sometimes use the root word instead of a synonym
    // return of null means to use the root word
    getSynonym() {
      let i = Math.floor(Math.random() * (this.synonyms.length +1));
      if(i == this.lastUsed) return this.getSynonym();
      this.lastUsed = i;
      return (i==0) ? null : this.synonyms[i-1];
    }
 
    /**
     * 1 = she/he/it
     * 2 = her/him/it
     * 3 = hers/his/its
     * @param {Number} index 
     * @return the pronoun or null--which means to use the originating noun.
     */
    getPronoun(index){
      let i = Math.floor(Math.random() * 10);      
       return (i > 4) ? this.synonyms[index-1] : null;
    }
}
export default Synonyms;
