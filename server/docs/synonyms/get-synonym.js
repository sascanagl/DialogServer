module.exports = {
    get:{
        tags: ["Synonyms"],
        description: "Get synonym for key",
        operationId: "getSynonym",
        parameters: [
            { $ref: "#/components/parameters/keyIdParam" },
            { $ref: "#/components/parameters/voiceParam" }
        ],
        responses:{
            200:{
                description: "JSON Object with the key, synonym, and possible TTS speechUrl or speechError",
                type: "object",
                oneOf:[
                { $ref: "#/components/schemas/mapStrValue" },
                { $ref: "#/components/schemas/mapStrTTSValue" },
                { $ref: "#/components/schemas/mapStrTTSError" }
            ]},
            400:{
                description:"JSON Object with a message and an internal error detail",
                type: "object",
                schema: { $ref: "#/components/schemas/Error" }
            }
        }
    }
}