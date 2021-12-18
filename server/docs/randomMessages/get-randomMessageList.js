module.exports = {
    get:{
        tags: ["RandomMessages"],
        description: "Get list of message ids for a random message key",
        operationId: "getRandomMessageList",
        parameters: [{ $ref: "#/components/parameters/keyIdParam" }],
        responses:{
            200:{ $ref: "#/components/responses/mapListResponse" },
            400:{ $ref: "#/components/responses/ParamError" }
        }
    }
}