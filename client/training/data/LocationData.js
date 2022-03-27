
exports.worldInfo = [{
        world:"dialog",
        zones: [ "lobby", "synonyms" , "pronouns", "messages", "random",
                 "chains", "examples", "test" ]
    }];

exports.zoneInfo = [{
        id: "lobby", display: "Department of Dynamic Dialog",
        npcs: [],
        adjacents: [ "synonyms" ]
    },{
        id: "synonyms", display: "Hall of Mirrors",
        npcs: [{ id: "twin1", display: "Gem", zone: "synonyms" },
               { id: "twin2", display: "Jem ", zone: "synonyms" }],
        adjacents: [ "lobby", "pronouns", "messages" ]
    },{
        id: "pronouns", display: "Hall of Reverence",
        npcs: [{ id: "fred", display: "Professor Peabody", zone: "pronouns" }],
        adjacents: [ "synonyms", "messages" ]
    },{
        id: "messages", display: "Expressions ",
        npcs: [{ id: "empress", display: "Empress Shawns", zone: "messages" }],
        adjacents: [ "synonyms", "pronouns", "random", "chains" ]
    },{
        id: "random", display: "Fork Fountain",
        npcs: [{ id: "randy", display: "Rand Ahm", zone: "random" }],
        adjacents: [ "messages", "chains", "examples" ]
    },{
        id: "chains", display: "Grand Central",
        npcs: [{ id: "switch", display:"Young Yatz", zone: "chains" }],
        adjacents: [ "messages", "random", "examples" ]
    },{
        id: "examples", display: "Library",
        npcs: [{ id: "sam"  , display: "Sophomore Sam", zone: "examples" }],
        adjacents: [ "random", "chains", "test" ]
    },{
        id: "test", display: "Proctor's Hall",
        npcs: [{ id: "han" , display: "Han Hawkeye", zone:"test" }],
        adjacents: [ "examples" ]
    }];
