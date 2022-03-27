module.exports = {
    get:{
        tags: ["Messages"],
        description: "Get list of message keys",
        operationId: "getMessageKeys",
        parameters: [
            { $ref: "#/components/parameters/instanceIdParam" }
        ],
        responses:{ 200:{ $ref: "#/components/responses/mapKeysResponse"}}
    }
}