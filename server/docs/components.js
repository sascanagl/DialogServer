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
            },
            newlinesParam: {
                name: "newlines",
                in: "query",
                schema: { $ref: "#/components/schemas/boolVal" },
                required: false,
                description: "Place newlines between chained messages"
            },
            voiceParam: {
                name: "voice",
                in: "query",
                schema: { $ref: "#/components/schemas/voiceKey" },
                required: false,
                description: "The AWS Polly voice to use for TTS"
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
                description: "Path Param: A string Map key",
                example:"rootWord"
            },
            voiceKey: {
                type: "string",
                description: "Query Param providing the Polly voice to use for TTS",
                examples:{
                    "Ivy": {
                        value: "?param=Ivy",
                        summary: "Female child"
                    },
                    "Joanna": {
                        value: "?param=Joanna",
                        summary: "Female"
                    },
                    "Kendra": {
                        value: "?param=Kendra",
                        summary: "Female"
                    },
                    "Kimberly": {
                        value: "?param=Kimberly",
                        summary: "Female"
                    },
                    "Salli": {
                        value: "?param=Salli",
                        summary: "Female"
                    },
                    "Joey": {
                        value: "?param=Joey",
                        summary: "Male"
                    },
                    "Justin": {
                        value: "?param=Justin",
                        summary: "Male child"
                    },
                    "Matthew": {
                        value: "?param=Matthew",
                        summary: "Male"
                    }
                }
            },
            boolVal: {
                type: "boolean",
                description: "Query param true/false",
                examples:{
                    "unset": {
                        value: "?param",
                        summary: "No value defaults to boolean true"
                    },
                    "set": {
                        value: "?param=false",
                        summary: "Set to false to avoid default of true"
                    }
                }
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
                    message: {
                        type: "string",
                        description: "String value from call",
                        example: "large"
                    }
                }
            },
            mapStrTTSValue:{
                type: "object",
                properties:{
                    key: {
                        type: "string",
                        description: "Original key from request",
                        example: "big"
                    },
                    message: {
                        type: "string",
                        description: "String value from call",
                        example: "large"
                    },
                    speechUrl: {
                        type: "string",
                        description:"Signed AWS audio file Url from AWS Polly call",
                        example: "A REALLY REALLY REALLY long signed HTTP Url for playable/loadable audio file"
                    }
                }
            },
            mapStrTTSError:{
                type: "object",
                properties:{
                    key: {
                        type: "string",
                        description: "Original key from request",
                        example: "big"
                    },
                    message: {
                        type: "string",
                        description: "String value from call",
                        example: "large"
                    },
                    speechError: {
                        type: "string",
                        description:"Error message from the AWS Polly call.",
                        example: "Your IdentityPool Id was empty"
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
            mapListTTSValue:{
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
                    },
                    speechUrl: {
                        type: "string",
                        description:"Signed AWS audio file Url from AWS Polly call",
                        example: "A REALLY REALLY REALLY long signed HTTP Url for playable/loadable audio file"
                    }
                }
            },
            mapListTTSError:{
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
                    },
                    speechError: {
                        type: "string",
                        description:"Error message from the AWS Polly call.",
                        example: "Your IdentityPool Id was empty"
                    }
                }
            },
            mapOptions:{
                type: "object",
                properties:{
                    name:{
                        type: "array",
                        properties:{
                            type: "object",
                            properties:{
                                id:{
                                    type: "any"
                                },
                                text:{
                                    type: "string"
                                }
                            }
                        }
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