# Message Templating

Messages are just what they sound like--words that form phrases or sentences.  The interesting thing here is that the words in these messages can be dynamically derived from data, or pieced together from random Synonyms.

Messages are generated from the templates using associated data:

>* Literal text
>* Synonyms
>* GameState data like:
>> - player 
>> - location 
>> - agents
>> - items

## Data Format

Messages are stored in a Map.  The key for a message is a unique string id using a naming convention that hopefully makes sense to the developer.  The value is a template string in which the specified Synonyms and other data are inserted prior to consumption.

Example of a simple message:

> ```[ "party.clue1" , "$s{uc:3:Rick} $s{coworkers} were $s{nearby}." ]```

### The ***Key***

```"party.clue1"``` -- The unique keyId for this message.

The naming convention chosen for keys in the default data loosely follow:

> ```<location>.<category><index>```

But you can, of course, come up with your own key naming convention.

### The ***Template***

The mapped template for that key: ```"$s{uc:3:Rick} $s{coworkers} were $s{nearby}."```

But what is all that gibberish?

In this simple case, we have included 3 separate Synonyms from our SynonymsData, and one of them is the request for a pronoun for a Synonym that is a proper noun (Rick).

### Template Syntax for Messages

So what can we put in the template?  You can put any literal text in there.  And, as we mentioned, you can insert Synonyms and other data by using some templating conventions:

> * ```$s{key}``` - insert a Synonym from SynonymData.
> * ```$p{property}``` - insert a gameState.player property value.
> * ```$l{property}``` - insert a gameState.location property value.
> * ```$n{property}``` - insert a gameState.location.npc property value.
> * ```$x{property}``` - insert a gameState.loop property value.
> * ```$i{item:property}``` - insert an item's property value.

As an added bonus, we support the full capabilities of Synonyms with the additional 
syntax they support, if desired.

> * ```$s{uc:key}``` - uc: means to UpCase the first character
> * ```$s{n:key}``` - n: means to specifically get the nth Synonym for the key (pronouns).
> * ```$s{uc:n:key}``` - uc:n: means do both get the nth Synonym and UpCase it.

These variations support Synonyms being used at the beginning of sentences, as well as being used as pronouns for proper nouns.

Example synonyms to illustrate:

> ```[ "rick" , [ "he", "him", "his" ] ]```

So, our example template when invoked might produce phrases like:

> * ```His associates were not far.```
> * ```His colleagues were nearby.```
> * ```His coworkers were close by.```
> * ```His associates were very near.```
