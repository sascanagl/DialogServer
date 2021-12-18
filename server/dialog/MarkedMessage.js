const SynonymMap       = require("./SynonymMap");
const MessageMap       = require("./MessageMap");
const RandomMessageMap = require("./RandomMessageMap");

// marker = new MarkedMessage(message, startIndex, sMark);
// if/while( marker.hasMark ) { 
//    val = getValueFromSomewhere( marker.key ); 
//    marker.replaceMark( val );  // new message, indices, key=null
// }

const eB  = "}";   // end brace

class MarkedMessage {

    constructor(message, startIndex, sMark){
        this.message = message;
        this.sMark = sMark;
        this.lenMark = sMark.length;
        this.start = message.indexOf(sMark, startIndex);
        this.hasMark = (this.start > -1);
        this.end = -1;
        this.key = null;

        this.hasKey = this.hasKey.bind(this);
        this.replaceMark = this.replaceMark.bind(this);
    }

static logIt(msg){ /* console.log("MarkedMessage: "+ msg); */ }

    hasKey(){
        this.key = null;
        this.safeMessage = this.message.length - this.lenMark;
        MarkedMessage.logIt("------ NEW HASKEY ------ start: "+ this.start +", "+ this.message);
        if((this.start > -1) && (this.start < this.safeMessage)){
            this.start = this.message.indexOf(this.sMark, this.start);  // find the next startIndex
            this.hasMark = this.start > -1;
            this.keyStart = this.hasMark ? this.start + this.lenMark : -1;
            if(this.keyStart > this.start){
                let eindex = this.message.indexOf(eB, this.keyStart); // find the endBrace
                MarkedMessage.logIt("start: "+ this.start +", keyStart: "+ this.keyStart +", endBrace: "+ eindex);
                if(eindex > this.keyStart){
                    this.end = eindex;
                    this.key = this.message.substring(this.keyStart, this.end); // get the key inside
                    MarkedMessage.logIt("Extracted: "+ this.key);
                    if(this.end < this.safeMessage){
                        this.hasMark = (this.message.indexOf(this.sMark, this.end +1) > -1);
                    }else{
                        this.hasMark = false;
                    }
                    MarkedMessage.logIt("post hasMark ? "+ this.hasMark );
                }else{
                    MarkedMessage.logIt("endBrace is not greater then keyStart!");
                }
            }else{
                MarkedMessage.logIt("keyStart is not greater then start!");
            }
        }else{  /* TODO: what do we reset/clear on no possible key? */ 
            MarkedMessage.logIt("hasKey NOT processed...");
        }
        return (this.key !== null);
    }

    /**
     * Insert whatever val back into the message to replace the key that was extracted.
     * This must be done in order to set all required pointers to the correct state or 
     * position to continue to cycle the remaining message for any more markers.
     * @param val 
     */
    replaceMark( val ){
        let replace;
        let sVal;
        if(this.key !== null)
        {
            if (val !== null)
            {
                sVal = String(val);
                if (this.start > 0){
                    MarkedMessage.logIt("get frontEnd chars only: 0 > "+ this.start);
                    replace = this.message.substring(0, this.start) + sVal; // get frontend + val
                    this.start = this.start + sVal.length;
                    MarkedMessage.logIt("frontEnd + val start: "+ this.start +", "+ replace);
                }else{
                    MarkedMessage.logIt("got NO frontEnd, just: "+ sVal);
                    replace = sVal;                                     // or just val
                    this.start = sVal.length;
                }

                MarkedMessage.logIt("new start: "+ this.start +", "+ replace);

                if(this.end < (this.message.length -1)){               // concat end?
                    replace = replace + this.message.substring(this.end + 1);
                    MarkedMessage.logIt("adding the End, start: "+ this.start +", "+ replace);
                }
                this.message = replace;
                MarkedMessage.logIt("new message: "+ this.message);
                // does not clear hasMark in prep for another loop, if needed
            }
            else{ // val came in null !
                this.start = this.end +1;
                MarkedMessage.logIt("replaceMark received NULL val! new start: "+ this.start);
            }
            this.keyStart = -1;
            this.end = -1;
            this.key = null;
        }else{
            MarkedMessage.logIt("replaceMark received NULL key!");
        }
        return this.message;
    }
}
module.exports = MarkedMessage;
