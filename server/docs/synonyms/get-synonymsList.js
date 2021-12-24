module.exports = {
    get:{
        tags: ["Synonyms"],
        description: "Get synonyms for key",
        operationId: "getSynonymsList",
        parameters: [
            { $ref: "#/components/parameters/keyIdParam" },
            { $ref: "#/components/parameters/voiceParam" }
        ],
        responses:{
            200:{
                description: "JSON Object with the key, synonyms[], and possible TTS speechUrl or speechError",
                type: "object",
                oneOf:[
                { $ref: "#/components/schemas/mapList" },
                { $ref: "#/components/schemas/mapListTTSValue" },
                { $ref: "#/components/schemas/mapListTTSError" }
            ]},
            400:{
                description:"JSON Object with a message and an internal error detail",
                type: "object",
                schema: { $ref: "#/components/schemas/Error" }
            }
        }
    }
}