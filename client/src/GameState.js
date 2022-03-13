import LocationInfo      from "./LocationInfo"
import LoopInfo          from "./LoopInfo";
import AgentInfo         from "./AgentInfo";
import OutTriggerActions from "./OutTriggerActions";
import AudioFlags        from "./AudioFlags";

class GameState {

    constructor(props){
        this.location     = props.location     ?? new LocationInfo(props);
        this.loop         = props.loop         ?? LoopInfo.getStartLoop();
        this.player       = props.player       ?? AgentInfo.getTestPlayer();
        this.audioFlags   = props.audioFlags   ?? new AudioFlags({narrate:true,environ:true,atmos:true});
        this.envtext      = props.envtext      ?? "";
        this.instext      = props.instext      ?? "";
        this.outOptions   = props.outOptions   ?? [new OutTriggerActions({message:"I got nothin."})];
        this.envHandler   = props.envHandler;
        this.insHandler   = props.insHandler;
        this.outHandler   = props.outHandler;
        this.resetHandler = props.resetHandler;
        this.audioHandler = props.audioHandler;
    }
}
export default GameState;
