const Synonyms = require("../Synonyms");
class RandomMessageData{
    static messages = new Map([
        ["amb.rand.noise"  , new Synonyms([ "no_text", "amb.rand.noise1", "no_text", "amb.rand.noise2", "no_text", "amb.rand.noise3" ])],
        ["amb.silence" , new Synonyms(["amb.silence2" ])],
        ["unknown" , new Synonyms([ "unknown1" , "unknown2" ])]
    ]);
}
module.exports = RandomMessageData;