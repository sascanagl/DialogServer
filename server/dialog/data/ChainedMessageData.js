class ChainedMessageData{
    static chains = new Map([
        [ "party.init1", "$m{party.init1}\n$m{party.init5} $m{party.init10} $m{party.init15}"],
        [ "party.init5", "$m{party.init20} $m{party.init25} $m{party.init30}"],
        [ "outside.init1", "$m{outside.init1} $m{outside.init5}"]
    ]);
}
module.exports = ChainedMessageData;