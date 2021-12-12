module.exports = {
    get:{
        tags: ["Synonyms"],
        description: "Get synonyms for key",
        operationId: "getSynonymsList",
        parameters: [ 
            {
                name: "key",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/strKey"
                },
                required: true,
                description: "The key/word for which to get synonyms"
            }
        ],
        responses:{
            200:{
                description: "Synonyms values returned",
                content:{
                    "application/json":{
                        schema:{
                            $ref: "#/components/schemas/synonymsList"
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