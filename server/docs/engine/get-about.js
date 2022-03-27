module.exports = {
    get:{
        tags: ["Engine"],
        description: "Get the About response",
        operationId: "getAbout",
        parameters: [],
        responses:{
            '200':{
                description: "The Name and Version of the dialog engine",
                content:{
                    "text/plain": {
                        schema: {
                            type: "string",
                            example: "Welcome to Dialog Server version 1.2.0"
                        }
                    }
                }
            }
        }
    }
}