module.exports = {
    get:{
        tags: ["Engine"],
        description: "Get the game engine start worldInfo and zoneInfo for the game",
        operationId: "getLocations",
        parameters: [],
        responses:{
            200:{
                description: "JSON Object with the complete new game starting worldInfo and zoneInfo data for the engine",
                type: "object",
                schema:{ $ref: "#/components/schemas/gameLocations" }
            }
        }
    }
}