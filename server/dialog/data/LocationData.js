/**
 * This represents the start state of a new game.
 * Current state of a single-player game is stored on the client.
 */
class LocationData {

    static worldInfo  = [{
        world:"main",
        zones: [ "party", "outside" , "hallway", "stairwell", "bathroom",
                 "office", "landing", "theater", "upbathroom", "bedroom",
                 "bedroom_hall" 
        ]
    }];
    static zoneInfo   = [{ 
        id: "party", display: "Great Room", // the main party room where everyone is entertained
        npcs: [
            { id: "pauline"  , display: "Pauline Thompson", zone:"party" }, 
            { id: "fiona"    , display: "Fiona McAllister", zone:"party" },   
            { id: "margaret" , display: "Margaret Chun"   , zone:"party" },   
            { id: "louis"    , display: "Louis Cagliostro", zone:"party" },   
            { id: "tim"      , display: "Tim Kane"        , zone:"party" },   
            { id: "harold"   , display: "Professor Harold Chun", zone:"party"},   
            { id: "bobby"    , display: "Bobby Herrara"   , zone:"party" },
            { id: "joe"      , display: "Officer Joe Friday" , zone:"party" },
            { id: "bill"     , display: "Officer Bill Gannon", zone:"party" }
        ],
        adjacents: [ "outside", "hallway" ]
    },
    {   id: "outside", display: "Outdoor Patio", // an outdoor space off the great room
        npcs: [],
        adjacents: [ "party" ]
    },
    {   id: "hallway", display: "Hallway", // connecting the great room to the rest of the house
        npcs: [],
        adjacents: [ "party", "stairwell" ]
    },
    {   id: "stairwell", display: "Stairwell", // connecting the great room to the rest of the house
        npcs: [],
        adjacents: [ "hallway", "office", "bathroom", "landing" ]
    },
    {   id: "bathroom", display: "Bathroom", // at stairwell across from office/den
        npcs: [],
        adjacents: [ "stairwell" ]
    },
    {   id: "office", display: "Office", // at stairwell across from bathroom
        npcs: [],
        adjacents: [ "stairwell" ]
    },
    {   id: "landing", display: "Upstairs Landing", // top of stairs at theater
        npcs: [
            { id: "jim"  , display: "Officer Jim Reed", zone:"landing"} 
        ],
        adjacents: [ "stairwell", "theater", "bedroom_hall" ]
    },
    {   id: "theater", display: "Theater", // top of stairwell at landing. bathroom in back.
        npcs: [
            { id: "david" , display: "David Addison Jr.", zone:"theater"  } 
        ],
        adjacents: [ "landing", "upbathroom"  ]
    },
    {   id: "bedroom_hall", display: "Bedroom Hall", // end of upstairs hallway at bedroom door
        npcs: [
            { id: "pete"  , display: "Officer Pete Malloy", zone:"bedroom_hall" } 
        ],
        adjacents: [ "landing", "bedroom" ]
    },
    {   id: "bedroom", display: "Bedroom", // Upstairs bedroom with fire escape
        npcs: [
            { id: "maddie" , display: "Maddie Hayes", zone:"bedroom" } 
        ],
        adjacents: [ "bedroom_hall", "upbathroom" ]
    },
    {   id: "upbathroom", display: "Connecting Bathroom", // connects theater and bedroom
        npcs: [
            { id: "rick" , display: "Rick Martin", zone:"upbathroom"}, // Mr. Body.  Deceased. 
            { id: "john" , display: "Paramedic John Cage", zone:"upbathroom"},
            { id: "roy"  , display: "Paramedic Roy DeSoto", zone:"upbathroom"}
        ],
        adjacents: [ "bedroom", "theater" ]
    }];
}
module.exports = LocationData;