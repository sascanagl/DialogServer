module.exports = {
    get:{
        tags: ["Engine"],
        description: "Get the About response",
        operationId: "getAbout",
        parameters: [],
        responses:{
            200:{
                description: "The About information for the game engine.",
                type: "text"
            }
        }
    }
}