import React, {Component} from "react";
import "./App.css";
import LoopProcessor      from "./LoopProcessor";
import DialogState        from "./DialogState";
import MainContent        from "./MainContent";
import AgentInfo          from "./AgentInfo";
import LocationInfo       from "./LocationInfo";
import GameState          from "./GameState";
import BusinessMurder     from "./BusinessMurder";
import AudioFlags         from "./AudioFlags";

class App extends Component{

  constructor(props) {
    super(props);
    this.loading = true;
    this.logic = new BusinessMurder({});  // make CoreLogic for reusability
    this.locations = new LocationInfo({});
    this.player = new AgentInfo({});
    this.looper = {};
    this.state = {};

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleNPCChange = this.handleNPCChange.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleLoopState = this.handleLoopState.bind(this);
    this.finishLoop = this.finishLoop.bind(this);
    this.handleOutputs = this.handleOutputs.bind(this);
    this.componentSaveState = this.componentSaveState.bind(this);
    this.componentClearState = this.componentClearState.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
    this.componentStartGame = this.componentStartGame.bind(this);
    this.handleAudio = this.handleAudio.bind(this);

    this.loadWait = this.loadWait.bind(this);
    this.loadTimer = setInterval( () => this.loadWait(), 200 );
  }

  loadWait(){
      if ( this.logic.isLoaded() && this.locations.isLoaded() && this.player.isLoaded() ){
          // all loaded, start the game
          console.log("Game LOADING completed...");
          this.loading = false;
          clearInterval(this.loadTimer);
          this.componentStartGame();
      }
  }

  componentStartGame(){
    console.log("Game is now starting...");
    this.looper = new LoopProcessor({ name: this.logic.getName(), logic: this.logic.getLogic()});
    this.looper.setHandlers({ outHandler: this.handleOutputs });
    this.locations.setHandlers({locHandler: this.handleLocationChange, npcHandler: this.handleNPCChange });
    this.player.setHandlers({ agentHandler: this.handleProfileChange });
    // eslint-disable-next-line react/no-direct-mutation-state
    this.setState({  //works...but gets overwritten in componentDidMount
        loopProc:  this.looper,
        gameState: new GameState({
            instext: "",
            envtext: "",
            location: this.locations,
            player: this.player,
            audioFlags: new AudioFlags({environ:true,narrate:true,atmos:true}),
            outHandler: this.handleOutputs,
            resetHandler: this.handleResetGame,
            audioHandler:  this.handleAudio
            /* loop: new LoopInfo() defaults*/
        })
    });
    //this.componentDidMount();
    //this.forceUpdate();
    this.loopTimer = setInterval( () => this.handleLoopState(), this.state.gameState.loop.delay *1000);
  }

  handleResetGame(evt) {
      this.componentClearState();
      this.componentStartGame();
  }

  componentClearState() {
      localStorage.removeItem("player");
      localStorage.removeItem("world");
      localStorage.removeItem("zone");
      localStorage.removeItem("zones");
  }

  componentSaveState() {
      localStorage.setItem("player", JSON.stringify(this.state.gameState.player));
      localStorage.setItem("world", this.state.gameState.location.world);
      localStorage.setItem("zone",  this.state.gameState.location.zone);
      localStorage.setItem("zones", JSON.stringify(this.state.gameState.location.zoneInfo));
  }

  // handle updates to audio controls (AudioFlags)
  handleAudio(evt){
    console.log("App.handleAudio processing event.");
    //clearInterval(this.loopTimer);
    let newGameState = this.state.gameState;
    let newAudioFlags = newGameState.audioFlags;
    switch(evt.target.id){
      case "narrate": newAudioFlags.narrate = evt.target.checked; break;
      case "environ": newAudioFlags.environ = evt.target.checked; break;
      case "atmos"  : newAudioFlags.atmos = evt.target.checked; break;
      default:
        console.log("App.handleAudio IGNORED event from target.id '"+ evt.target.id +"'");
      }
    newGameState.audioFlags = newAudioFlags;
    this.setState({gameState: newGameState});
    this.forceUpdate();
    //this.loopTimer = setInterval(() => this.handleLoopState(), 500);
  }

  // handle updates to the PlayerDialogPane
  handleOutputs(option){
      console.log("App.handleOutputs processing options.");
      //clearInterval(this.loopTimer);
      let newState = this.state.gameState;
      if( option.trigger != null && option.trigger.length > 0 ) newState.loop.trigger = option.trigger;
      if( option.actions != null && option.actions.length > 0 ) newState = this.state.loopProc.doActions(option.actions, newState);
      this.setState({gameState: newState});
      this.forceUpdate();
      //this.loopTimer = setInterval(() => this.handleLoopState(), 500);
  }

  // main app processing loop
  handleLoopState(){
      console.log("App.handleLoopState PROCESSING...");
      clearInterval(this.loopTimer);
      this.state.loopProc.processLoop(this.state.gameState, this.finishLoop);
  }

  finishLoop(newGameState){
    this.setState({gameState: newGameState});
    console.log("App.handleLoopState FINISHED ");
    this.loopTimer = setInterval( () => this.handleLoopState() , newGameState.loop.delay * 1000);
}

  handleLocationChange(evt) {
    console.log("App.handleLocationChange processing event.");
    clearInterval(this.loopTimer);  //clear the timer and handle loop immediately
    const evtValue = evt.target.value;
    let newGameState = this.state.gameState;
    let newLocation = newGameState.location;
    if( evt.target.id === 'zone' ){
      newLocation.zone = evtValue;
    }else{
      newLocation.world = evtValue;
    }
    newGameState.location = newLocation;
    newGameState.instext = "";
    this.setState({gameState: newGameState});
    this.handleLoopState();
  }

  // handle changes to the NPCSelector.js Radio Buttons
  handleNPCChange(evt){
    console.log("App.handleNPCChange processing event.");
    //clearInterval(this.loopTimer);
    const evtValue = evt.target.value;
    let newGameState = this.state.gameState;
    let newLocation = newGameState.location;
    newLocation.npc = evtValue;
    newGameState.location = newLocation;
    this.setState({gameState: newGameState});
    this.forceUpdate();
    //this.loopTimer = setInterval( () => this.handleLoopState , 500);
  }

  // handle changes to the PlayerProfile.js
  handleProfileChange(evt){
    console.log("App.handleProfileChange processing event.");
    //clearInterval(this.loopTimer);
    if( evt && this.state.gameState ){
        const { name, value } = evt.target;
        let newGameState = this.state.gameState;
        let newPlayer = newGameState.player;
        switch(name){
            case "uid"        : newPlayer.uid = value        ; break;
            case "firstName"  : newPlayer.firstName = value  ; break;
            case "lastName"   : newPlayer.lastName = value   ; break;
            case "age"        : newPlayer.age = value        ; break;
            case "gender"     : newPlayer.gender = value     ; break;
            case "race"       : newPlayer.race = value       ; break;
            case "skin"       : newPlayer.skin = value       ; break;
            case "eyes"       : newPlayer.eyes = value       ; break;
            case "hair"       : newPlayer.hair = value       ; break;
            case "cloth"      : newPlayer.cloth = value      ; break;
            case "height"     : newPlayer.height = value     ; break;
            case "weight"     : newPlayer.weight = value     ; break;
            case "cleanliness": newPlayer.cleanliness = value; break;
            case "beauty"     : newPlayer.beauty = value     ; break;
            case "strength"   : newPlayer.strength = value   ; break;
            default:
              console.log("App.handleProfileChange IGNORED an unknown field name.");
        }
        newGameState.player = newPlayer;
        this.setState({gameState: newGameState});
    }else{
        console.log("App.handleProfileChange bypassed invalid event or gameState...");
    }
    this.forceUpdate();
    //this.loopTimer = setInterval( () => this.handleLoopState, 500);
  }

  render(){
    console.log("App rendering...");
    if(this.loading === true){
      return(
        <div className="App">
          Loading...
        </div>
      );
    }
    return(
      <div className="App">
        <DialogState gameState={this.state.gameState} />
        <MainContent gameState={this.state.gameState} />
      </div>
    );
  }

  /**
   * Called AFTER UI is rendered...
   * This seems to remove/overwrite "state" set in componentStartGame...
   * loopProc is/was overwritten
   */
  componentDidMount(){
      if(this.loading === false){
          console.log("App.componentDidMount processing...");
          window.addEventListener('beforeunload', this.componentSaveState);
          let newGameState = this.state.gameState;
          let newPlayer = localStorage.getItem("player");
          let newZones = localStorage.getItem("zones");
          let newWorld = localStorage.getItem("world");
          let newZone  = localStorage.getItem("zone");

          if(newPlayer) {
            newGameState.player = JSON.parse(newPlayer);
          }
          if(newZones)  {
            newGameState.location.zoneInfo = JSON.parse(newZones);
          }

          if(newWorld) newGameState.location.world = newWorld;
          if(newZone)  newGameState.location.zone = newZone;

          this.setState({
              loopProc: this.looper,
              gameState: newGameState
          });
      }else{
          console.log("BYPASSED App.componentDidMount processing while loading data...");
      }
  }

  componentWillUnmount(){
      this.componentSaveState();
      window.removeEventListener('beforeunload', this.componentSaveState);
  }
}
export default App;
