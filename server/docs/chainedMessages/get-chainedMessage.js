/**
 * This is get-changedMessage because we are not posting any data to the server for retention.
 * This is an HTTP POST because GET with BODY is not supported properly and cannot be relied upon.
 */
module.exports = {
    post:{
        tags: ["ChainedMessages"],
        description: "Get chained messages for key",
        operationId: "getChainedMessage",
        parameters: [
            { $ref: "#/components/parameters/instanceIdParam" },
            { $ref: "#/components/parameters/keyIdParam" },
            { $ref: "#/components/parameters/newlinesParam" },
            { $ref: "#/components/parameters/voiceParam" }
        ],
        requestBody: { $ref: "#/components/requestBodies/gameStateBody" },
        responses:{
            '200':{ oneOf:[
                { $ref: "#/components/responses/mapStrValue" },
                { $ref: "#/components/responses/mapStrTTSValue" },
                { $ref: "#/components/responses/mapStrTTSErrorResponse" }
            ]},
            '400':{ $ref: "#/components/responses/GeneralError" }
        }
    }
}