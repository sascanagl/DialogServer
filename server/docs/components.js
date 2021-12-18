module.exports = {
    components:{
        responses: {
            mapStrResponse: {
                description: "JSON response of a single map string value",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/mapStrValue" }
                }}},
            mapKeysResponse: {
                description: "JSON response of a list of map key values",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/mapKeys" }
                }}},
            mapListResponse: {
                description: "JSON response of a list of map string values",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/mapList" }
                }}},
            ParamError: {
                description: "Invalid or missing parameter",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/Error" }
                }}},
            BodyError: {
                description: "Invalid or missing body content",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/Error" }
                }}}
        },
        parameters: {
            keyIdParam: {
                name: "key",
                in: "path",
                schema: { $ref: "#/components/schemas/strKey" },
                required: true,
                description: "The key/id for the desired item"
            }
        },
        requestBodies: {
            gameStateBody: {
                description: "JSON object of the current gameState",
                required: true,
                content:{
                    "application/json": {
                        schema: { $ref: "#/components/schemas/gameState" }
                    }
                }
            }
        },
        schemas:{
            strKey: {
                type: "string",
                description: "A string Map key",
                example:"rootWord"
            },
            mapKeys:{
                type: "object",
                properties:{
                    count: {
                        type: "number",
                        description: "Total number of keys in storage",
                        example: 2
                    },
                    keys: {
                        type: "array",
                        description: "Array of key strings",
                        example: ["big","little"]
                    }
                }
            },
            mapStrValue:{
                type: "object",
                properties:{
                    key: {
                        type: "string",
                        description: "Original key from request",
                        example: "big"
                    },
                    value: {
                        type: "string",
                        description: "String value from call",
                        example: "large"
                    }
                }
            },
            mapList:{
                type: "object",
                properties:{
                    key: {
                        type: "string",
                        description: "String key from the request",
                        example: "big"
                    },
                    count: {
                        type: "number",
                        description: "Total number of items in the list",
                        example: 2
                    },
                    values: {
                        type: "array",
                        description: "String list stored for the key",
                        example: [ "large", "huge" ]
                    }
                }
            },
            gameState: {
                type: "object",
                properties: {
                    player: {
                        type: "object",
                        description: "Player properties and state",
                        example: {uid:"",firstName:"",lastName:"", etc:"..."}
                    },
                    location: {
                        type: "object",
                        description: "Location properties and state",
                        example: {world:"",zone:{},zoneInfo:[{}],npc:{}}
                    }
                }
            },
            Error: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        description: "Error message",
                        example: "Your item was not found"
                    },
                    internal_code: {
                        type: "string",
                        description: "Internal error code",
                        example: "Invalid parameter"
                    }
                }
            }
        }
    }
}