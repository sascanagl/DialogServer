// see ChainedMessageData.md for templating details.
// Supported item value prefixes for the chained messages template
// $s - Synonyms item. Use $s{uc:id}, $s{n:id}, and $s{uc:n:id} as needed.
// $m - Messages item
// $r - RandomMessage item
// $c - ChainedMessage item
exports.chains = new Map([
        [ "party.init1", "$m{party.init1}\n$m{party.init5} $m{party.init10} $m{party.init15}"],
        [ "party.init5", "$m{party.init20} $m{party.init25} $m{party.init30}"],
        [ "outside.init1", "$m{outside.init1} $m{outside.init5}"]
    ]);
