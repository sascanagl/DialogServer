module.exports = {
    get:{
        tags: ["Synonyms"],
        description: "Get synonyms for key",
        operationId: "getSynonymsList",
        parameters: [
            { $ref: "#/components/parameters/instanceIdParam" },
            { $ref: "#/components/parameters/keyIdParam" },
            { $ref: "#/components/parameters/voiceParam" }
        ],
        responses:{
            200:{ oneOf:[
                { $ref: "#/components/responses/mapListResponse" },
                { $ref: "#/components/responses/mapListTTSResponse" },
                { $ref: "#/components/responses/mapListTTSErrorResponse" }
            ]},
            400:{ $ref: "#/components/schemas/GeneralError" }
        }
    }
}