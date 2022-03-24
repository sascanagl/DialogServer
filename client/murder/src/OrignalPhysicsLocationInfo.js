import AgentInfo from "./AgentInfo";

//           options          value, Display, value, Display, ...
//export const worldOptions = [{id:"main", text:"Main"}, {id:"other", text:"Other"        }, {id:"limbo", text:"Limbo"}];
//export const zoneOptions  = [{id:"city", text:"City"}, {id:"outskirts", text:"Outskirts"}, {id:"lost", text:"Lost"  }];
//export const npcOptions   = [{id:"none", text:""    }, {id:"bob", text:"Bob"            }, {id:"joan", text:"Joan"  }];

export const worldInfo  = [{ world:"main", zones: [ "lobby" , "mirrors", "observatory", "study", "proofs", "hub", 
                                                    "empirical", "rational", "faith"  , "mind", 
                                                    "conscious", "unconscious", "collective_unconscious",
                                                    "parallels" ]}];

export const zoneInfo   = [ { id: "lobby", display: "Lobby", // start, before enter the Hall of Mirrors
                                             npcs: [
                                                 { id: "albert" , display: "Albert"  }, // you can't know anything until you know your self
                                                 { id: "thought", display: "Thought" }  // confusion with the world around you
                                             ],
                                             adjacents: [ "mirrors" ]
                            },
                            { id: "mirrors", display: "Maze of Mirrors", // becoming self aware
                                               npcs: [
                                                  { id: "socrates" , display: "Socks" }, // you can't know anything until you know your self
                                                  { id: "plato"    , display: "Cadet" }   
                                               ],
                                               adjacents: [ "lobby", "observatory" ]
                            },
                            { id: "observatory", display: "Observatory", // the world around you
                                               npcs: [
                                                   { id: "galileo" , display: "Galileo" },  
                                                   { id: "peers"   , display: "Peers"   }   
                                               ],
                                               adjacents: [ "mirrors", "study", "proofs" ]
                            },
                            { id: "study", display: "Study", // what do you know
                                               npcs: [
                                                  { id: "dewey" , display: "Dewey" },  
                                                  { id: "ben"   , display: "Ben"   }   
                                               ],
                                               adjacents: [ "observatory", "proofs" ]
                            },
                            { id: "proofs", display: "Book of Proofs", // how do you know what you know
                                               npcs: [
                                                  { id: "judge" , display: "Judge" },  
                                                  { id: "jury"  , display: "Jury"  }  
                                               ],
                                               adjacents: [ "observatory", "study", "hub" ]
                            },
                            { id: "hub", display: "Hub of Knowledge", // 6 different types of knowledge, unlocks the mind
                                               npcs: [
                                                  { id: "janus"     , display: "Janus"     }, 
                                                  { id: "librarian" , display: "Librarian" } 
                                               ],
                                               adjacents: [ "proofs", "empirical", "rational", "faith", "mind" ]
                            },
                            { id: "empirical", display: "Emperical Knowledge", // sense perception
                                               npcs: [
                                                  { id: "handel"  , display: "Handel"  }, 
                                                  { id: "listle"  , display: "Listle"  } 
                                               ],
                                               adjacents: [ "hub"  ]
                            },
                            { id: "rational", display: "Rational Knowledge", // application of reason
                                               npcs: [
                                                  { id: "richard" , display: "Richard" }, 
                                                  { id: "max"     , display: "Max"     }, 
                                                  { id: "gary"    , display: "Gary"    } 
                                               ],
                                               adjacents: [ "hub"  ]
                            },
                            { id: "faith", display: "Faith Knowledge", // knowledge thru belief without proof
                                               npcs: [
                                                  { id: "john" , display: "John" },
                                                  { id: "jude" , display: "Jude" },
                                                  { id: "joe"  , display: "Joe"  }
                                               ],
                                               adjacents: [ "hub"  ]
                            },
                            { id: "mind", display: "Mind Plane", // mind body dualism, materialism, conscious, unconscious, 
                                               npcs: [             // unlocks collective_unconscious
                                                  { id: "rene"  , display: "Rene"  },
                                                  { id: "robin" , display: "Robin" },
                                                  { id: "nyana" , display: "Nyana" }
                                               ],
                                               adjacents: [ "hub", "conscious", "unconscious", 
                                                            "collective_unconscious" ]
                            },
                            { id: "conscious", display: "Conscious", // forms of consciousness
                                               npcs: [
                                                  { id: "samuel" , display: "Samuel" },
                                                  { id: "thomas" , display: "Thomas" }
                                               ],
                                               adjacents: [ "mind", "unconscious", "collective_unconscious" ]
                            },
                            { id: "unconscious", display: "Unconscious", // unconscious
                                               npcs: [
                                                { id: "bishop" , display: "Bishop" }
                                               ],
                                               adjacents: [ "mind", "conscious", "collective_unconscious" ]
                            },
                            { id: "collective_unconscious", display: "Collective Unconscious", // collective unconscious
                                               npcs: [
                                                  { id: "apollo" , display: "Apollo" }
                                               ],
                                               adjacents: [ "mind", "conscious", , "unconscious", "parallels" ]
                            },
                            { id: "parallels", display: "Parallels", // how this applies to quantum physics
                                               npcs: [
                                                  { id: "albert" , display: "Albert" },
                                                  { id: "max" , display: "Max" }
                                               ],
                                               adjacents: [ ]  // end of path
                            }
];
class LocationInfo {

    constructor(props){
        this.world   = props.world         ?? "main";
        this.zone    = props.zone          ?? zoneInfo[0].id;
        this.npc     = props.npc           ?? "none";
        this.locHandler = props.locHandler ?? "javascript:void()";          
        this.npcHandler = props.npcHandler ?? "javascript:void()";        
        
        this.toString   = this.toString.bind(this);
    }
    toString(){
        return "World: "+ this.world +", "+
               "Zone: " + this.zone  +", "+
               "NPC: "  + this.npc;
    }

    /**
     * @return the starting zoneInfo zone object. normally zoneInfo[0]
     */
    static getStartLocation() {
        return zoneInfo[0];
    }

    /**
     * Return the zoneInfo.zone matching the zone name provided.
     * @param {String} name -- the zoneInfo.zone to find
     * @return the matching zoneInfo object, or null.
     */
    static getZone(id){
        console.log("LocationInfo.getZone for: "+ id);
        let match =  null;
        zoneInfo.forEach((z, i, arr)=>{
            //console.log("LocationInfo.getZone id: "+ z.id );
            if(z.id == id) {
                match = z;
            }
        })
        console.log("LocationInfo.getZone match = "+ match.id);
        return match;
    }

    static toString(zone){
        //console.log("LocationInfo.toString for: "+ zone.id);
        if(zone == null) { return "<null>";};
        return "Zone: id: "+zone.id +", display: "+ zone.display +", "+
               "npcs: "+ zone.npcs +", adjacents: "+ zone.adjacents;
    }
}
export default LocationInfo;
