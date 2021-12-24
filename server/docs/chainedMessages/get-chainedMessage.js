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
            { $ref: "#/components/parameters/keyIdParam" },
            { $ref: "#/components/parameters/newlinesParam" },
            { $ref: "#/components/parameters/voiceParam" }
        ],
        requestBody: { $ref: "#/components/requestBodies/gameStateBody" },
        responses:{
            200:{
                description: "JSON Object with the key, message, and possible TTS speechUrl or speechError",
                type: "object",
                oneOf:[
                { $ref: "#/components/schemas/mapStrValue" },
                { $ref: "#/components/schemas/mapStrTTSValue" },
                { $ref: "#/components/schemas/mapStrTTSError" }
            ]},
            400:{
                description:"JSON Object with a message and an internal error detail",
                type: "object",
                schema: { $ref: "#/components/schemas/Error" }
            }
        }
    }
}