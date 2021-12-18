/**
 * This is get-message because we are not posting any data to the server for retention.
 * This is an HTTP POST because GET with BODY is not supported properly and cannot be relied upon.
 */
module.exports = {
    post:{
        tags: ["RandomMessages"],
        description: "Get random message id for key",
        operationId: "getRandomMessage",
        parameters: [{ $ref: "#/components/parameters/keyIdParam" }],
        requestBody: { $ref: "#/components/requestBodies/gameStateBody" },
        responses:{
            200:{ $ref: "#/components/responses/mapStrResponse" },
            400:{ anyOf:[
                    { $ref: "#/components/responses/ParamError" },
                    { $ref: "#/components/responses/BodyError" }
            ]}
        }
    }
}