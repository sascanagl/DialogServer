module.exports = {
    get:{
        tags: ["RandomMessages"],
        description: "Get list of random message keys",
        operationId: "getRandomMessageKeys",
        parameters: [],
        responses:{ 200:{ $ref: "#/components/responses/mapKeysResponse"}}
    }
}