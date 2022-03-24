
exports.logic = [

    { w:"main", z:"party" , n:"" ,  t:"start" , c:"$p{init:>2}$p{party:1}", e:"" , i:"Milling about: $lst{npc}" , o:"" , a: "$p{party:++}$x{delay:15-20}" },
    { w:"main", z:"party" , n:"" ,  t:"start" , c:"$p{init:>2}$p{party:!}", e:"" , i:"$m{party.exits1}" , o:"" , a: "$p{party:++}$x{delay:7-12}" },
    { w:"main", z:"party" , n:"" ,  t:"start" , c:"$p{init:2}", e:"" , i:"$m{party.init35}" , o:"" , a: "$p{init:++}$x{delay:15-20}" },
    { w:"main", z:"party" , n:"" ,  t:"start" , c:"$p{init:1}", e:"" , i:"$c{party.init5}"  , o:"" , a: "$p{init:++}$x{delay:15-20}" },
    { w:"main", z:"party" , n:"" ,  t:"start" , c:"$p{init:!}", e:"" , i:"Narrator: $c{party.init1}"  , o:"" , a: "$p{init:++}$x{delay:15-20}" },

    { w:"main", z:"outside" , n:"" ,  t:"start" , c:"$p{outside:2}", e:"" , i:" " , o:"" , a: "$p{outside:++}$x{delay:10-15}" },
    { w:"main", z:"outside" , n:"" ,  t:"start" , c:"$p{outside:1}", e:"" , i:"$m{outside.exits1}" , o:"" , a: "$p{outside:++}$x{delay:10-15}" },
    { w:"main", z:"outside" , n:"" ,  t:"start" , c:"$p{outside:!}", e:"" , i:"$c{outside.init1}" , o:"" , a: "$p{outside:++}$x{delay:10-15}" },

    { w:"main", z:"hallway" , n:"" ,  t:"start" , c:"", e:"" , i:"This hallway is well-travelled." , o:"" , a: "$x{delay:7-12}" },
    { w:"main", z:"stairwell" , n:"" ,  t:"start" , c:"", e:"" , i:"Be careful on the stairs leading up. There are doors to the bathroom and the office." , o:"" , a: "$x{delay:7-12}" },
    { w:"main", z:"bathroom" , n:"" ,  t:"start" , c:"", e:"" , i:"Please flush after every use. There is a door back to the hallway." , o:"" , a: "$x{delay:7-12}" },
    { w:"main", z:"office" , n:"" ,  t:"start" , c:"", e:"" , i:"This office could use better lighting. There is a door back to the hallway." , o:"" , a: "$x{delay:7-12}" },
    { w:"main", z:"landing" , n:"" ,  t:"start" , c:"", e:"" , i:"The door to the Theater is before you, and a hallway to the bedroom." , o:"" , a: "$x{delay:7-12}" },
    { w:"main", z:"theater" , n:"" ,  t:"start" , c:"", e:"" , i:"Nice leather recliners, comfy for watching movies. There are doors to the hallway and to the bathroom in the rear." , o:"" , a: "$x{delay:7-12}" },
    { w:"main", z:"upbathroom" , n:"" ,  t:"start" , c:"", e:"" , i:"There seems to be a dead guy in this bloody mess, with doors to the theater and the bedroom." , o:"" , a: "$x{delay:7-12}" },
    { w:"main", z:"bedroom" , n:"" ,  t:"start" , c:"", e:"" , i:"The bedroom with a window fire-escape and a door to the hallway." , o:"" , a: "$x{delay:7-12}" },
    { w:"main", z:"bedroom_hall" , n:"" ,  t:"start" , c:"", e:"" , i:"The door to the bedroom is before you. And a hallway to the stairwell." , o:"" , a: "$x{delay:7-12}" },

    { w:""    , z:""      , n:"" ,  t:"" , c:"", e:"" , i:"" , o:"" , a: "$x{delay:7-12}" }
]