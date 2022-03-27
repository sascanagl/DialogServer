module.exports = {
    get:{
        tags: ["RandomMessages"],
        description: "Get list of random message keys",
        operationId: "getRandomMessageKeys",
        parameters: [
            { $ref: "#/components/parameters/instanceIdParam" }
        ],
        responses:{ 200:{ $ref: "#/components/responses/mapKeysResponse"}}
    }
}