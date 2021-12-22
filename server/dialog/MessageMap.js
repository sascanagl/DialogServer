const SynonymMap = require("./SynonymMap");
const MarkedMessage = require("./MarkedMessage");

// message item prefixes:
// $s{rootWord}  = SynonymMap.getSynonym(rootWord)
// $p{propName}  = gameState.player       object property
// $l(propName)  = gameState.location     object property
// $n{propName}  = gameState.location.npc object property
// $x(propName)  = gameState.loop         object property
// $i{propName}  = item                   object property

/**
 * Map<string,string> \
 * "key" - string - id of the message. \
 * "value" - string - the message template.
 */
const messages = new Map([

  [ "amb.rand.noise" , "$s{uc:nearby} you hear $s{wrestling} in the $s{bushes}."    ],  [ "amb.rand.noise1", "A $s{quiet} $s{rumble} of thunder brings $s{notice} of a pending $s{storm}."],
  [ "amb.rand.noise2", "An $s{overhead} $s{flock} of birds $s{flies} off into the $s{distance}."],
  [ "amb.rand.noise3", "The $s{wind} $s{whispers} $s{softly} through the $s{trees}."],

  [ "amb.silence" , "The $s{silence} is $s{deafening}..."    ],
  [ "amb.silence2", "Your ears $s{ring} with the $s{buzz} of your own making..."],

  [ "all.well" , "Things were going really well." ],
  [ "all.eager", "I was very eager to please." ],
  [ "all.recall", "I can remembering a little more detail." ],
  [ "all.short.story" , "To make a long story short" ],
  [ "all.not.seeing" , "I don't remember seeing that."], 

  [ "party.init1" , "$s{uc:Welcome} to 'The Business of Murder'."], 
  [ "party.init5" , "You have just $s{entered} the $s{apartment} of Rick Martin."], 
  [ "party.init10" , "The $s{evening} was $s{intended} to be an $s{informal} social $s{gathering} of $s{coworkers} and $s{academics}."], 
  [ "party.init15" , "However, at some point, Professor Harold Chun stumbled onto the unmistakenly dead body of their host."], 
  [ "party.init20" , "$s{uc:3:Rick} body was found sprawled on the floor of the upstairs bathroom." ], 
  [ "party.init25" , "$s{uc:3:Rick} head was bloody, and he was laying face down just inside the bathroom door."], 
  [ "party.init30" , "First responders and police were called and have already arrived on the scene."], 
  [ "party.init35" , "You have been tasked to investigate and attempt to identify potential suspects."], 
  [ "party.exits1" , "From here you can go outside to the patio, or enter the hallway."], 

  [ "outside.init1" , "The outside patio looks fairly undisturbed except for a few cigarette butts littered about."], 
  [ "outside.init5" , "There isn't much else here to look at. Just a few cheap plastic lounge chairs with cigarette burn scars."], 
  [ "outside.exits1" , "From here you can only go back inside."], 

  [ "clue.body1" , "The body has a very hard blow to the back of the head, which bled significantly--probably cracking the skull." ],
  [ "clue.body5" , "The body also has a gash on the forehead which surely bled profusely." ], 
  [ "clue.body10" , "It should be noted this blood seems to correspond with smears of fresh blood found on the step inside the theater." ],
  [ "clue.body15" , "A thorough search of the body reveals this wasn't a mugging or robbery, as it appears like nothing was taken." ],
  [ "clue.body20" , "The body had a key-chain with car key, apartment key, mailbox key, office key, and various others." ],
  [ "clue.body25" , "The wallet still contained $185 cash, credit cards, Driver's License, university ID, and an old photo of Fiona." ],
  [ "clue.body30" , "We also found a checkbook. With copies of checks written to utilities, credit card payments, etc.." ],
  [ "clue.body35" , "Interestingly, there were several large checks made out to Louis Cagliostro, amounting to $3500 over the past 4 months." ],
  [ "clue.body40" , "We also found on the body, one Silver Fountain Pen." ],

  [ "clue.house1" , "A search of the rest of the apartment was generally long and inconclusive, but for one odd fact." ],
  [ "clue.house5" , "The fire escape exit in the adjacent room to the bathroom was unlatched and slightly ajar." ],
  [ "clue.house10" , "The search also found a number of data disks in disarray on the desk in the Den, alongside a pile of letters." ],

  [ "clue.note1" , "Lying on the floor next to the body we found a crumpled note." ],
  [ "clue.note5" , "The note is a lined scrap of notepad paper and was hand-written with black felt-tip pen." ],
  [ "clue.note10" , "This note was short and simple, 'Pay up or Die!'" ],

  [ "clue.weapon1" , "Lying on the floor next to the body was a marble paperweight." ], 
  [ "clue.weapon5" , "The paperweight is marked with blood, hair, and some skin stuck to it." ],
  [ "clue.weapon10" , "Obviously, we can assume this paperweight was likely the murder weapon." ],
  [ "clue.weapon15" , "We can guess some of you might recognize this paperweight or know where it came from." ],

  [ "friday.quot1", "This is the city--Chicago, Illinois."],
  [ "friday.quot5", "I carry a badge."],
  [ "friday.quot10", "Badge 714."],
  [ "friday.quot15", "My name's Friday."],
  [ "friday.quot20", "Just the facts, please."],
  [ "friday.quot25", "I'm a cop, a flatfoot, a bull, a dick, $s{John Law}… they call us everything, but never a policeman."],
  [ "friday.quot30", "I don't care what undercover rock you crawled out from."],
  [ "friday.quot35", "There's a dress code for detectives in Robbery-Homicide."],
  [ "friday.quot40", "Just like every other foaming, rabid psycho in this city with a foolproof plan, they've forgotten they're facing the city's finest."],
  [ "friday.quot45", "Whoever did this, they're facing the single finest detective force ever assembled."],
  [ "friday.quot50", "I hate you, Lois."],

  [ "friday.quot55", "My partner and I,"],
  [ "friday.quot60", "Look out. Muppets."],
  [ "friday.quot65", "Your attention, please."],
  [ "friday.quot70", "Now, let me tell you something."],
  [ "friday.quot75", "Listen, hotshot."],
  [ "friday.quot80", "I'm gonna tell yo something right now."],

  [ "friday.quot85", "There are two things that clearly differentiate the human species from animals."],
  [ "friday.quot90", "We use Cutlery."],
  [ "friday.quot95", "We're capable of controlling our sexual urges."],  
  [ "friday.quot100", "Now, you might be an exception, but don't drag me down into your private Hell."],
  
  [ "friday.quot105", "Did it ever occur to you by going eight miles an hour slower, we might save some gas and ease the burden on the poor taxpayers that pay our salaries?"],
  [ "friday.quot110", "This city isn't perfect."],
  [ "friday.quot115", "We need a smut-free life for all of our citizens, cleaner streets, better schools, and a good hockey team."],
  [ "friday.quot120", "We're gonna put 'em where their kind always ends up."],
  [ "friday.quot125", "In a seven by seven foot grey-green metal cage in the fifteenth floor of some hundred-year-old penitentiary."],
  [ "friday.quot130", "With damp, stinking walls and wooden plank for a bed."],
  [ "friday.quot135", "I don't care for you or for the putrid sludge you're troweling out."],
  [ "friday.quot140", "May I remind you that only this morning Commissioner Kirkpatrick threatened to turn me into a...civilian."],
  [ "friday.quot145", "Just go ahead and chuckle away, mister."],
  [ "friday.quot150", "I don't hear God laughing."],

  [ "friday.quot155", "The story your about to read is true: the names have been changed to protect the innocent."],
  [ "friday.quot160", "For example, Al Capone is now called 'Lois Cagliostro'."],
  [ "friday.quot165", "Maybe Ma Baker is now called 'Fiona McAllister'."],
  [ "friday.quot170", "Perhaps The Black Widow is now called 'Margaret Chun'."],
  [ "friday.quot175", "Could be Baby Face Nelson is now called 'Rick Martin'."],
  [ "friday.quot180", "Might be Ice Pick Willie is now called 'Tim Kane'."],
  [ "friday.quot185", "Like if Big Tuna is now called 'Bobby Herrara'."],
  [ "friday.quot190", "More likely Bonnie Parker is now called 'Pauline Thompson'."],
  [ "friday.quot195", "Possibly Pretty Boy Floyd is now called 'Harold Chun'."],

  [ "friday.quot200", "I think we're finished here."],

  [ "bobby.name1" , "I'm Bobby." ],
  [ "bobby.name5" , "I'm Bobby Herrara." ],
  [ "bobby.bio1" , "I just graduated from $s{UC}." ],
  [ "bobby.bio5" , "I have a B.A. from $s{UC}." ],
  [ "bobby.bio10" , "I currently work with a software development firm downtown." ],
  [ "bobby.bio15" , "Everything was fine until $s{1:Fiona} decided to get back together with her Ex." ],
  [ "bobby.bio20" , "$s{uc:1:Fiona} and I had been dating for about 5 months." ],
  [ "bobby.bio25" , "$s{uc:1:Fiona} is smart, glamorous, and always looking for something new." ],
  [ "bobby.bio30" , "$s{uc:1:Fiona} does have some expensive tastes." ],
  [ "bobby.bio35" , "I got the distinct feeling $s{1:Fiona} was disappointed with our low-budget lifestyle." ],
  [ "bobby.bio40" , "I tried for a promotion at work, putting in some extra hours." ],
  [ "bobby.bio45", "Then I found out that during one of my long nights at the office, $s{1:Fiona} spent it with her ex-boyfriend Rick." ],
  [ "bobby.bio50", "I got the distinct feeling $s{1:Fiona} was disappointed with our low-budget lifestyle." ],
  [ "bobby.bio55", "$s{uc:1:Fiona} has been avoiding me and spending more time with $s{2:Rick}." ],
  [ "bobby.bio60", "I've done some checking up on $s{2:Rick}." ],
  [ "bobby.bio65", "$s{uc:1:Rick} is a Phd student in Finance." ],
  [ "bobby.bio70", "I couldn't find out much about $s{3:Rick) work." ],
  [ "bobby.bio75", "$s{1:Rick} has been working on something for the past two years." ],
  [ "bobby.bio80", "I get the impression $s{1:Rick} is not doing well." ],
  [ "bobby.bio85", "$s{1:Rick} must be doing something right." ],
  [ "bobby.bio90", "$s{1:Fiona} has gotten some expensive gifts from $s{2:Rick}." ],
  [ "bobby.bio95", "I also heard the wife of $s{3:Rick} professor stayed at $s{3:Rick} apartment one weekend." ],

  [ "bobby.eve1", "At 7 I was at a bar downtown with a friend who told me these things about Rick." ],
  [ "bobby.eve5", "After a few beers, I decided to head out to the party." ],
  [ "bobby.eve10", "I remember I got here around 7:30." ],
  [ "bobby.eve15", "After a few beers, I decided to head out to the party." ],
  [ "bobby.eve20", "It wasn't long before Fiona dissed me and walked off." ],
  [ "bobby.eve25", "$s{uc:1:Fiona} was definitely in a bad mood." ],
  [ "bobby.eve30", "It only about 5 minutes later that woman Pauline showed up." ],
  [ "bobby.eve35", "$s{uc:1:Pauline} made a beeline for Rick and together they went down the hallway to the stairwell." ],
  [ "bobby.eve40", "I tried to follow Rick and Pauline, but Tim gave me an odd look.  So I let it go." ],
  [ "bobby.eve45", "I then milled around the party for a while." ],
  [ "bobby.eve50", "A guy named Louis and I spoke for a bit while I help myself to a few more drinks." ],
  [ "bobby.eve55", "$s{uc:1:Louis} didn't seem very friendly, as I recall." ],
  [ "bobby.eve60", "After about an hour I saw Rick and Pauline head upstairs with Fiona not far behind." ],
  [ "bobby.eve65", "About 10 minutes later I went upstairs myself and saw Pauline outside the theater room." ],
  [ "bobby.eve70", "I went ahead inside the theater while everyone else seemed to be coming out." ],
  [ "bobby.eve75", "There didn't seem to be anyone left inside when I walked in." ],
  [ "bobby.eve80", "Soon Fiona came into the theater, followed by Pauline, then just about everyone else." ],

  [ "bobby.others1", "I think I determined that Harold was $s{3:Rick} professor whose wife was sleeping with $s{2:Rick}." ],
  [ "bobby.others5", "Margaret, I believe, is the professor's wife." ],
  [ "bobby.others10", "Tim and Pauline were new to me, too. I never heard of them before tonight." ],
  [ "bobby.others15" , "Fiona, of course, is my girl. But she seems a bit confused about that right now." ],

  [ "fiona.name1" , "I'm Fiona." ],
  [ "fiona.name5" , "I'm Fiona McAllister." ],
  [ "fiona.bio1" , "I'm a second-year MBA student at $s{UC}." ],
  [ "fiona.bio5" , "I'm doing post-graduate studies at $s{UC}." ],
  [ "fiona.bio10" , "Lately, my personal life has been getting rather complicated." ],
  [ "fiona.bio15" , "It was about 5 months ago I started going out with Bobby." ],
  [ "fiona.bio20" , "$s{uc:1:Bobby} is a decent guy, but he is a little possessive." ],
  [ "fiona.bio25" , "$s{uc:1:Bobby} also has a bit of a drinking problem." ],
  [ "fiona.bio30" , "$s{uc:1:Bobby} got an apartment at Hyde Park after graduating last year." ],
  [ "fiona.bio35" , "A few weeks ago I met up with my old ex, Rick." ],
  [ "fiona.bio40" , "$s{uc:1:Rick} is a PhD student in Finance." ],
  [ "fiona.bio45" , "I broke up with $s{2:Rick} about 2 1/2 years ago." ],
  [ "fiona.bio50" , "$s{uc:1:Rick} just wouldn't open up to me. (sigh)" ],
  [ "fiona.bio55" , "$s{uc:1:Rick} is extremely quiet about his feelings, his work, his past...everything." ],
  [ "fiona.bio60" , "$s{uc:1:Rick} is a good listener, and a good shoulder to rest on." ],
  [ "fiona.bio65" , "$s{uc:1:Rick} seems a lot more laid back now, and a little more confident." ],
  [ "fiona.bio70" , "$s{uc:1:Rick} recently let it slip that he has come into a lot of money somehow." ],
  [ "fiona.bio75" , "But of course, $s{1:Rick} won't talk about it." ],
  [ "fiona.bio80" , "I've gotten back together with Rick, and Bobby is not very happy about it." ],
  [ "fiona.bio85" , "$s{uc:1:Bobby} has been following me around a lot, and also hassling Rick." ],

  [ "fiona.bio90" , "I went with Rick to the office party, which turned out to be a real disaster." ],
  [ "fiona.bio95" , "Bobby showed up at the party and started to harass me." ],
  [ "fiona.bio100" , "Some woman showed up that Rick knew and the two of them walked off together leaving me with Bobby." ],
  [ "fiona.bio105" , "Later, Rick came back and introduced the woman as Pauline, and they were old friends." ],
  [ "fiona.bio110" , "I got the feeling, though, that Rick and Pauline were more than just 'old friends'." ],
  [ "fiona.bio115" , "I don't think $s{1:Rick} was having an affair, but he was definitely hiding something." ],
  [ "fiona.bio120" , "$s{uc:1:Rick} was angry with Pauline, and maybe even a little ashamed." ],
  [ "fiona.bio125" , "Then Rick decided to invite just about everyone to join him upstairs in the theater for a movie." ],
  [ "fiona.bio130" , "Rick and Pauline were the first ones to head upstairs." ],
  [ "fiona.bio135" , "I stepped outside to get away from Bobby, and to think just a bit." ],
  [ "fiona.bio140" , "When I headed upstairs for the movie, I was surprised to see only Bobby inside and no one else." ],
  [ "fiona.bio145" , "Bobby and I then watched everyone else arrive in the theater.  Everyone except Rick." ],

  [ "fiona.eve1" , "Tim and I got to the office party right around 7." ],
  [ "fiona.eve5" , "Bobby arrived around 7:30, and Pauline about 10 minutes later." ],
  [ "fiona.eve10" , "Rick and Pauline were talking at the stairwell for about 10 minutes." ],
  [ "fiona.eve15" , "Rick came back to the party and introduced Pauline to me just before 8. " ],
  [ "fiona.eve20" , "After that, $s{1:Rick} started to invite everyone up to the theater for a movie starting around 9." ],
  [ "fiona.eve25" , "$s{uc:1:Rick} spent most of his time mingling and inviting people to the movie." ],
  [ "fiona.eve30" , "I got to talk with Rick for a little bit, but around 8:30 Pauline showed up again." ],
  [ "fiona.eve35" , "They apparently had to talk about something, so they left together and headed upstairs." ],
  [ "fiona.eve40" , "I saw Bobby heading my way so I sort of dodged him and eventually headed upstairs myself." ],
  [ "fiona.eve45" , "It was just before 9 when I got up to the theater and found Bobby was already there, but noone else." ],
  [ "fiona.eve50" , "Soon Pauline came in. Tim a few minutes later. Professor Chun and his wife just after that." ],
  [ "fiona.eve55" , "I believe Louis got there last at around 9:15." ],

  [ "fiona.others1" , "Bobby, of course, is my jealous ex-boyfriend." ],
  [ "fiona.others5" , "As usual, Bobby currently seems more than a little drunk." ],
  [ "fiona.others10" , "Louis is a friend of Tim's." ],
  [ "fiona.others15" , "Tim is an MBA with some kind of connections to the Mafia, I heard." ],
  [ "fiona.others20" , "Despite Tim's Mafia connections, Rick seems pretty friendly with him anyway." ],
  [ "fiona.others25" , "Tim is Rick's office mate.  They are friends, but not particularly close." ],
  [ "fiona.others30" , "I don't really know Professor Chun and his wife, though we were introduced." ],
  [ "fiona.others35" , "Pauline is a complete mystery to me. I had never heard of her before tonight." ],
  [ "fiona.others40" , "Rick introduced $s{2:Pauline} as a high school friend, but I sense there was something else between them." ],

  [ "fiona.arg1" , "The photo in his wallet is from when Rick and I dated a long time ago." ],
  [ "fiona.arg5" , "I can imagine that Bobby might be jealous, but I can't believe he would have killed Rick." ],
  [ "fiona.arg10" , "Bobby was pretty drunk. I don't know...I don't know what he might have done." ],
  [ "fiona.arg15" , "Most of us saw that Pauline left the party and headed upstairs with Rick.  The 2 of them, alone." ],
  [ "fiona.arg20" , "Rick and Pauline seemed to be at odds about something this evening.  I don't know what, though." ],

  [ "harold.name1" , "I'm Harold." ],
  [ "harold.name5" , "I'm Harold Chun." ],
  [ "harold.bio1" , "I'm a Professor of Finance at $s{UC} Business school." ],
  [ "harold.bio5" , "It was seven years ago I left Harvard and made my home here." ],
  [ "harold.bio10" , "I've been doing research in Option Pricing, but that hasn't been progressing like it should." ],
  [ "harold.bio15" , "My experimental work in Option Pricing is not going so well." ],
  [ "harold.bio20" , "Still, I like it here.  The teaching is fun, and I have my wife Margaret." ],
  [ "harold.bio25" , "I met $s{2:Margaret} 5 years ago at the Art Institute where she works." ],
  [ "harold.bio30" , "$s{uc:1:Margaret} is wonderful, but I feel we've been growing apart lately." ],
  [ "harold.bio35" , "$s{uc:1:Margaret} is always looking for something new, and I often have trouble keeping up with her." ],
  [ "harold.bio40" , "It doesn't help that my graduate students Tim and Rick have done next to nothing." ],
  [ "harold.bio45" , "I see Tim as a con man that somehow tricked me into taking him on." ],
  [ "harold.bio50" , "Rick, however, was quite a promising student two years ago." ],
  [ "harold.bio55" , "After $s{3:Rick} initial flurry of work, however, he has slowed himself to a crawl and done little." ],
  [ "harold.bio60" , "Now all these research issues concern me since my tenure is up for review." ],
  [ "harold.bio65" , "These things have made me edgy and irritable, but there is little I can do about it." ],
  [ "harold.bio70" , "About a month ago, I even went into Rick's office to see if he was hiding anything, but I found nothing." ],
  [ "harold.bio75" , "I was worried that Rick might have noticed, but he hasn't mentioned it." ],
  [ "harold.bio80" , "It concerns me because only Rick, Tim, and myself have keys to our offices." ],

  [ "harold.bio85" , "My wife and I went to the office party at Rick's place." ],
  [ "harold.bio90" , "I wasn't up for it, but my wife insisted we go and relax for a while." ],
  [ "harold.bio95" , "I didn't really enjoy it, but Margaret talked it up with everyone for about an hour." ],
  [ "harold.bio100" , "When $s{1:Margaret} finally found me again, we went into the hall to talk in private." ],
  [ "harold.bio105" , "I told her I didn't like how she disappeared on me, and she became very upset. So I apologized." ],
  [ "harold.bio110" , "Then Tim interrupted us coming out from the stairwell in a big rush." ],
  [ "harold.bio115" , "$s{uc:1:Tim} talked nervously with us for a bit, then walked off--not even noticing we were in the middle of a disagreement." ],
  [ "harold.bio120" , "Margaret went back to the party while I went outside to have a smoke for a while." ],
  [ "harold.bio125" , "After about 20 minutes I felt good enough to head back inside to the party." ],
  [ "harold.bio130" , "I found Margaret and we agreed to go upstairs to the theater for the movie." ],

  [ "harold.eve1" , "I was in shock when I discovered Rick's body!" ],
  [ "harold.eve5" , "We arrived at Rick's just a few minutes after 7." ],
  [ "harold.eve10" , "I mostly hung around the refreshment, talked with professors, but I was mostly bored." ],
  [ "harold.eve15" , "Finally around 8:05 I went to Margaret and we had our little scuffle in the hallway." ],
  [ "harold.eve20" , "We argued for less than a minute, but the apologies took several more." ],
  [ "harold.eve25" , "I had just agreed to be a little more open when Tim barged in on us from the stairwell." ],
  [ "harold.eve30" , "$s{uc:1:Tim} seemed to be in a rush, though he did stop and talk to us for a moment before moving on." ],
  [ "harold.eve35" , "I went outside to smoke by myself for about 20 minutes.  It was 8:30 when I came back inside to the party." ],
  [ "harold.eve40" , "Margaret and I worked things out and I agreed to go with her upstairs to the theater after we shared another drink." ],
  [ "harold.eve45" , "We went upstairs a few minutes late.  We didn't get up there until about 9:07." ],
  [ "harold.eve50" , "When we arrived into the theater we saw these strangers--Bobby, Fiona, and Pauline already there." ],
  [ "harold.eve55" , "Tim had arrived just ahead of us, and Louis arrived last.  Maybe 10 minutes later than my wife and I." ],
  [ "harold.eve60" , "While we were all wondering where Rick had gone off to, I went in the back to use the bathroom." ],
  [ "harold.eve55" , "I found Rick in the bathroom, unmistakenly dead.  The back of his head was all bloody as he lay face down just inside the door." ],

  [ "harold.others1" , "Of course, I already knew Margaret and Tim." ],
  [ "harold.others5" , "Louis I knew as a friend of Rick's. And I think he is connected with the Mafia, somehow." ],
  [ "harold.others10" , "Of course, I already knew Margaret and Tim." ],
  [ "harold.others15" , "Fiona, Bobby, and Pauline were complete strangers to me. I never even met them during the party." ],

  [ "louis.name1" , "I'm Louis." ],
  [ "louis.name5" , "I'm Louis Cagliostro." ],
  [ "louis.name10" , "I'm Louis Ferdinand Cagliostro." ],
  [ "louis.bio1" , "I'm an MBA student at $s{UC}." ],
  [ "louis.bio5" , "Dom Guiseppe is my cousin and, yes, he's with the local Mafia." ],
  [ "louis.bio10" , "I was doing pretty good at $s{UC} and Dom was hoping I'd be a trusted manager and investment advisor." ],
  [ "louis.bio15" , "I did well as an undergrad, and then went into the Business school having already taken some of the classes." ],
  [ "louis.bio20" , "Some people were scared away by the family, but I still had some friends." ],
  [ "louis.bio25" , "3 years ago I sat in on the Option Pricing class where I met Rick and Tim." ],
  [ "louis.bio30" , "Rick and Tim were both first year grad students, but they were more practical than other ivory tower types." ],
  [ "louis.bio35" , "They helped me on some assignments and I help them on others." ],
  [ "louis.bio40" , "About a year later, Rick came to me asking to borrow some money--a lot of money." ],
  [ "louis.bio45" , "$s{uc:1:Rick} said he had acquired a number of gambling debts, but had a solid plan to make it back." ],
  [ "louis.bio50" , "I loaned $s{2:Rick} the money with a firm warning that non-payment would mean dire consequences." ],
  [ "louis.bio55" , "$s{uc:1:Rick} has slowly but agreeably paid back the debt, plus the interest." ],
  [ "louis.bio60" , "Unfortunately, $s{3:Rick} office-mate Tim found out about the loan and also came 'round asking for money." ],
  [ "louis.bio65" , "I didn't think of a good reason to say 'no', so I went ahead and loaned $s{2:Tim} the money." ],
  [ "louis.bio70" , "Unfortunately, $s{1:Tim} keeps losing on these get-rich-quick schemes, and is continually late on his payments." ],
  [ "louis.bio75" , "$s{uc:1:Tim} can't seem to learn his lesson.  He keeps taking those long shots, and keeps losing money." ],

  [ "louis.bio80" , "I went to the party at Rick's tonight to enjoy myself, and to deliver a warning to Tim." ],
  [ "louis.bio85" , "I noticed right away that $s{1:Tim} was avoiding me, so I wrote a brief 'Pay or Die!' note for him." ],
  [ "louis.bio90" , "When Tim went to get a drink, I went and ordered my own and slipped the note to him." ],
  [ "louis.bio95" , "Of course, $s{1:Tim} quickly turned pale, slipped away, and again made himself scarce." ],
  [ "louis.bio100" , "Confident the note had the desired effect, I was able to relax and enjoy the rest of the evening." ],
  [ "louis.bio105" , "Rick seemed busy most of the evening, and then some woman showed up looking for him." ],
  [ "louis.bio110" , "That wasn't surprising since some guy had just told me he lost his girlfriend to Rick." ],
  [ "louis.bio115" , "As the party started to die down, Rick invited most of us to join him upstairs for videos in his theater." ],
  [ "louis.bio120" , "I stayed downstairs a little longer than most enjoying the free drinks." ],
  [ "louis.bio125" , "But after I realized most everyone had gone upstairs, I headed that way myself." ],
  [ "louis.bio130" , "When I got upstairs into the theater, I was surprised to see everyone except Rick. $s{uc:1:Rick} wasn't there." ],

  [ "louis.eve1" , "While the office party started at 7, I didn't arrive until about 7:15." ],
  [ "louis.eve5" , "First thing I did was track Tim down and remind him of his responsibilities with my note." ],
  [ "louis.eve10" , "After delivering the note, I was able to enjoy myself for a while just mingling." ],
  [ "louis.eve15" , "Around 7:40 this woman, Pauline, arrived and Rick dragged her off for a while to have a talk." ],
  [ "louis.eve20" , "Eventually, they came back, but Pauline slipped away before I could meet her." ],
  [ "louis.eve25" , "Then I was accosted by this guy, Bobby, talking about how Rick had stolen his girlfriend." ],
  [ "louis.eve30" , "It was around 8:10 when Rick came 'round and invited me for the get-together upstairs at 9." ],
  [ "louis.eve35" , "$s{uc:1:Rick} said he was kind of busy so I went back to mingling for a while." ],
  [ "louis.eve40" , "I didn't notice anything unusual while milking those last drinks before heading upstairs." ],
  [ "louis.eve45" , "I didn't get upstairs to the theater until about 9:15." ],

  [ "louis.others1" , "Tim, of course, is Rick's office mate, and he owes me quite a bit of money." ],
  [ "louis.others5" , "Fiona is an old flame of Rick's and they seem to have gotten back together." ],
  [ "louis.others10" , "Rick seems to think $s{1:Fiona} doesn't like me very much, but other than that she seemed alright to me." ],
  [ "louis.others15" , "Harold is Rick's and Tim's professor, but I don't really know him. I never took his class." ],
  [ "louis.others20" , "I only just met Harold's wife, Margaret, tonight." ],
  [ "louis.others25" , "Bobby talked to me a lot tonight.  He's all cracked up about losing his girlfriend Fiona to Tim." ],
  [ "louis.others30" , "This woman, Pauline, you never even heard of until tonight." ],

  [ "louis.arg1" , "We need to find out who did this." ],
  [ "louis.arg5" , "We can't wait on the cops to come and figure this out." ],
  [ "louis.arg10" , "If we can find out who did this...well...jail may be too good for this kind of scum." ],
  [ "louis.arg15" , "If you're not willing to help find the murderer, then maybe that's because it is you!" ],
  [ "louis.arg20" , "Those checks are perfectly legit.  Rick borrowed money from me, and he has been paying it back." ],
  [ "louis.arg25" , "I had no reason to want $s{2:Rick} dead.  As you can see, he's been paying back his loan just fine." ],
  [ "louis.arg30" , "If I were to have murdered $s{2:Rick}, that would have ended his loan payments." ],
  [ "louis.arg35" , "I had nothing to gain and all those future payments to lose. You're crazy if you think I did it!" ],
 
  [ "louis.ideas20" , "Look, that note found with Rick, that wasn't his." ],
  [ "louis.ideas25" , "I wrote that note as a joke and gave it to Tim earlier tonight." ],

  [ "marge.name1" , "I'm Margaret." ],
  [ "marge.name5" , "I'm Margaret Chun." ],
  [ "marge.bio1" , "I'm an Administrator at the Art Institute, and wife of Professor Harold Chun of the Business School of $s{UC}." ],
  [ "marge.bio5" , "I met Hal at the Art Institute about 5 years ago, and we got married just over a year later." ],
  [ "marge.bio10" , "Since then, $s{1:Hal} has gotten increasingly depressed over his work." ],
  [ "marge.bio15" , "Apparently $s{3:Hal} research hasn't been going well, and he is worrying a lot about his tenure, which is up for review." ],
  [ "marge.bio20" , "$s{uc:1:Hal} constantly complains that his grad students aren't doing enough--blaming everyone but himself for his problems." ],
  [ "marge.bio25" , "I have tried to get him to enjoy himself more, but usually that just leads to arguments." ],
  [ "marge.bio30" , "I first met Rick in Hal's office about 8 months ago.  He actually asked me out on a date not knowing who I was!" ],
  [ "marge.bio35" , "I knew Rick was one of Hal's grad students, but that didn't matter to me." ],
  [ "marge.bio40" , "Perhaps it was just a matter of timing, but I actually took Rick's offer and that was the beginning of our affair." ],
  [ "marge.bio45" , "Rick was more of a quiet type, as opposed to Hal's constant complaining. And that was a nice change." ],
  [ "marge.bio50" , "However, about 3 weeks ago, Rick said we had to stop seeing each other.  He was getting back together with his old girlfriend, Fiona." ],
  [ "marge.bio55" , "Of course I was rather peeved about this abrupt goodbye, but there wasn't anything to do about it." ],
  [ "marge.bio60" , "I just stopped talking to him, and perhaps got a little too sour keeping things bottled up inside." ],  

  [ "marge.bio65" , "I convinced Hal to come to the party-- he would get out a little, and I would have the chance to see Rick." ],
  [ "marge.bio70" , "I mingled for just a while, but before I could get to Rick, this strange woman showed up to talk to him." ],
  [ "marge.bio75" , "Rick and this woman went off in private to talk for several minutes, then returned." ],
  [ "marge.bio80" , "Rick introduced her as his old friend, Pauline." ],
  [ "marge.bio85" , "While Rick was busy, I ran into Hal and he dragged me into the hall, where he started his typical complaining." ],
  [ "marge.bio90" , "I was so tired of the complaining I just exploded!  After a while of letting go that pent-up emotion, Hal finally apologized." ],
  [ "marge.bio95" , "We agreed to be more civil and that we would join everyone upstairs for the movie around 9." ],
  [ "marge.bio100" , "Just the, Tim--another one of Hal's students--interrupted the two of us as he came out of the stairwell." ],
  [ "marge.bio105" , "$s{uc:1:Tim} talked nervously for a minute, then quickly headed back to the party." ],
  [ "marge.bio110" , "After Tim left us, Hal went outside to smoke for a bit, while I cooled down inside at the party." ],
  [ "marge.bio115" , "After a spell, Hal came back much more calm and secure, and we it wasn't too long before we decided to head upstairs." ],

  [ "marge.eve1" , "Hal and I arrived to the party just after 7." ],
  [ "marge.eve5" , "I talked with various friends for a while." ],
  [ "marge.eve10" , "Rick was there with Fiona, so I was in no rush to go see him." ],
  [ "marge.eve15" , "About 30 minutes later, this Pauline woman showed up just as you tried to approach Rick." ],
  [ "marge.eve20" , "The two of them went out to the stairwell to talk for at least 10 minutes before coming back." ],
  [ "marge.eve25" , "When Rick and Pauline returned, he introduced Pauline to Fiona and me." ],
  [ "marge.eve30" , "i tried to talk with them but Hal grabbed me to talk out in the hall." ],
  [ "marge.eve35" , "Our argument didn't last long, and Hal quickly began to apologize when Tim interrupted as he rushed out of the stairwell." ],
  [ "marge.eve40" , "Afterward, around 8:15, Hal headed outside for a smoke while I went back to the party to mingle for a while." ],
  [ "marge.eve45" , "I found Tim and Rick talking and Rick invited you up later for the movie, but you didn't talk about anything else." ],
  [ "marge.eve50" , "Hal came back from outside around 8:35 and he seemed to have calmed down a lot." ],
  [ "marge.eve55" , "I spoke with Hal and he agreed we would go upstairs later for the get-together." ],
  [ "marge.eve60" , "We hung around the party a little too long and didn't get upstairs until 5 after." ],
  [ "marge.eve65" , "When Hal and I went upstairs, Bobby, Fiona, and Pauline were there." ],
  [ "marge.eve70" , "Tim had arrived just before us--we saw him go into the theater." ],
  [ "marge.eve75" , "Louise arrived maybe 10 minutes after we got there." ],

  [ "marge.others1" , "Harold, of course, is my husband." ],
  [ "marge.others5" , "Tim is Rick's office-mate--another one of Hal's students--that you occasionally see around." ],
  [ "marge.others10" , "Neither Rick nor Hal think very much of Tim." ],
  [ "marge.others15" , "Fiona is Rick's old girlfriend whom it seems he has returned to.  I had heard of her, but never met her until tonight." ],
  [ "marge.others20" , "Louise seems to be a friend of Rick's. I believe he mentioned him before in passing." ],
  [ "marge.others25" , "Pauline and Bobby I had never heard of before tonight." ],

  
  [ "pauline.name1" , "I'm Pauline." ],
  [ "pauline.name5" , "I'm Pauline Thompson." ],
  
  [ "pauline.bio1" , "I've been an assistant in a boring consulting firm in $s{Chicago} for the past 2 years." ],
  [ "pauline.bio5" , "I grew up poor in an otherwise rich suburb of $s{Chicago}." ],
  [ "pauline.bio10" , "Rick Martin was one of my few friends growing up." ],
  [ "pauline.bio15" , "After high school, Rick's parents put him through Stanford, while I worked my way through Northwestern." ],
  [ "pauline.bio20" , "$s{uc:1:Rick} and I stayed in occasional contact while we were in school." ],
  [ "pauline.bio25" , "Six years later, $s{1:Rick} was doing his PhD in Finance at $s{UC}, while I was working 12-hour days on Wall Street." ],
  [ "pauline.bio30" , "One day he called me and said he found a 'money-machine' in Option Pricing, but he needed a partner.  I jumped at the chance!" ],
  [ "pauline.bio35" , "While working on his thesis, $s{1:Rick} came up with a better alternative to the Black-Scholes Option Pricing formula." ],
  [ "pauline.bio40" , "$s{uc:1:Rick} borrowed a lot of cash from some Italian friend in the B-school." ],
  [ "pauline.bio45" , "$s{uc:1:Rick} sent it to me as starting capital, and we were in business." ],
  [ "pauline.bio50" , "I had to quit my old job for one that gave me the time I needed, and Rick made excuses to delay publishing his thesis." ],
  [ "pauline.bio55" , "Recently, $s{1:Rick} has started worrying about his problems." ],
  [ "pauline.bio60" , "$s{uc:1:Rick} was running out of excuses, for both his thesis advisor and his friend Louis--whom he borrowed from." ],
  [ "pauline.bio65" , "Last week, $s{1:Rick} said he was going to work on a draft of his thesis, but I insisted we discuss it first." ],
  [ "pauline.bio70" , "But $s{1:Rick} made himself unavailable since then and he wasn't returning my calls." ],
  [ "pauline.bio75" , "I was getting worried, so I decided to drop in on $s{2:Rick} unexpectedly." ],
  [ "pauline.bio80" , "As it turns out, there was this party going on when I arrived." ],
  [ "pauline.bio85" , "Not wanting to appear suspicious, I mingled a little to be inconspicuous and then planned to slip out." ],
  [ "pauline.bio90" , "Then Rick found me. He grabbed my arm and took me down the hall to the stairwell for a talk." ],
  [ "pauline.bio95" , "'What the hell are you doing here?' he asked. And I countered with, 'What are you doing with your your thesis?'" ],
  [ "pauline.bio100" , "$s{uc:1:Rick} explained that he would be kicked out of the program if he did not turn in a draft in the next month." ],
  [ "pauline.bio105" , "I asked $s{2:Rick} why he cared, since he was making more money than he ever would with that stupid piece of paper." ],
  [ "pauline.bio110" , "$s{uc:1:Rick} cared that his reputation might be ruined. That he would be out of a 'professional' career." ],
  [ "pauline.bio115" , "We argued for a few minutes, but then he cooled down and said he would introduce me to everyone as an 'old friend'." ],
  [ "pauline.bio120" , "$s{uc:1:Rick} gave me his home-office keys so that I could retrieve his data disk--'Data Disk #5'." ],
  [ "pauline.bio125" , "We went back to the party where he introduced me to most everyone. " ],
  [ "pauline.bio130" , "While he then went around inviting everyone for a movie upstairs later, I went back into his office to get the disk." ],
  [ "pauline.bio135" , "The disk was easy to find because all the disks were out of the box and spread all over the desk." ],
  [ "pauline.bio140" , "The only other thing on the desk besides the disks was a marble paperweight on a pile of old letters." ],
  [ "pauline.bio145" , "When I exited the office, I went down the stairs for a brief moment, and then came back up and joined Rick at the party." ],
  [ "pauline.bio150" , "We were going to head up to the theater, so $s{1:Rick} kissed his girlfriend and she said she would join us a little later." ],
  [ "pauline.bio155" , "On the way upstairs you gave Rick his office key and the data disk, but he didn't want to talk about anything until later." ],
  [ "pauline.bio160" , "I took a side-trip to go powder my nose while Rick continued up to the theater." ],
  [ "pauline.bio165" , "When I finally got to the theater, Fiona and her friend Bobby were already there." ],

  [ "pauline.eve1" , "I arrived to this unexpected party around 7:40 and quickly made my way to Rick." ],
  [ "pauline.eve5" , "$s{uc:1:Rick} dragged me off to the stairwell where we talked for about 15 minutes." ],
  [ "pauline.eve10" , "We actually argued quite loudly for a bit, and then I agreed to get the data disk and continue the discussion later." ],
  [ "pauline.eve15" , "$s{uc:1:Rick} gave me his keys and we went back to mingle at the party." ],
  [ "pauline.eve20" , "$s{uc:1:Rick} then introduced you to Margaret and Fiona." ],
  [ "pauline.eve25" , "At about 8:05 I carefully slipped away to get the data disk from the office.  I found it rather easily, and then left the office." ],
  [ "pauline.eve30" , "I went downstairs briefly, but was back mingling at the party no later than 8:25." ],
  [ "pauline.eve35" , "Around 8:45, Rick and I started to head upstairs and I carefully slipped him the keys and the data disk." ],
  [ "pauline.eve40" , "I pardoned myself to go to the bathroom while Rick continued on to the theater room." ],
  [ "pauline.eve45" , "I made it up to the theater on-time at 9, and found Bobby and Fiona there, but not Rick." ],
  [ "pauline.eve50" , "Tim, Harold, and Margaret arrived about 5 minutes later.  Louis arrived last around 9:15." ],

  [ "pauline.others1" , "Before tonight, I didn't know any of these people except Rick." ],
  [ "pauline.others5" , "I was formally introduced to Fiona and Margaret at the party." ],
  [ "pauline.others10" , "$s{uc:1:Rick} told me Fiona was an ex-girlfriend, but they were getting back together." ],
  [ "pauline.others15" , "I picked up that Margaret was the wife of Harold Chun--the Professor." ],
  [ "pauline.others20" , "Professor Chun, Rick's advisor, apparently has been putting pressure on $s{2:Rick} to finish his thesis." ],
  [ "pauline.others25" , "Other than that, I don't really know anything about any of them.  And they shouldn't know me." ],
  [ "pauline:others30" , "Louis is a complete stranger to me, but I think he might be related to a mafia crime syndicate in $s{Chicago} I read about." ],
  [ "pauline:others35" , "Bobby and Tim I had never even heard of before tonight." ],

  [ "pauline.arg" , "I imagine his new girlfriend could've been jealous.  Jealous enough to kill him?  I don't know." ],  

  [ "tim.name1" , "I'm Tim." ],
  [ "tim.name5" , "I'm Tim Kane." ],
  [ "tim.bio1" , "I'm working on a Phd in Finance at $s{UC}." ],
  [ "tim.bio5" , "I love the program. But I barely scraped by to get in, and now in staying there." ],
  [ "tim.bio10" , "My problem is that I'm too impulsive with these get-rich-quick schemes. They all seem to fail to pan out." ],
  [ "tim.bio15" , "I keep betting on these schemes, they fail, and my debts keep piling up." ],
  [ "tim.bio20" , "Rick and I share an office.  He is also one of Professor Chun's students." ],
  [ "tim.bio25" , "I'm started on my thesis this year in Option Pricing with Professor Chun. I have been researching experimental data." ],
  [ "tim.bio30" , "At first, Rick seemed like a good promising student, but lately...he's done very little in the past 2 years." ],
  [ "tim.bio35" , "Rick and I share an office on campus.  He is also one of Professor Chun's students." ],
  [ "tim.bio40" , "Despite sharing the campus office with Rick, I don't know a whole lot about him." ],
  [ "tim.bio45" , "Ever since I met $s{1:Rick}, he seemed very bright, but equally secretive." ],
  [ "tim.bio50" , "We have several mutual friends, like Louis, who is rumored to be connected with the local Mafia." ],
  [ "tim.bio55" , "About 2 years ago, I started getting the impression that Rick had borrowed a lot of money from Louis." ],
  [ "tim.bio60" , "I convinced Louis to loan me 10 grand for my own investment schemes." ],
  [ "tim.bio65" , "Unfortunately, all my ideas end up losing money, and now my funds and my time are running out." ],
  [ "tim.bio70" , "I have less than 6 grand left, and losing all of that will surely break me." ],
  [ "tim.bio75" , "The party tonight was supposed to get my mind off these problems.  But then I saw Louis there." ],
  [ "tim.bio80" , "I tried to subtly avoid $s{2:Louis}, but soon he walked by and slipped me this note.  It said, 'Pay up or die!'" ],
  [ "tim.bio85" , "From then on I tried to stay at the edge of the party--tried to hide how panicked I was." ],
  [ "tim.bio90" , "When I was in the hallway, Rick and some woman slipped past me and went towards the stairwell." ],
  [ "tim.bio95" , "Initially I follow them to the stairwell, but they went inside a side room.  I listened through the door for a bit." ],
  [ "tim.bio100" , "I don't remember all the details. Something about Rick finding a 'money machine' in Options Pricing, and this woman was his partner." ],
  [ "tim.bio105" , "Together they had been using this 'money machine' for the past 2 years and made a fortune." ],
  [ "tim.bio110" , "The woman, Pauline, wanted Rick to quit the PhD program, but $s{1:Rick} wanted to gain recognition and publish this discovery as his thesis." ],
  [ "tim.bio115" , "$s{uc:1:Rick} gave Pauline his office keys and told her where to find a disk with all the data from his work." ],
  [ "tim.bio120" , "While I was listening, I heard a noise at the end of the hall and saw Bobby coming into the hallway." ],
  [ "tim.bio125" , "You turned to face him, but for some reason that made him turned around and head back to the party." ],
  [ "tim.bio130" , "Then I heard Rick and Pauline heading back to the door, so I turned and headed for the bathroom." ],
  [ "tim.bio135" , "Went they went down the hallway to the party I came out and went into the office." ],
  [ "tim.bio140" , "I wanted to find that disk and use it to pay off my debt and, perhaps, save my skin." ],
  [ "tim.bio145" , "I started to search Rick's desk without the light, while making as little noise as possible." ],
  [ "tim.bio150" , "I didn't quite make out or remember how the disk was labelled, and couldn't figure out which one it was." ],
  [ "tim.bio155" , "Then I heard someone coming and I hid behind the desk. It was Pauline. She took no time in grabbing a disk, turned, and walked out with it." ],

  [ "tim.reveal1" , "I was frantic for that disk and didn't know what to do. So I grabbed the marble paperweight off the desk and rushed out into the hall." ],
  [ "tim.reveal5" , "I had intended to knock $s{2:Pauline} out and take the disk for myself." ],
  [ "tim.reveal10" , "I tried to get to $s{2:Pauline} before she made it back to the party, but I ran into Professor Chun and his wife." ],
  [ "tim.reveal15" , "I hid the marble block as I tried to act normal and chatted with the Professor and his wife for just a moment." ],
  [ "tim.reveal20" , "I lost track of Pauline as she made it back to the party." ],
  [ "tim.reveal25" , "I ran into Rick while looking for Pauline and he invited me upstairs for some videos around 9." ],
  [ "tim.reveal30" , "Then I saw Rick leave with Pauline into the hallway, and I thought I'd take a chance." ],
  [ "tim.reveal35" , "I saw Pauline give the keys *and* the disk to Rick before they got to the stairwell." ],
  [ "tim.reveal40" , "When Pauline left Rick for the bathroom, I quickly followed him into the theater room, and shut the door behind us." ],
  [ "tim.reveal45" , " I got the marble paperweight out of my pocket and hit $s{2:Rick} on the back of the head--hoping to knock him out." ],
  [ "tim.reveal50" , "But, when he fell to the floor he really smashed hard head-first on the edge of the step leading to the 2nd set of recliners." ],
  [ "tim.reveal55" , "While he was out, I searched him and found the disk, but then I realized he was no longer breathing!" ],
  [ "tim.reveal60" , "Of course, I panicked.  I saw a door at the back of the theater.  It led to a bathroom. I dragged him in there and shut the door." ],
  [ "tim.reveal65" , "I left the paperweight next to him.  Then I remembered the 'Pay or Die' note Louis gave me, and I dropped it there, too." ], 
  [ "tim.reveal70" , "I went out the 2nd bathroom door which led to an empty adjacent room with a fire escape." ],
  [ "tim.reveal75" , "I quietly went down the fire escape and came back around to the front door." ],
  [ "tim.reveal80" , "I got lucky, and made it back to the party without anyone noticing where I came from." ],

  [ "tim.arg1" , "Yes, Louis did write me that note, but I lost it during the party.  Anyone could have picked it up." ],
  [ "tim.arg5" , "That note from Louis proves he is willing to kill to get what he wants!" ],
  [ "tim.arg10" , "I fear that $s{2:Louis} might really try to kill me, too!" ],
  [ "tim.arg15" , "It's possible $s{1:Louis) might have given the same kind of note to Rick. He loaned Rick money, too." ],
  [ "tim.arg20" , "What about Louis? He might have done this.  He, or his Mafia family, tired of waiting for their money!" ],
  [ "tim.arg25" , "$s{uc:1:Louis} might have done this to send me a message. To show they make good on their threats!" ],
  [ "tim.arg30" , "We all saw Pauline leave the party and head upstairs with Rick. And they were having quite a heated argument before that." ],
  [ "tim.arg35" , "I overheard Rick and Pauling arguing in the Den right after she got to the party." ],
  [ "tim.arg40" , "I don't know Pauline. But she seemed to have the best opportunity, and might have had good reason to kill him." ],

  [ "unknown"  , "Well...I need to $s{think} first..."                         ],
  [ "unknown1" , "Hmmm...I'm not sure how to $s{think} about that."            ],
  [ "unknown2" , "Ummm...let me $s{think} on that."                            ],

  [ "no_text", ""]
]);

// message item prefixes:
const sS  = "$s{"; // synonym
const pS  = "$p{"; // gameState.player
const lS  = "$l{"; // gameState.location
const nS  = "$n{"; // gameState.location.npc
const xS  = "$x{"; // gameState.loop
const iS  = "$i{"; // item

class MessageMap{

    constructor(props){
        if( !props) props = {};
        this.replaceSynonyms = this.replaceSynonyms.bind(this);
        this.replaceProperties = this.replaceProperties.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.synonymMap = props.synMap ?? new SynonymMap();
    }

static log(msg){  /* console.log(msg); */ }

    // called internally only
    replaceSynonyms( message){
        let val = {};
        let mMsg = new MarkedMessage(message, 0, sS);
        while(mMsg.hasMark && mMsg.hasKey()){
            val = this.synonymMap.getSynonym(mMsg.key); // get a synonym { key:, synonym: }
            mMsg.replaceMark(val.synonym);
        }
        return mMsg.message;
    }

    // called internally only
    replaceProperties( message, obj, sMark ){
        let val = {};
        let mMsg = new MarkedMessage(message, 0, sMark);
        while(mMsg.hasMark && mMsg.hasKey()){
            val = obj[mMsg.key] ?? null; // get the property { property: , value: }
            MessageMap.log("Pval: "+ val);
            mMsg.replaceMark(val.value);
        }
        return mMsg.message;
    }

    /**
     * Process the message template specified by msgKey with the provided gameState data.
     * @param msgKey - id of message template to process.
     * @param gameState - JSON: object containing player and location objects from gameState.
     * @return JSON: object containing the original msgKey and the processed message template.
     */
    getMessage(msgKey, gameState){
        let message = String(messages.get(msgKey) ?? msgKey);
        MessageMap.log(`processing synonyms...`);
        message = this.replaceSynonyms(message);
        if(gameState.player){
            MessageMap.log("processing player: " + message);
            message = this.replaceProperties(message, gameState.player , pS );
        }
        if(gameState.location){
            MessageMap.log("processing location: " + message);
            message = this.replaceProperties(message, gameState.location , lS );
        }
        return {
            key: msgKey,
            message: message
        }
    }

    /**
     * @return JSON: object containing count of keys and key names.
     */
    static getMessageKeys(){
      return {
          count: messages.size,
          keys: Array.from(messages.keys())
      }
    }
}
module.exports = MessageMap;
