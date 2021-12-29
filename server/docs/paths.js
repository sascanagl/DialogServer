const getSynonymsKeys = require('./synonyms/get-synonymsKeys');
const getSynonym      = require('./synonyms/get-synonym');
const getSynonymsList = require('./synonyms/get-synonymsList');

const getMessageKeys = require('./messages/get-messageKeys');
const getMessage     = require('./messages/get-message');

const getRandomMessageKeys = require('./randomMessages/get-randomMessageKeys');
const getRandomMessage     = require('./randomMessages/get-randomMessage');
const getRandomMessageList = require('./randomMessages/get-randomMessageList');

const getChainedMessageKeys = require('./chainedMessages/get-chainedMessageKeys');
const getChainedMessage     = require('./chainedMessages/get-chainedMessage');

const getAgentOptions = require("./agents/get-agentOptions");

const getEngineAbout = require("./engine/get-about");
const getEngineLogic = require("./engine/get-logic");

module.exports = {
    paths: {
        '/about' :{ ...getEngineAbout },
        '/logic' :{ ...getEngineLogic },

        '/agent/options' :{ ...getAgentOptions },

        '/synonyms'      :{ ...getSynonymsKeys },
        '/synonym/{key}' :{ ...getSynonym },
        '/synonyms/{key}':{ ...getSynonymsList },

        '/messages'     :{ ...getMessageKeys },
        '/message/{key}':{ ...getMessage },

        '/randomMessages'      :{ ...getRandomMessageKeys },
        '/randomMessage/{key}' :{ ...getRandomMessage },
        '/randomMessages/{key}':{ ...getRandomMessageList },

        '/chainedMessages'     :{ ...getChainedMessageKeys },
        '/chainedMessage/{key}':{ ...getChainedMessage }
    }
}
