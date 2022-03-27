module.exports = {
    get:{
        tags: ["ChainedMessages"],
        description: "Get list of chained message keys",
        operationId: "getChainedMessageKeys",
        parameters: [
            { $ref: "#/components/parameters/instanceIdParam" }
        ],
        responses:{ 200:{ $ref: "#/components/responses/mapKeysResponse"}}
    }
}