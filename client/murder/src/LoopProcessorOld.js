import AgentInfo         from "./AgentInfo";
import LocationInfo      from "./LocationInfo";
import LoopInfo          from "./LoopInfo";
import GameState         from "./GameState";
import MarkedMessage     from "./MarkedMessage";
import ChainedMessageMap from "./ChainedMessageMap";
import RandomMessageMap  from "./RandomMessageMap";
import MessageMap        from "./MessageMap";
import SynonymMap        from "./SynonymMap";
import OutTriggerActions from "./OutTriggerActions";

//    a value can be empty "" but must never be null
//    world, zone, npc, trigger, checks[], envs[], indlg[], outdlg[],  actions[]
const logic = [
    { w:"main", z:"party"    , n:"",  t:"start", c:"", e:"", i:"You have arrived at the party.", o:"", a: "" },

    { w:""    , z:""         , n:"",     t:""     , c:"", e:"$r{amb.netherworld}"    , i:"$c{ins.netherworld}", o:"$r{out.netherworld}:start:$l{world:main}$l{zone:city}|$r{out.netherworld1}:start:$l{world:main}$l{zone:outskirts}", a: "$x{delay:7-20}" }
];

const cS = "$c{";
const iS = "$i{";
const lS = "$l{";
const mS = "$m{";
const nS = "$n{";
const pS = "$p{";
const rS = "$r{";
const sS = "$s{";
const xS = "$x{";

/* 
   check[]: "$}$}$}"             env[]: "$}$}$}" diag     action[]: "$}$}$}"
   ===========================   ======================   ========================
   player stat: $p{prop:value}   $c{chainedMessageKey}    player stat: $p{prop:value}
   locatn stat: $l{prop:value}   $r{randomMessageKey }    locatn stat: $l{prop:value}
   npc    stat: $n{prop:value}   $m{messageKey       }    npc    stat: $n{prop:value}
   loop   stat: $x{prop:value}   $s{synonymsKey      }    loop   stat: $x{prop:value}
   item   stat: $i{prop:value}                            item   stat: $i{prop:value}

   indlg[]: "$}$}$}" diag        outdlg[]: "$}$}$}" prompts w/trigger/actions)
   =========================     ====================================================
   $c{chainedMessageKey}         $c{chainedMessageKey}:trigger:act"$}$}$}"|$c{chainedMessageKey:trigger:act"$}$}$}"
   $r{randomMessageKey }         $r{randomMessageKey }:trigger:act"$}$}$}"|$c{chainedMessageKey:trigger:act"$}$}$}"
   $m{messageKey       }         $m{messageKey       }:trigger:act"$}$}$}"|$c{chainedMessageKey:trigger:act"$}$}$}"
   $s{synonymsKey      }         $s{synonymsKey      }:trigger:act"$}$}$}"|$c{chainedMessageKey:trigger:act"$}$}$}"
*/
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
        this.envHandler          = props.envHandler ?? "javascript:void";
        this.insHandler          = props.insHandler ?? "javascript:void";
        this.outHandler          = props.outHandler ?? "javascript:void";
        this.lastRow             = props.lastRow    ?? -1;

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
    }

    static logIt(msg){
        console.log("LoopProcessor: "+ msg);
    }

    /**
     * Called internally by setPropertyValues().  
     * Calc and return a random number between n-n.
     * @param {String} range String "n-n".  
     * @return {Number} random Number between n-n (inclusive).  
     */
    getPropertyRange(range){
        LoopProcessor.logIt("getPropertyRange called for range: "+ range);
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
     * @param {String} acts String of $p{}$n{}$l{}$x{}$i{} prop:value settings.  
     * @param {*} obj  the p, n, l, x, i obj to receive the props.  
     * @param {String} sMark the prefix pS, nS, lS, xS, iS to identify the props to set.  
     * @return {*} the (possibly) modified obj receiving changes.  
     */
    setPropertyValues(acts, obj, sMark){
        LoopProcessor.logIt("setPropertyValues called with "+ sMark +": "+ acts);
        let proc = new MarkedMessage(acts, 0, sMark);
        let a, arr, k, v;
        while( proc.hasMark && proc.hasKey() ){
            a =  proc.key;
            arr = a.split(':');
            k = arr[0]; v=arr[1];
            LoopProcessor.logIt("setPropertyValue "+ k +"="+ v);
            if( (k === "delay") && (v.indexOf("-") > 0 )){
                obj[k] = this.getPropertyRange(v);
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
     * 
     * @param {String*} env String "$c{}$r{}$m{}" environment message markup to process.  
     * @param {GameState} gameState 
     * @param {String} sMark String cS, rS, mS, sS for the type of messaging to seek/replace.
     * @return {String} environment messaging with messages replacing markup.
     */
    getMessaging(markup, gameState, sMark){
        let proc = new MarkedMessage(markup, 0, sMark);
        let key, val;
        while( proc.hasMark && proc.hasKey() ){
            key =  proc.key;
            switch(sMark){
                case cS:
                    val = ChainedMessageMap.getChainedMessages(key, gameState, false);
                    break;
                case rS:
                    val = RandomMessageMap.getRandomMessage(key, gameState);
                    break;
                case mS:
                    val = MessageMap.getMessage(key, gameState);
                    break;
                case sS:
                    val = SynonymMap.getSynonym(key);
                    break;
                default:
                    val = " <unknown.message> ";
            }
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
    doEnvironment(env, gameState){
        LoopProcessor.logIt("doEnvironment called with: "+ env);
        let message = this.getMessaging(env, gameState, cS);
        message     = this.getMessaging(message, gameState, rS); 
        message     = this.getMessaging(message, gameState, mS); 
        gameState.envtext = this.getMessaging(message, gameState, sS);         
        return gameState;
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
    doInput(ins, gameState){
        LoopProcessor.logIt("doInput called with: "+ ins);
        let message       = this.getMessaging(ins, gameState, cS);
        message           = this.getMessaging(message, gameState, rS); 
        message           = this.getMessaging(message, gameState, mS); 
        gameState.instext = this.getMessaging(message, gameState, sS); 
        return gameState;
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
    doOutput(outs, gameState){
        LoopProcessor.logIt("doOutput called with: "+ outs);
        // array of: messaging:trigger:actions | messaging:trigger:actions | messaging:trigger:actions
        // $c{}$r{}$m{}:trigger:$}$}$} | $c{}$r{}$m{}:trigger:$}$}$} | $c{}$r{}$m{}:trigger:$}$}$}
        let arr = outs.split("|"); // new array items: $c{}$r{}$m{}:trigger:$}$}$}
        let outArr = new Array();
        for(let i=0; i< arr.length; i++){
            let msg=""; let trig=""; let acts="";
            let cin = arr[i].indexOf(":");
            let mArr = (cin > 0) ? arr[i].substring(0, cin) 
                       : ((cin == 0) ? "" : arr[i]);
            if(mArr != null && mArr.length > 0){
                msg = this.getMessaging(mArr, gameState, cS);
                msg = this.getMessaging(msg, gameState, rS); 
                msg = this.getMessaging(msg, gameState, mS); 
                msg = this.getMessaging(msg, gameState, sS); 
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
        gameState.outOptions = outArr; // array of OutTriggerActions
        return gameState;
    }

    /**
     * Called internally by checkPass().  
     * Given a String of "$?{prop:value}$?{prop:value}" settings, 
     * check all obj property values for the sMark given to 
     * see if they obj values match the checks values.  
     * @param {String} checks String of $p{}$n{}$l{}$x{}$i{} prop:value checks.  
     * @param {*} obj  the p, n, l, x, i obj to check for property values.  
     * @param {String} sMark String prefix pS, nS, lS, xS, iS to identify the props to set.  
     * @return {boolean} true if ALL checked obj values match expected values.  
     */
    checkPropertyValues(checks, obj, sMark){
        LoopProcessor.logIt("checkPropertyValues called with "+ sMarks +": "+ checks);
        let proc = new MarkedMessage(checks, 0, sMark);
        let a, arr, k, v, t;
        while( proc.hasMark && proc.hasKey() ){
            a =  proc.key;
            arr = a.split(':');
            k = arr[0]; v=arr[1];
            t = obj[k];
            if(! ((t != null ) && (v === t)) ) return false; // exit on first failed check
            proc.replaceMark(k);
        }
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
        LoopProcessor.logIt("checkPass called with: "+ checks);
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
    processLoop(gameState){
        LoopProcessor.logIt("processLoop called with: "+ gameState.player.firstName+ " "+ gameState.player.lastName);
        // loop through the logic table looking for the first "match" on a row 
        let location = gameState.location;  // LocationInfo
        let loop     = gameState.loop;      // LoopInfo
        let player   = gameState.player;    // AgentInfo
        let npc      = location.npc ?? "";
        if (npc.length > 0 && npc === "none") { 
            npc = ""; 
        }
        LoopProcessor.logIt("beginning loop of "+ logic.length + " rows.");
        let row = null;        
        gameState.row        = null;
        gameState.envtext    = new String();

        let i = 0;
        for( i=0 ; i < logic.length ; i++){
            row = logic[i];
            LoopProcessor.logIt("checking row: "+ i);
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
        // row will be the matched row, or the last row--which is used for no matches
        gameState.row = row; // for testing only
        if(row.a.length > 0) { gameState = this.doActions (    row.a, gameState ); }
        if(row.e.length > 0) { gameState = this.doEnvironment( row.e, gameState ); }
        if(row.i.length > 0 && (i != gameState.lastRow )) { gameState = this.doInput(       row.i, gameState ); }
        if(row.o.length > 0 && (i != gameState.lastRow )) { gameState = this.doOutput(      row.o, gameState ); }
        gameState.lastRow = i;
        return gameState;
    }
}
export default LoopProcessor;