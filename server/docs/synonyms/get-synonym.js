module.exports = {
    get:{
        tags: ["Synonyms"],
        description: "Get synonym for key",
        operationId: "getSynonym",
        parameters: [{ $ref: "#/components/parameters/keyIdParam" }],
        responses:{
            200:{ $ref: "#/components/responses/mapStrResponse" },
            400:{ $ref: "#/components/responses/ParamError" }
        }
    }
}