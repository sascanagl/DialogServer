const getSynonymsKeys = require('./get-synonyms');
const getSynonym = require('./get-synonym');
const getSynonymsList = require('./get-synonymsList');

module.exports = {
    paths:{
        '/synonyms':{
            ...getSynonymsKeys
        },
        '/synonym/{key}':{
            ...getSynonym
        },
        '/synonyms/{key}':{
            ...getSynonymsList
        }
    }
}