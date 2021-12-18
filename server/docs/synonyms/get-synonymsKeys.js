module.exports = {
    get:{
        tags: ["Synonyms"],
        description: "Get Synonyms keys",
        operationId: "getSynonymsKeys",
        parameters: [],
        responses:{ 200:{ $ref: "#/components/responses/mapKeysResponse" }}
    }
}