/**
 * This is get-message because we are not posting any data to the server for retention.
 * This is an HTTP POST because GET with BODY is not supported properly and cannot be relied upon.
 */
module.exports = {
    post:{
        tags: ["RandomMessages"],
        description: "Get random message from those available for the key",
        operationId: "getRandomMessage",
        parameters: [
            { $ref: "#/components/parameters/instanceIdParam" },
            { $ref: "#/components/parameters/keyIdParam" },
            { $ref: "#/components/parameters/voiceParam" }
        ],
        requestBody: { $ref: "#/components/requestBodies/gameStateBody" },
        responses:{
            200:{ oneOf:[
                { $ref: "#/components/responses/mapStrResponse" },
                { $ref: "#/components/responses/mapStrTTSResponse" },
                { $ref: "#/components/responses/mapStrTTSErrorResponse" }
            ]},
            400:{ $ref: "#/components/responses/GeneralError" }
        }
    }
}