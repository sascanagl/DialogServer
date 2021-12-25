//           options          value, Display, value, Display, ...
const genderOptions   = [{id:"male",     text:"Male"    }, {id:"female" , text:"Female" }];
const raceOptions     = [{id:"american", text:"American"}, {id:"british", text:"British"}, {id:"russian", text:"Russian"}];
const skinOptions     = [{id:"white",    text:"White"   }, {id:"brown"  , text:"Brown"  }, {id:"yellow" , text:"Yellow" }];
const eyeOptions      = [{id:"blue",     text:"Blue"    }, {id:"brown"  , text:"Brown"  }, {id:"green"  , text:"Green"  }];
const hairOptions     = [{id:"black",    text:"Black"   }, {id:"blond"  , text:"Blond"  }, {id:"red"    , text:"Red"    }];
const clothOptions    = [{id:"black",    text:"Black"   }, {id:"white"  , text:"White"  }, {id:"grey"   , text:"Grey"   }];
const heightOptions   = [{id:0, text:"Stub"  }, {id:1, text:"Average" } , {id:2, text:"Tower"     }];
const weightOptions   = [{id:0, text:"Skinny"}, {id:1, text:"Average" } , {id:2, text:"Portly"    }];
const cleanOptions    = [{id:0, text:"Filthy"}, {id:1, text:"Washed"  } , {id:2, text:"Spotless"  }];
const beautyOptions   = [{id:0, text:"Scaggy"}, {id:1, text:"Pleasing"} , {id:2, text:"Gorgeous"  }];
const strengthOptions = [{id:0, text:"Weak"  }, {id:1, text:"Capable" } , {id:2, text:"Like an OX"}];

// not a Map because this is going back to the client as JSON
class Agents{
    static agentOptions = {
        gender: genderOptions,
        race: raceOptions,
        skin: skinOptions,
        eye: eyeOptions,
        hair: hairOptions,
        cloth: clothOptions,
        height: heightOptions,
        weight: weightOptions,
        clean: cleanOptions,
        beauty: beautyOptions,
        strength: strengthOptions
    }
}
module.exports = Agents;