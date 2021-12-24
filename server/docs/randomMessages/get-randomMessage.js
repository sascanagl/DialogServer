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
            { $ref: "#/components/parameters/keyIdParam" },
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
                description:"JSON Object with an error message and detail",
                type: "object",
                schema: { $ref: "#/components/schemas/Error" }
            }
        }
    }
}