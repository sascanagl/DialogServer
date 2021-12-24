module.exports = {
    get:{
        tags: ["Messages"],
        description: "Get list of message keys",
        operationId: "getMessageKeys",
        parameters: [],
        responses:{ 200:{ $ref: "#/components/responses/mapKeysResponse"}}
    }
}