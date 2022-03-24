
// eslint-disable-next-line no-undef
const Synonyms = require(appRoot +"/server/dialog/Synonyms");

exports.messages = new Map([
        ["amb.rand.noise"  , new Synonyms([ "no_text", "amb.rand.noise1", "no_text", "amb.rand.noise2", "no_text", "amb.rand.noise3" ])],
        ["amb.silence" , new Synonyms(["amb.silence2" ])],
        ["unknown" , new Synonyms([ "unknown1" , "unknown2" ])]
    ]);
