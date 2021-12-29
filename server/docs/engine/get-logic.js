module.exports = {
    get:{
        tags: ["Engine"],
        description: "Get the game engine logic for this game",
        operationId: "getLogic",
        parameters: [],
        responses:{
            200:{
                description: "JSON Object with the complete logic table for the game engine",
                type: "object",
                schema:{ $ref: "#/components/schemas/gameLogic" }
            }
        }
    }
}