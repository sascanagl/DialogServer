import https_fetch from "./https_fetch";

class LocationInfo {

    constructor(props){
        this.loaded = false;
        this.worldInfo = [];
        this.zoneInfo  = [];
        this.world   = "";
        this.zone    = "";
        this.npc     = "none";
        this.locHandler = "";
        this.npcHandler = "";

        this.getStartLocation = this.getStartLocation.bind(this);
        this.getZone = this.getZone.bind(this);
        this.getZones = this.getZones.bind(this);
        this.getNPCs = this.getNPCs.bind(this);
        this.setNPCs = this.setNPCs.bind(this);

        this.toString = this.toString.bind(this);
        this.loadGame = this.loadGame.bind(this);
        this.isLoaded = this.isLoaded.bind(this);
        this.setHandlers = this.setHandlers.bind(this);

        this.loadGame();
    }
    isLoaded(){
        return this.loaded;
    }

    loadGame = async() => {
        this.loaded = false;
        await https_fetch.getApplicationJson("/locations")
        .then( res => {
            console.log("LocationInfo async loading complete...");
            this.worldInfo = res.worldInfo;
            this.world = this.worldInfo[0].world;
            this.zoneInfo = res.zoneInfo;
            this.zone = this.zoneInfo[0].id;
            this.loaded = true;
        })
        .catch(err => {
            console.log("LocationInfo async loading returned with error...");
            throw new Error(err.message);
        });
    }

    static logIt( msg ){ /* console.log("LoacationInfo: "+ msg ); */ }

    setHandlers(props){
        this.locHandler = props.locHandler ?? "";
        this.npcHandler = props.npcHandler ?? "";
        return this;
    }

    toString(){
        return "World: "+ this.world.display +", "+
                "Zone: " + this.zone.display  +", "+
                "NPC: "  + this.npc;
    }

    /**
     * @return the starting zoneInfo zone object. normally zoneInfo[0]
     */
    getStartLocation() {
        return this.zoneInfo[0];
    }

    /**
     * Return the zoneInfo.zone matching the zone name provided.
     * @param {String} name -- the zoneInfo.zone to find
     * @return the matching zoneInfo object, or null.
     */
    getZone(id){
        LocationInfo.logIt("getZone for: "+ id);
        let match =  null;
        this.zoneInfo.forEach((z, i, arr)=>{
            if(z.id === id) {
                match = z;
            }
        })
        LocationInfo.logIt("getZone match = "+ match.id);
        return match;
    }

    /**
     * Return all the zone ids for this world/game
     * @return the array of zone ids in the world/game.
     */
    getZones(){
        LocationInfo.logIt("getZones...");
        return this.world.zones;
    }

    /**
     * Return the npcs array for the zone id provided.
     * @param {String} name -- the zoneInfo.zone id to find.
     * @return the matching zoneInfo.npcs array, or an empty array.
     */
    getNPCs(zid){
        LocationInfo.logIt("getNPCs for: "+ zid);
        let match =  [];
        this.zoneInfo.forEach((z, i, arr)=>{
            if(z.id === zid) {
                match = z.npcs;
            }
        })
        return match;
    }

    /**
     * Return the npcs array for the zone id provided.
     * @param {String} name -- the zoneInfo.zone id to find.
     * @return the matching zoneInfo.npcs array, or an empty array.
     */
    setNPCs(zid, npcs){
        LocationInfo.logIt("setNPCs for: "+ zid);
        this.zoneInfo.forEach((z, i, arr)=>{
            if(z.id === zid) {
                z.npcs = npcs;
            }
        })
    }
}
export default LocationInfo;
