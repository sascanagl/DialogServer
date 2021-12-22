module.exports = {
    get:{
        tags: ["ChainedMessages"],
        description: "Get list of chained message keys",
        operationId: "getChainedMessageKeys",
        parameters: [],
        responses:{ 200:{ $ref: "#/components/responses/mapKeysResponse"}}
    }
}