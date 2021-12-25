# Random Messages

Random messages are a little different than what we've seen elsewhere.  Essentially, we provide a keyId for a group of Messages that essentially mean the same thing, or otherwise are equally valid for a particular purpose.  In this way, instead of hearing the same thing over-and-over again, we introduce some variation by randomly selecting from similar-meaning Messages.

Keep in mind, with the use of Synonyms, even the same Message comes out different from time-to-time.  So randomizing a set of messages that also randomize the Synonyms they use is quite interesting.

## Data Format

Random message mapping is a lot like Synonym mapping.  There is a keyId associated with a set of string values.  But in this case, those string values are the keyIds of Messages in our MessageData.

Example of a simple Random Message association:

> ```[ "amb.rand.noise" , [ "no_text", "amb.rand.noise1", "amb.rand.noise2" ]```

### The ***Key***

```"amb.rand.noise"``` -- The unique keyId for this set of Random Messages.

The keyId is actually a keyId in the MessageData and is the first message to be considered in the group of associated messages.  That message will be added to those found in the mapped value array and one of them will be randomly selected when called.

### The ***Values***

The mapped values for that keyId: ```[ "no_text", "amb.rand.noise1", "amb.rand.noise2" ]```

So there are 3 keyId values that match keyIds in the MessageData.  By combining these keyIds with the key that mapped them gives us 4 messages to randomly receive when called:

Messages in MessageData that will be chosen at random from this key:

> * ```amb.rand.noise``` - the key itself has a Message that can be used.
> * ```no_text``` - interesting!  Sometimes there is no noise at all.
> * ```amb.rand.noise1``` - the noise was something different.
> * ```amb.rand.noise2``` - something else is lurking about, too.

And remember, each of these messages in MessageData can be full of Synonyms and other data that make them different from time-to-time, too!
