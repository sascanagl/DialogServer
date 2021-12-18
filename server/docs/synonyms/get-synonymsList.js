module.exports = {
    get:{
        tags: ["Synonyms"],
        description: "Get synonyms for key",
        operationId: "getSynonymsList",
        parameters: [{ $ref: "#/components/parameters/keyIdParam" }],
        responses:{
            200:{ $ref: "#/components/responses/mapListResponse" },
            400:{ $ref: "#/components/responses/ParamError" }
        }
    }
}