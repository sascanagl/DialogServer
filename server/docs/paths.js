const getSynonymsKeys = require('./synonyms/get-synonymsKeys');
const getSynonym      = require('./synonyms/get-synonym');
const getSynonymsList = require('./synonyms/get-synonymsList');

const getMessageKeys = require('./messages/get-messageKeys');
const getMessage     = require('./messages/get-message');

const getRandomMessageKeys = require('./randomMessages/get-randomMessageKeys');
const getRandomMessage     = require('./randomMessages/get-randomMessage');
const getRandomMessageList = require('./randomMessages/get-randomMessageList');

module.exports = {
    paths: {
        '/synonyms'      :{ ...getSynonymsKeys },
        '/synonym/{key}' :{ ...getSynonym },
        '/synonyms/{key}':{ ...getSynonymsList },

        '/messages'     :{ ...getMessageKeys },
        '/message/{key}':{ ...getMessage },

        '/randomMessages'      :{ ...getRandomMessageKeys },
        '/randomMessage/{key}' :{ ...getRandomMessage },
        '/randomMessages/{key}':{ ...getRandomMessageList }
    }
}
