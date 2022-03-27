module.exports = {
    get:{
        tags: ["Synonyms"],
        description: "Get synonym for key",
        operationId: "getSynonym",
        parameters: [
            { $ref: "#/components/parameters/instanceIdParam" },
            { $ref: "#/components/parameters/keyIdParam" },
            { $ref: "#/components/parameters/voiceParam" }
        ],
        responses:{
            200:{ oneOf:[
                { $ref: "#/components/responses/mapStrResponse" },
                { $ref: "#/components/responses/mapStrTTSResponse" },
                { $ref: "#/components/responses/mapStrTTSErrorResponse" }
            ]},
            400:{ $ref: "#/components/responses/GeneralError" }
        }
    }
}