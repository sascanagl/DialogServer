module.exports = {
    components:{
        schemas:{
            strKey: {
                type: "string",
                description: "A string Map key",
                example:"rootWord"
            },
            synonymsKeys:{
                type: "object",
                properties:{
                    count: {
                        type: "number",
                        description: "Total number of keys in Synonyms storage",
                        example: 2
                    },
                    keys: {
                        type: "array",
                        description: "Array of synonym key strings",
                        example: ["big","little"]
                    }
                }
            },
            synonym:{
                type: "object",
                properties:{
                    key: {
                        type: "string",
                        description: "Original key from request",
                        example: "big"
                    },
                    synonym: {
                        type: "string",
                        description: "Synonym response from the call",
                        example: "large"
                    }
                }
            },
            synonymsList:{
                type: "object",
                properties:{
                    key: {
                        type: "string",
                        description: "Original key from request",
                        example: "big"
                    },
                    count: {
                        type: "number",
                        description: "Total number of Synonyms for this key",
                        example: 2
                    },
                    synonyms: {
                        type: "array",
                        description: "Synonyms stored for the key",
                        example: [ "large", "huge" ]
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