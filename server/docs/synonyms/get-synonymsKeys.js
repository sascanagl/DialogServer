module.exports = {
    get:{
        tags: ["Synonyms"],
        description: "Get Synonyms keys",
        operationId: "getSynonymsKeys",
        parameters: [
            { $ref: "#/components/parameters/instanceIdParam" }
        ],
        responses:{ 200:{ $ref: "#/components/responses/mapKeysResponse" }}
    }
}