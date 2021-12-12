module.exports = {
    get:{
        tags: ["Synonyms"],
        description: "Get synonym for key",
        operationId: "getSynonym",
        parameters: [ 
            {
                name: "key",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/strKey"
                },
                required: true,
                description: "The key/word for which to get a synonym"
            }
        ],
        responses:{
            200:{
                description: "Synonym value returned",
                content:{
                    "application/json":{
                        schema:{
                            $ref: "#/components/schemas/synonym"
                        }
                    }
                }
            },
            400:{
                description: "Error occurred during processing",
                content:{
                    "application/json":{
                        schema:{
                            $ref: "#/components/schemas/Error"
                        }
                    }
                }
            }
        }
    }
}