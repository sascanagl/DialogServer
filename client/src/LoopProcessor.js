/* eslint-disable no-loop-func */
//import AgentInfo         from "./AgentInfo";
//import LocationInfo      from "./LocationInfo";
//import LoopInfo          from "./LoopInfo";
//import GameState         from "./GameState";
import MarkedMessage     from "./MarkedMessage";
import ChainedMessageMap from "./ChainedMessageMap";
import RandomMessageMap  from "./RandomMessageMap";
import MessageMap        from "./MessageMap";
import SynonymMap        from "./SynonymMap";
import OutTriggerActions from "./OutTriggerActions";

const cS = "$c{"; // chained message key
// eslint-disable-next-line no-unused-vars
const iS = "$i{"; // item stat (item:property:value ???)
const lS = "$l{"; // location stat (property:value)
const mS = "$m{"; // message key
// eslint-disable-next-line no-unused-vars
const nS = "$n{"; // targeted npc stat (property:value)
const pS = "$p{"; // player stat (property:value)
const rS = "$r{"; // random message key
const sS = "$s{"; // synonyms key
const xS = "$x{"; // loop stat (property:value)
const lstS = "$lst{"; // list "npc"s or "item"s present at location

class LoopProcessor {

    /**
     * @param {*} props to initialize the constructor.  
     * name       : String name of app/game.  
     * envHandler : callback function to handle changes to environment dialog.  
     * insHandler : callback function to handle changes to input/player dialog.  
     * outHandler : callback function to handle changes to output/npc dialog.  
     */
    constructor(props){
        this.name                = props.name       ?? "Test Game";
        this.outHandler          = props.outHandler; 
        this.lastRow             = props.lastRow    ?? -1;
        this.logic               = props.logic      ?? [];

        this.processLoop         = this.processLoop.bind(this);
        this.checksPass          = this.checksPass.bind(this);
        this.checkPropertyValues = this.checkPropertyValues.bind(this);
        this.setPropertyValues   = this.setPropertyValues.bind(this);
        this.getMessaging        = this.getMessaging.bind(this);
        this.doActions           = this.doActions.bind(this);
        this.doEnvironment       = this.doEnvironment.bind(this);
        this.doInput             = this.doInput.bind(this);
        this.doOutput            = this.doOutput.bind(this);
        this.getPropertyRange    = this.getPropertyRange.bind(this);

        this.setHandlers         = this.setHandlers.bind(this);
        this.loadWatcher         = this.loadWatcher.bind(this);

        this.loadTimer = "";
        this.envLoading = false;
        this.insLoading = false;
        this.outLoading = false;
        this.envDoneLoading = false;
        this.insDoneLoading = false;
        this.outDoneLoading = false;
        this.endGameState = null;
        this.caller = null;
    }

    static logIt(msg){ console.log("LoopProcessor: "+ msg);  }

    setHandlers(props){
        this.outHandler = props.outHandler; // javascript:void()
    }

    /**
     * Called internally by setPropertyValues().  
     * Calc and return a random number between n-n.
     * @param {String} range String "n-n".  
     * @return {Number} random Number between n-n (inclusive).  
     */
    getPropertyRange(range){
        //LoopProcessor.logIt("getPropertyRange called for range: "+ range);
        let arr = range.split("-");
        let min = Number(arr[0]);
        let max = Number(arr[1]);
        let dif = Number(max - min + 1);
        return Math.floor(Math.random() * dif) + min;
    }

    /**
     * Called internally by doActions().  
     * Given a String of "$?{prop:value}$?{prop:value}" settings, 
     * set all property values associated with the obj and sMark given.  
     * Supports (prop:value) (delay:n-n) (prop:++) (prop:--)
     * @param {String} acts String of $p{}$n{}$l{}$x{}$i{} prop:value settings.  
     * @param {*} obj  the p, n, l, x, i obj to receive the props.  
     * @param {String} sMark the prefix pS, nS, lS, xS, iS to identify the props to set.  
     * @return {*} the (possibly) modified obj receiving changes.  
     */
    setPropertyValues(acts, obj, sMark){
        //LoopProcessor.logIt("setPropertyValues called with "+ sMark +": "+ acts);
        let proc = new MarkedMessage(acts, 0, sMark);
        let a, arr, k, v, t;
        while( proc.hasMark && proc.hasKey() ){
            a =  proc.key;
            arr = a.split(':');
            k = arr[0]; v=arr[1];
            //LoopProcessor.logIt("setPropertyValue "+ k +"="+ v);
            if( (k === "delay") && (v.indexOf("-") > 0 )){
                obj[k] = this.getPropertyRange(v);
            }else if(v.indexOf("++") === 0){
                t = obj[k];
                if(t==null){
                    t=0;
                }else{
                    t = Number(t);
                    if(isNaN(t)) t = 0;
                }
                t++;
                obj[k] = t;
                //LoopProcessor.logIt("setPropertyValue "+ k +" incremented to "+ t);
            }else if(v.indexOf("--") === 0){
                t = obj[k];
                if(t==null){
                    t=0;
                }else{
                    t = Number(t);
                    if(isNaN(t)) t = 0;
                }
                t--;
                obj[k] = t;
                //LoopProcessor.logIt("setPropertyValue "+ k +" decremented to "+ t);
            }else{
                obj[k] = v;
            }
            proc.replaceMark(k);
        }
        return obj;
    }

    /**
     * Called internally by processLoop().  
     * Given a String of "$?{prop:value}$?{prop:value}" actions to process,
     * invoke setPropertyValues calls on each gameState object that might 
     * be receiving property changes.  
     * @param {String} acts String of $p{}$n{}$l{}$x{}$i{} prop:value settings.  
     * @param {GameState} gameState holding all game objects that might be processed.  
     * @return {GameState} the (possibly) modified gameState obj.  
     */
    doActions(acts, gameState){
        LoopProcessor.logIt("doActions called with: "+ acts);
        gameState.player   = this.setPropertyValues( acts, gameState.player  , pS);
        gameState.location = this.setPropertyValues( acts, gameState.location, lS);
        gameState.loop     = this.setPropertyValues( acts, gameState.loop    , xS);
        return gameState;
    }

    /**
     * called internally
     * @param {String*} env String "$c{}$r{}$m{}" environment message markup to process.  
     * @param {GameState} gameState 
     * @param {String} sMark String cS, rS, mS, sS for the type of messaging to seek/replace.
     * @return {String} environment messaging with messages replacing markup.
     */
    getMessaging = async(markup, gameState, sMark) =>{
        let proc = new MarkedMessage(markup, 0, sMark);
        let key, val;
        let npcs = [];
        let location = gameState.location;
        while( proc.hasMark && proc.hasKey() ){
            key =  proc.key;
            console.log("Downloading "+ sMark +" message for id: "+ key);
            switch(sMark){
                case cS:
                    await ChainedMessageMap.getChainedMessage(key, gameState, false)
                    .then(res => { val = res.message; } );
                    break;
                case rS:
                    await RandomMessageMap.getRandomMessage(key, gameState)
                    .then(res => { val = res.message; } );
                    break;
                case mS:
                    await MessageMap.getMessage(key, gameState)
                    .then(res => { val = res.message; } );
                    break;
                case sS:
                    await SynonymMap.getSynonym(key)
                    .then(res => { val = res.synonym; } );
                    break;
                case lstS:
                    val = "";
                    if(key === "npc"){
                        npcs = location.getNPCs(location.zone);
                        if(npcs.length > 0){
                            // eslint-disable-next-line no-loop-func
                            npcs.forEach(n => {
                                val += n.display +", ";
                            });
                            val = val.slice(0,-2);
                        }
                    }
                    break;
                default:
                    val = " <unknown.message> ";
            }
            //LoopProcessor.logIt("Retrieved "+ sMark +" message: "+ val);
            proc.replaceMark(val);
        }
        return proc.message;
    }

    /**
     * Called internally by processLoop().  
     * Given a String of "$c{}$r{}$m{}" environment messaging to process,
     * invoke appropriate MessageMap, RandomMessageMap, and ChainedMessageMap 
     * libraries to satisfy the environment messaging.   
     * @param {String} env String of "$c}$r}$m}" environment messaging.  
     * @param {GameState} gameState holding all game objects that might be processed.  
     * @return {GameState} the (possibly) modified gameState obj.  
     */
    doEnvironment = async(env, gameState) => {
        LoopProcessor.logIt("doEnvironment called with: "+ env);
        let chained = await this.getMessaging(env, gameState, cS);
        let random = await this.getMessaging( chained, gameState, rS);
        let message = await this.getMessaging(random, gameState, mS);
        let synonyms = await this.getMessaging(message, gameState, sS);
        return synonyms;
    }

    /**
     * Called internally by processLoop().  
     * Given a String of "$c{}$r{}$m{}" input messaging to process,
     * invoke appropriate MessageMap, RandomMessageMap, and ChainedMessageMap 
     * libraries to satisfy the input messaging.   
     * @param {String} ins String of "$c}$r}$m}" input messaging.  
     * @param {GameState} gameState holding all game objects that might be processed.  
     * @return {GameState} the (possibly) modified gameState obj.  
     */
    doInput = async(ins, gameState) => {
        LoopProcessor.logIt("doInput called with: "+ ins);
        let chained = await this.getMessaging(ins, gameState, cS);
        let random = await this.getMessaging( chained, gameState, rS);
        let message = await this.getMessaging( random, gameState, mS);
        let synonyms = await this.getMessaging(message, gameState, sS);
        let list = await this.getMessaging(synonyms, gameState, lstS);
        return list;
    }

    /**
     * Called internally by processLoop().  
     * Given a String of "$c{}$r{}$m{}" output messaging to process,
     * invoke appropriate MessageMap, RandomMessageMap, and ChainedMessageMap 
     * libraries to satisfy the output messaging.   
     * @param {String} outs String of "$c}$r}$m}" output messaging.  
     * @param {GameState} gameState holding all game objects that might be processed.  
     * @return {GameState} the (possibly) modified gameState obj.  
     */
    doOutput = async(outs, gameState) => {
        LoopProcessor.logIt("doOutput called with: "+ outs);
        // array of: messaging:trigger:actions | messaging:trigger:actions | messaging:trigger:actions
        // $c{}$r{}$m{}:trigger:$}$}$} | $c{}$r{}$m{}:trigger:$}$}$} | $c{}$r{}$m{}:trigger:$}$}$}
        let arr = outs.split("|"); // new array items: $c{}$r{}$m{}:trigger:$}$}$}
        let outArr = [];
        for(let i=0; i< arr.length; i++){
            let msg=""; let trig=""; let acts="";
            let cin = arr[i].indexOf(":");
            let mArr = (cin > 0) ? arr[i].substring(0, cin) 
                       : ((cin === 0) ? "" : arr[i]);
            if(mArr != null && mArr.length > 0){
                let chained = await this.getMessaging(mArr, gameState, cS);
                let random = await this.getMessaging(chained, gameState, rS);
                let message = await this.getMessaging(random, gameState, mS);
                let synonyms = await this.getMessaging(message, gameState, sS);
                msg = synonyms;
            }
            let cend = (cin > -1) ? arr[i].indexOf(":", cin +1) : -1;
            if( cend > cin){
                trig = ( cend > cin+1 ) ? arr[i].substring(cin +1, cend): "";
                acts = (cend < arr[i].length) ? arr[i].substring(cend+1) : "";
            }else if( cin > -1){
                trig = arr[i].substring(cin +1);
                acts = "";
            }
            outArr.push(new OutTriggerActions({message: msg, trigger: trig, actions: acts}));
        }
        return outArr; // array of OutTriggerActions
    }

    /**
     * Called internally by checkPass().  
     * Given a String of "$?{prop:value}$?{prop:value}" settings, 
     * check all obj property values for the sMark given to 
     * see if they obj values match the checks values.  
     * Suports prop:value, prop:!value, prop:>value, prop:<value
     * @param {String} checks String of $p{}$n{}$l{}$x{}$i{} prop:value checks.  
     * @param {*} obj  the p, n, l, x, i obj to check for property values.  
     * @param {String} sMark String prefix pS, nS, lS, xS, iS to identify the props to check.  
     * @return {boolean} true if ALL checked obj values match expected values.  
     */
    checkPropertyValues(checks, obj, sMark){
        //LoopProcessor.logIt("checkPropertyValues called with "+ sMark +": "+ checks);
        let proc = new MarkedMessage(checks, 0, sMark);
        let a, arr, k, v, t;
        while( proc.hasMark && proc.hasKey() ){
            a =  proc.key;
            arr = a.split(':');
            k = arr[0]; v=arr[1];
            t = obj[k];
            // check for property should not exist
            if ( v === '!' ) {
                if (t != null) return false;
            }
            // check for (property:!value)(property:>value)(property:<value)
            else if ( (v.indexOf('!')) === 0 ) {
                v = v.slice(1);
                // FAIL/FALSE if they ARE equal
                // Note the property MISSING is the same as NOT EQUAL
                // eslint-disable-next-line eqeqeq
                if( (t != null ) && (v == t) ) return false;
            }
            else if ( (v.indexOf('>')) === 0 ) {
                v = v.slice(1);
                // property cannot be MISSING and should be numeric
                if(t == null ) return false;
                t = Number(t);
                v = Number(v);
                if( isNaN(t) || isNaN(v) || ( t <= v) ) return false;    // the value is NOT greater than
            }
            else if ( (v.indexOf('<')) === 0 ) {
                v = v.slice(1);
                // property cannot be MISSING and should be numeric
                if(t == null ) return false;
                t = Number(t);
                v = Number(v);
                if( isNaN(t) || isNaN(v) || (t >= v) ) return false;    // the value is NOT less than
            }
            else{
                // Insure EXISTING and EQUAL, or fail if they are not
                // eslint-disable-next-line eqeqeq
                if(! ((t != null ) && (v == t)) ) {
                    //LoopProcessor.logIt(t +" "+ (typeof t) +" did not equal "+ v +" "+ (typeof v));
                    return false; // exit on first failed check
                }
            }
            proc.replaceMark(k);
        }
        //LoopProcessor.logIt(t +" did satisfy "+ v);
        return true;
    }

    /**
     * Called internally by processLoop().  
     * Given a String of "$?{prop:value}$?{prop:value}" checks to process,
     * invoke checkPropertyValues calls on each gameState object that might 
     * have values to check.  
     * @param {String} checks String of $p{}$n{}$l{}$x{}$i{} prop:value settings.  
     * @param {GameState} gameState .  
     * @return {boolean} true if ALL checked obj values match expected values.  
     */
    checksPass(checks, gameState){
        //LoopProcessor.logIt("checkPass called with: "+ checks);
        if( (this.checkPropertyValues( checks, gameState.player  , pS) ) &&
            (this.checkPropertyValues( checks, gameState.location, lS) ) &&
            (this.checkPropertyValues( checks, gameState.loop    , xS) ) ) {
            return true;
        }
        return false;
    }

    /**
     * Main application/game logic loop.  Called from the external App layer.  
     * Using the provided gameState, process the LoopProcessor logic table for 
     * the set of checks to perform and the resulting actions to take.  
     * Calls checkPass(), doActions(), doEnvironment(), doInputs() and doOutputs().  
     * @param {GameState} gameState .  
     * @return {GameState} the (probably) modified gameState obj.  
     */
    processLoop(gameState, caller ){
        this.caller = caller;
        LoopProcessor.logIt("beginning loop of "+ this.logic.length + " rows.");
        // loop through the logic table looking for the first "match" on a row 
        let location = gameState.location;  // LocationInfo
        let loop     = gameState.loop;      // LoopInfo
        //let player   = gameState.player;    // AgentInfo
        let npc      = location.npc ?? "";
        if (npc.length > 0 && npc === "none") { 
            npc = ""; 
        }
        let row = null;
        gameState.row        = null;
        gameState.envtext    = "";

        this.lastRow = gameState.lastRow ?? 0;

        let i = 0;
        for( i=0 ; i < this.logic.length ; i++){
            row = this.logic[i];
            //LoopProcessor.logIt("checking row: "+ i);
            if( ( row.w.length  > 0   && row.w === location.world ) &&   // world must have a value
                ( row.z.length  > 0   && row.z === location.zone  ) &&   // zone  must have a value
                ( (row.n.length > 0   && row.n === npc            ) ||   // npc   might have a value
                  (row.n.length === 0 && npc.length === 0       ) ) &&   // if npc then get npc AgentInfo from storage array (future)
                ( row.t.length  > 0   && row.t === loop.trigger   ) &&
                ( row.c.length === 0  || this.checksPass(row.c, gameState)) ){
                // if we made it here the row is a match
                break;
            }
        }
        //===========================================================================
        // row will be the matched row, or the last row--which is used for no matches
        //===========================================================================
        LoopProcessor.logIt("matched on row: "+ i);
        gameState.row = row; // for testing only
        gameState.lastRow = i;

        if(row.a.length > 0) { gameState = this.doActions ( row.a, gameState ); }

        this.endGameState = gameState;

        // handle async calls
        this.envLoading = this.insLoading = this.outLoading = false;
        this.envDoneLoading = this.insDoneLoading = this.outDoneLoading = true;

        // need loadWatcher to work asynchronous...
        this.loadTimer = setInterval(this.loadWatcher, 250);
    }

    // might not need this watcher anymore if we put back into routine above.
    loadWatcher = async() => {
        LoopProcessor.logIt("commencing dynamic message processing and loading...");
        if( this.endGameState.row.e.length > 0 && this.envLoading === false ) {
            this.envLoading = true;
            this.envDoneLoading = false;
            let msg = null;
            await this.doEnvironment( this.endGameState.row.e, this.endGameState )
            .then(res => { msg = res;});
            LoopProcessor.logIt("doEnvironment response: \n"+ msg);
            this.endGameState.envtext = msg;
            this.envDoneLoading = true;
        }
        if(this.endGameState.row.i.length > 0 && (this.endGameState.lastrow !== this.lastRow ) && this.insLoading === false) {
            this.insLoading = true;
            this.insDoneLoading = false;
            let msg = null;
            await this.doInput( this.endGameState.row.i, this.endGameState )
            .then(res => {msg = res;})
            LoopProcessor.logIt("doInput response: "+ msg);
            this.endGameState.instext = this.endGameState.instext.concat("\n", msg, "\n");
            this.insDoneLoading = true;
        }
        // doOutput will have to be modified too, when ready
        if(this.endGameState.row.o.length > 0 && (this.endGameState.lastRow !== this.lastRow ) && this.outLoading === false) {
            this.outLoading = true;
            this.outDoneLoading = false;
            let outOptions = null;
            await this.doOutput( this.endGameState.row.o, this.endGameState )
            .then(res =>{outOptions = res;}); //probably gonna fail? array of new OutTriggerActions objects
            LoopProcessor.logIt("doOutput response: "+JSON.stringify(outOptions));
            this.endGameState.outOptions = outOptions;
            this.outDoneLoading = true;
        }

        if(this.envDoneLoading ===true && this.insDoneLoading === true && this.outDoneLoading === true){
            LoopProcessor.logIt("MessageWatcher finished. Invoking callback function...")
            clearInterval(this.loadTimer);
            this.caller(this.endGameState);
        }
    }
}
export default LoopProcessor;