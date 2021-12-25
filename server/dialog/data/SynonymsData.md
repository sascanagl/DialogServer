# Synonyms

Synonyms are just that, a word and a list of synonyms that can be used in its place.  In this way, instead of hearing the same word over-and-over again, we introduce  variation by randomly selecting an alternate synonym to insert into Messages where desired.  Sometimes we use the specified word, and sometimes we use a synonym.

Keep in mind, with the use of Synonyms, the same Message coming out of the MessageData comes out different each time.  Using more Synonyms in Messages makes the dynamic nature of the dialog quite interesting.

## Data Format

Synonym mapping is quite simple.  There is a rootWord or key associated with a set of string synonyms for that word.

Example of a simple Synonymsmapping:

> ``` ["apartment" , [ "abode", "home", "flat", "residence", "digs" ] ] ```

### The ***Key***

> ``` "apartment" ``` -- The rootWord for this set of synonyms.

The rootWord is the first word considered in the group of associated synonyms.  That word will be added to those found in the mapped synonyms array and one of them will be randomly selected for use.

### The ***Values***

The mapped values for that rootWord: ```[ "abode", "home", "flat", "residence", "digs" ]```

So there are 4 synonyms provided for the rootWord.  By combining these synonyms with the rootWord that gives us 5 words to randomly select when called.  When randomly selecting synonyms and putting them into Messages it makes those Messages more and more dynamic.  The more synonyms there are for each word, and the more synonyms used in each Message--with sets of randomly selected messages instead--the more robust the dialog system.

### Pronoun-like Indexing

Synonym processing in MessageData supports capitalization of words as well as being used as pronouns for proper nouns--or other things like past, present, and future tenses.

Example synonyms to illustrate the use of Pronouns and Synonyms:

> ```[ "male" , [ "he", "him", "his" ] ]```

When used with other synonyms in a message template in MessageData like:

> ```"$s{uc:3:male} $s{coworkers} were $s{nearby}"```

So, our example Message when invoked with defined Synonyms will produce phrases like:

> * ```His associates were not far```
> * ```His colleagues were nearby```
> * ```His coworkers were close by```
> * ```His associates were very near```
