import https_fetch from "./https_fetch";

var options = new Map();

class AgentInfo {

    constructor(props){
        this.uid         = props.uid          ?? Date.now();
        this.firstName   = props.firstName    ?? "Test";
        this.lastName    = props.lastName     ?? "Player";
        this.age         = props.age          ?? 18;
        this.gender      = props.gender       ?? "male";      // male, female
        this.race        = props.race         ?? "american";  // american, british, russian
        this.skin        = props.skin         ?? "white";     // white, brown, yellow
        this.eyes        = props.eyes         ?? "brown";     // blue, brown, green
        this.hair        = props.hair         ?? "blond";     // black, blond, red
        this.cloth       = props.cloth        ?? "grey";      // black, white, grey
        this.height      = props.height       ?? 0;           // 0=sm, 1=med, 2=lg
        this.weight      = props.weight       ?? 0;           // 0=sm, 1=med, 2=lg
        this.cleanliness = props.cleanliness  ?? 0;           // 0=sm, 1=med, 2=lg
        this.beauty      = props.beauty       ?? 0;           // 0=sm, 1=med, 2=lg
        this.strength    = props.strength     ?? 0;           // 0=sm, 1=med, 2=lg
        this.handler     = props.agentHandler ?? "";

        this.isLoaded   = this.isLoaded.bind(this);
        this.loadGame   = this.loadGame.bind(this);
        this.setHandlers = this.setHandlers.bind(this);

        if(options.size === 0) this.loadGame();
    }

    static logIt( msg ) { /*console.log( "AgentInfo: "+ msg ); */ }

    setHandlers(props){
        this.handler = props.agentHandler;
    }

    isLoaded(){
        return options.size > 0;
    }

    loadGame = async() => {
        await https_fetch.getApplicationJson("/agent/options")
        .then( res => {
            let opts = new Map(Object.entries(res));
            let agentOptions = opts.get("agentOptions");
            options.set("gender", agentOptions.gender);
            options.set("race", agentOptions.race);
            options.set("skin", agentOptions.skin);
            options.set("eye", agentOptions.eye);
            options.set("hair", agentOptions.hair);
            options.set("cloth", agentOptions.cloth);
            options.set("height", agentOptions.height);
            options.set("weight", agentOptions.weight);
            options.set("clean", agentOptions.clean);
            options.set("beauty", agentOptions.beauty);
            options.set("strength", agentOptions.strength);
        })
        .catch(err => {
            throw new Error(err.message);
        });
    }

    static getAllOptions(){
        return options;
    }

    static getOptionsFor(key){
        if(options.has(key.toLowerCase())){
            let opts = options.get(key.toLowerCase())
            AgentInfo.logIt(key +": "+ opts)
            return opts;
        }
        return {};
    }
}
export default AgentInfo;
