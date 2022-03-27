const getLogic = require("./logic/get-logic");
const getLocations = require("./logic/get-locations");

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
const getEngineInstances = require("./engine/get-instances");

module.exports = {
    paths: {
        '/engine/about' :{ ...getEngineAbout },
        '/engine/instances' :{ ...getEngineInstances },
        '/{instance}/logic' :{ ...getLogic },
        '/{instance}/locations' :{ ...getLocations },

        '/{instance}/agent/options' :{ ...getAgentOptions },

        '/{instance}/synonyms'      :{ ...getSynonymsKeys },
        '/{instance}/synonym/{key}' :{ ...getSynonym },
        '/{instance}/synonyms/{key}':{ ...getSynonymsList },

        '/{instance}/messages'     :{ ...getMessageKeys },
        '/{instance}/message/{key}':{ ...getMessage },

        '/{instance}/randomMessages'      :{ ...getRandomMessageKeys },
        '/{instance}/randomMessage/{key}' :{ ...getRandomMessage },
        '/{instance}/randomMessages/{key}':{ ...getRandomMessageList },

        '/{instance}/chainedMessages'     :{ ...getChainedMessageKeys },
        '/{instance}/chainedMessage/{key}':{ ...getChainedMessage }
    }
}
