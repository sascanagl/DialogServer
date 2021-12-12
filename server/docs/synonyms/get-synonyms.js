module.exports = {
    get:{
        tags: ["Synonyms"],
        description: "Get Synonyms keys",
        operationId: "getSynonymsKeys",
        parameters: [],
        responses:{
            200:{
                description: "Synonyms keys returned",
                content:{
                    "application/json":{
                        schema:{
                            $ref: "#/components/schemas/synonymsKeys"
                        }
                    }
                }
            }
        }
    }
}