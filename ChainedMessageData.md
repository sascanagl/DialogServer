# Chained Message Templating

Chained messages are just what they sound like--a set of individual messages chained together to form a longer dialog.  The interesting thing here is that 
the individual messages can all be dynamically generated, or randomized messages selected from a group of related messages.

Chained messages are the highest level of dynamic generation.  They can be generated from every type of dialog supported:

>* Literal text
>* Synonyms
>* Messages
>* RandomMessages
>* ChainedMessages

That's right, a chained message can even have other chained messages embedded within them.

## Data Format

Chained Messages are stored in a Map.  The key for a chain is a unique string id using a naming convention that hopefully makes sense to the developer.  The value is a template string in which the specified Synonyms and other Messages are inserted prior to consumption.

Example of a simple chain:

> ```[ "party.init1" , "$m{party.init1}\n$m{party.init5} $m{party.init10}" ]```

### The ***Key***

```"party.init1"``` -- The unique keyId for this chain.

The naming convention chosen for keys in the default data loosely follow:

> ```<location>.<category><index>```

But you can, of course, come up with your own key naming convention.

### The ***Template***

The mapped template for that key: ```"$m{party.init1}\n$m{party.init5} $m{party.init10}"```

But what is all that gibberish?

In this simple case, we have chained together 3 separate messages from our MessageData and included a newline ( \\n ) and some space between messages.

### Template Syntax for Chained Messages

So what can we put in the template?  You can put any literal text in there.  That is how we got the newline and those extra spaces between messages.  And, as we mentioned, you can insert other dialog data--including dynamically generated dialog--by using some templating conventions.

> * ```$s{key}``` - insert a Synonym from SynonymData.
> * ```$m{key}``` - insert a Message from MessageData.
> * ```$r{key}``` - insert a RandomMessage from RandomMessageData.
> * ```$c{key}``` - insert another ChainedMessage from ChainedMessageData.

As an added bonus, we support the full capabilities of Synonyms with the additional 
syntax they support, if desired.

> * ```$s{uc:key}``` - uc: means to UpCase the first character
> * ```$s{n:key}``` - n: means to specifically get the nth Synonym for the key (pronouns).
> * ```$s{uc:n:key}``` - uc:n: means do both get the nth Synonym and UpCase it.

These variations support Synonyms being used at the beginning of sentences, as well as being used as pronouns for proper nouns.

Example synonyms to illustrate:

> ```[ "bobby" , [ "he", "him", "his" ] ]```

See the SynonymsData README for more information on Synonyms.