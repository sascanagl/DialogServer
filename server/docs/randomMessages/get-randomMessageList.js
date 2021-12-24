module.exports = {
    get:{
        tags: ["RandomMessages"],
        description: "Get list of message ids for a random message key",
        operationId: "getRandomMessageList",
        parameters: [{ $ref: "#/components/parameters/keyIdParam" }],
        responses:{
            200:{ $ref: "#/components/responses/mapListResponse" },
            400:{
                description:"JSON Object with a message and an internal error detail",
                type: "object",
                schema: { $ref: "#/components/schemas/Error" }
            }
        }
    }
}