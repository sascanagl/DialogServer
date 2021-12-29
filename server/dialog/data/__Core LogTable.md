# Core Logic Table

The is the data table containing the logic and state definition of the game\dialog engine.  It is modelled after my memory from playing with the Oblivion Construction Set.

Each row in the logic table represents a possible logic state in the game.  At each game loop tick of the game engine the rows are evaluated from top-to-bottom.  In each row, the columns are evaluated from left-to-right. All the column values are optional.  An unset/ignored value must be represented as an empty string "".  Columns values must never be null.

From left-to-right, each column value must be empty ("") or match the current game state to be considered **true**.  Subsequent columns are only evaluated as long as the previous column evaluated true.  As soon as a column value is found to be **false**, that row is considered "no match" and we move on to evaluate subsequent rows until we find the first row that matches the current game state.

Conceptually, the earlier in the game you are, the further down the table is the matching row.  This is because you don't want to match on an earlier row.  If you did, none of the rest of the rows (the game) would ever be evaluated and playable.  As more of the game is completed, the higher up in the table we usually find the matched row.

## The Columns

```{ w:"world", z:"zone" , n:"npc" ,  t:"trigger" , c:"checks", e:"envText" , i:"inDialog" , o:"outDialog" , a: "actions" } ```

| Col | Name | Description |
| --- | ------- | ----------- |
| w | World     | Name of the world we might be in |
| z | Zone      | Name of the zone we might be in  |
| n | NPC       | Name of an NPC we might be engaging |
| t | Trigger   | Name of a current state or trigger |
| c | Checks    | Array of property values -- all must be true |
| e | Environ   | Dialog/Text for the environment |
| i | InDialog  | Dialog/Text/Narration to the player |
| o | OutDialog | Dialog/Text/Options from the player |
| a | Actions   | Resulting game state changes when row |

The first 5 columns ```( w, z, n, t, c )``` are used to deduce the current game state--to find the row that matches and should be processed for this tick of the game.

### w - World
The World the player currently occupies.  While most games might only have 1 world, we allow for more.

### z - Zone
The Zone the player currently occupies.  A zone is essentially, a location.  A room, an area, a place that can be occupied by the player and other things.

### n - NPC
If the player has "targeted" a particular NPC (Non Player Character), that NPC's ID is associated with the current game state.  A value in this field means the row is only a match if that particular NPC is currently targeted by the player.

### t - Trigger
The Trigger is a single string containing the current Tag or Name of the particular state or stage of the game.  Game 'states' are whatever the developer deems appropriate and there can be as many as are needed to isolate different states or statuses of the game.

### c - Checks
After all the other criteria for the row are found to be matching, we then turn to evaluating specific properties of the current game state.  For example, we can specify the certain things only happen for a particular property value held by the player, NPC, location, the game loop itself, or any items on the player or nearby.

## Checks Format
The column contains a single string that may have any number of particular checks concatenated together.  Only if all of these checks are true is the row considered the match:

Checks Column values:

|    Format   | Description
| ----------- | ----------- 
| ```"$p{property:value}"``` | a player property:value
| ```"$l{property:value}"``` | a location property:value
| ```"$n{property:value}"``` | a npc property:value
| ```"$x{property:value}"``` | a game 'loop' property:value
| ```"$i{id:property:value}"``` | an particular item's property:value

Example:

> ```"$p{p1:v1}$p{p2:v2}$l{p1:v1}$n{p1:v1}$n{p2:v2}$i{id:p1:v1}"```

The above shows that 2 particular player properties, 1 property for the location, 2 npc properties, and 1 particular item property must all evaluate to be **true** for this row to be the match.

### Checks Property Values
All property values must match the specified value expression given for that property.  
The engine supports the following expression evaluation operators for property values:

|          Format         | Description
| ----------------------- | -----------
| ```{property:value}``` | the property must exist and the value must match as specified.
| ```{property:!}``` | the property MUST NOT exist.
| ```{property:!value}``` | the property either does not exist, or IS NOT the specified value.
| ```{property:>value}``` | the property must exist and is greater than the specified value.
| ```{property:<value}``` | the property must exist and is less than the specified value.

## e - Environment
The Environment setting is one or more Messages that should be made available on the match of that row.  The Environment should be considered as background dialog or discussion that may or may not have important information in it.  For example, it could just be overhearing discussions occurring in the location that that player is not a part of, but might overhear.  It also could be Messages describing the location, the weather, or sounds the player might be able to hear.  It is considered separate and often secondary to the main dialog of the InDialog--the official narration or information stream provided to the player.

### Environment Format
The column contains a single string that may have any number of templated messages  concatenated together.  Generally, it is simply specifying which Messages, Random Messages, Chained Messages, or Synonyms to use.

Environment Message formats:

|    Format   | Description
| ----------- | -----------
| ```"literal text"``` | literal text.
| ```"$c{chainedMessageKey}"``` | the key of a particular ChainedMessageData.
| ```"$r{randomMessageKey}"``` | the key of a particular RandomMessageData.
| ```"$m{messageKey}"``` | the key of a particular MessageData.
| ```"$s{synonymsKey}"``` | the key of a SynonymData.

Example:

> ```"$s{uc:wow}, $c{party.init5}"```

As suggested in the example, the Synonym prefixes -- like ```uc:``` and ```n:``` -- are also usable.

## i - InDialog
The InDialog column represents input to the player--the primary narration of what's happening in the game/dialog.

### InDialog Format
The column contains a single string that may have any number of templated messages  concatenated together.  This is the same format as used by the Environment column.  Generally, it is simply specifying which Messages, Random Messages, Chained Messages, or Synonyms to use.

|    Format   | Description
| ----------- | -----------
| ```"literal text"``` | literal text.
| ```"$c{chainedMessageKey}"``` | the key of a particular ChainedMessageData.
| ```"$r{randomMessageKey}"``` | the key of a particular RandomMessageData.
| ```"$m{messageKey}"``` | the key of a particular MessageData.
| ```"$s{synonymsKey}"``` | the key of a SynonymData.

Example:

> ```"$s{uc:wow}, $c{party.init5}"```

As suggested in the example, the Synonym prefixes -- like ```uc:``` and ```n:``` -- are also usable.

## o - OutDialog
This column contains a single string that represents one or more prompts or options presented to the player, along with the Triggers and Actions that will occur if and when the player chooses one of them.  Currently we have not fully implemented client support for this just yet.  But the column is there and reserved.

### OutDialog Format
Each individual prompt or option is formatted as shown below:

> ```prompt:trigger:action```

Multiple options are separated by a pipe character: ``` | ```

Thus, an OutDialog record presenting 3 different sets of dialog with 3 different resulting triggers and actions would be formatted as shown here:

> ``` prompt:trigger:action | prompt:trigger:action | prompt:trigger:action```

### OutDialog 'prompt' Format
The format for the 'prompt' portion of an OutDialog option is the same as the Environment and InDialog messaging:

|    Format   | Description
| ----------- | -----------
| ```"literal text"``` | literal text.
| ```"$c{chainedMessageKey}"``` | the key of a particular ChainedMessageData.
| ```"$r{randomMessageKey}"``` | the key of a particular RandomMessageData.
| ```"$m{messageKey}"``` | the key of a particular MessageData.
| ```"$s{synonymsKey}"``` | the key of a SynonymData.

Example:

> ```$r{aRand.KeyId}|``` -- In this case, a KeyId from RandomMessageData.

### OutDialog 'trigger' Format
The format for the 'trigger' portion of the OutDialog option is the same as required for the Trigger column.  A simple string Tag or Name of the state of the game that will be set later, if and when the user selects this option.

Example:

> ````:start:``` -- set the game to the 'start' state.

### OutDialog'action' Format
The format for the 'action' is a single string allowing us to change the value of one or more things in the game.  Individual settings can be concatenated together to change the value of multiple different properties later, if and when the user selects this option:

|          Format          | Description
| ------------------------ | -----------
| ```$p{property:value}``` | changes a gameState.player property value.
| ```$l{property:value}``` | changes a gameState.location property value.
| ```$n{property:value}``` | changes a gameState.location.npc property value.
| ```$x{property:value}``` | changes a gameState.loop property value.
| ```$i{item:property:value}``` | changes an item's property value.

Changes to property values can be literal "as-written", or they can also use the operators/expressions below:

|          Format     | Description
| ------------------- | -----------
| ```...property:++}``` | create and/or increment a numeric property value.
| ```...property:--}``` | create and/or decrement a numeric property value.

Examples:

|  Property Change |   Result
| --- | ---
| ```$p{health:15}``` | set the player health to 15.
| ```$p{outside:++}``` | increments the player stat 'outside' by 1.
| ```$p{rack:--}``` | creates unknown player property 'rack' and sets it to -1.

Note: In our sample game data 'outside' is a location and we chose to track how many times the player has been at that location.  That is just one example of game-specific properties the developer might choose to track.

There is also one specific game ```delay``` loop property that supports a special ***range*** syntax:

|   Randomize Delay     |       Description
| --------------------- | -------------------------
| ```$x(delay:n1-n2)``` | set the game loop tick delay to a random value between n1 and n2.

### Putting OutDialog All Together
So, when we put it all together, you might have an OutDialog column value that looks something like below:

> ```"$r{xroads.opt1}:path1:$p{path1:++}$x(delay:2-5} | $r{xroads.opt2}:path2:$p{path2:++}$x{delay:5-9}"```

The above is intended to present 2 options to the player.  The first option has 'xroads.opt1' from RandomMessagesData as the prompt/dialog the player would see about that option.  The second option is shown as 'xroads.opt2' messaging from RandomMessageData. (Using predefined "crossroads" RandomMessages allows this option to look different each time it is presented.)

If the player selects the first option, then the game triggers or sets the game state to the value of "path1".  The player property "path1" will be created if it did not exist, or its previous value will be incremented.  The next game loop/tick--and all subsequent ticks until changed--will be set to a random value between 2 and 5 seconds.

If the player selects the second option, then the game triggers or sets the game state to the value of "path2".  The player property "path2" will be created if it did not exist, or its previous value will be incremented.  The next game loop/tick--and all subsequent ticks until changed--will be set to a random value between 5 and 9 seconds.

## a - Actions
This column is a single string that represents the Actions that will occur upon the matching and execution of this row.  These Actions, if any, will usually change the values of one or more properties, possibly trigger a change in the game state, and often change the game loop delay time to randomize how often things change.  These are the things that happen "right now" when the row is determined to be a match for the current state of the game.

### Actions Format
The format for the Actions column is a single string allowing us to change the value of one or more things in the game.  Individual settings can be concatenated together to change the value of multiple different properties:

|          Format          | Description
| ------------------------ | -----------
| ```$p{property:value}``` | changes a gameState.player property value.
| ```$l{property:value}``` | changes a gameState.location property value.
| ```$n{property:value}``` | changes a gameState.location.npc property value.
| ```$x{property:value}``` | changes a gameState.loop property value.
| ```$i{item:property:value}``` | changes an item's property value.

Changes to property values can be literal "as-written", or they can also use the operators/expressions below:

|          Format     | Description
| ------------------- | -----------
| ```...property:++}``` | create and/or increment a numeric property value.
| ```...property:--}``` | create and/or decrement a numeric property value.

Examples:

|  Property Change |   Result
| --- | ---
| ```$p{health:15}``` | set the player health to 15.
| ```$p{outside:++}``` | increments the player stat 'outside' by 1.
| ```$p{rack:--}``` | creates unknown player property 'rack' and sets it to -1.

Note: In our sample game data 'outside' is a location and we chose to track how many times the player has been at that location.  That is just one example of game-specific properties the developer might choose to track.

There is also one specific game ```delay``` loop property that supports a special ***range*** syntax:

|   Randomize Delay     |       Description
| --------------------- | -------------------------
| ```$x(delay:n1-n2)``` | set the game loop tick delay to a random value between n1 and n2.
